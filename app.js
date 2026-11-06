'use strict';

const CHAVE = 'hub-estudos:v1';
const CHAVE_TEMA = 'hub-estudos:tema';
const INTERVALOS = [0, 1, 3, 7, 16, 35];
const NOVAS_POR_DIA = 10;
const PONTOS = { carta: 1, questao: 2, leitura: 10 };
const TIPOS = [
  { id: 'concurso', titulo: 'Concursos', descricao: 'Preparação para provas, com simulados no formato da banca.' },
  { id: 'curso', titulo: 'Cursos', descricao: 'Trilhas livres para aprender um assunto do zero.' },
];
const app = document.getElementById('app');
const cache = {};
let cronometro = null;
let aoRolar = null;

function carregarEstado() {
  const base = { nome: '', lidos: {}, rascunhos: {}, tentativas: [], cartas: {}, srs: {}, dias: {}, erros: {}, topicos: {}, inline: {}, meta: 30, ultima: null };
  try {
    return Object.assign(base, JSON.parse(localStorage.getItem(CHAVE)) || {});
  } catch (erro) {
    return base;
  }
}

const estado = carregarEstado();

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch (erro) {
    console.warn('Não foi possível salvar o progresso.', erro);
  }
  atualizarSelo();
}

function esc(texto) {
  const div = document.createElement('div');
  div.textContent = String(texto ?? '');
  return div.innerHTML;
}

async function buscar(caminho, tipo = 'json') {
  if (cache[caminho]) {
    return cache[caminho];
  }
  const resposta = await fetch(caminho);
  if (!resposta.ok) {
    throw new Error(`Falha ao carregar ${caminho}`);
  }
  cache[caminho] = tipo === 'json' ? await resposta.json() : await resposta.text();
  return cache[caminho];
}

async function catalogo() {
  return buscar('content/catalogo.json');
}

async function trilhaPorId(id) {
  const trilha = (await catalogo()).trilhas.find((item) => item.id === id);
  if (!trilha) {
    throw new Error('Trilha não encontrada.');
  }
  return trilha;
}

/* ---------- Datas, pontos e sequência ---------- */

function dataLocal(data = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}`;
}

function somarDias(iso, dias) {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return dataLocal(new Date(ano, mes - 1, dia + dias));
}

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
}

function diaDeHoje() {
  const hoje = dataLocal();
  if (!estado.dias[hoje]) {
    estado.dias[hoje] = { pontos: 0, cartas: 0, questoes: 0, leituras: 0, novas: {}, extras: {}, lidos: [] };
  }
  return estado.dias[hoje];
}

function registrar(tipo, quantidade = 1) {
  const dia = diaDeHoje();
  const campo = { carta: 'cartas', questao: 'questoes', leitura: 'leituras' }[tipo];
  dia[campo] += quantidade;
  dia.pontos += PONTOS[tipo] * quantidade;
}

function pontosDoDia(iso) {
  return (estado.dias[iso] && estado.dias[iso].pontos) || 0;
}

function sequencia() {
  const bateu = (iso) => pontosDoDia(iso) >= estado.meta;
  let dia = dataLocal();
  if (!bateu(dia)) {
    dia = somarDias(dia, -1);
  }
  let total = 0;
  while (bateu(dia)) {
    total += 1;
    dia = somarDias(dia, -1);
  }
  return total;
}

function registrarTopico(trilha, modulo, certo) {
  if (!modulo) {
    return;
  }
  estado.topicos[trilha] = estado.topicos[trilha] || {};
  const item = estado.topicos[trilha][modulo] || { certas: 0, total: 0 };
  item.total += 1;
  item.certas += certo ? 1 : 0;
  estado.topicos[trilha][modulo] = item;
}

function guardarErro(chave, dados) {
  const anterior = estado.erros[chave];
  estado.erros[chave] = { ...dados, vezes: ((anterior && anterior.vezes) || 0) + 1, data: dataLocal() };
}

function errosDaTrilha(id) {
  return Object.values(estado.erros).filter((e) => e.trilha === id).length;
}

function atualizarSelo() {
  const selo = document.getElementById('selo-revisar');
  if (selo) {
    const total = Object.keys(estado.erros).length;
    selo.textContent = total ? String(total) : '';
    selo.hidden = !total;
  }
}

/* ---------- Repetição espaçada ---------- */

function srsTrilha(id) {
  if (!estado.srs[id]) {
    estado.srs[id] = {};
    (estado.cartas[id] || []).forEach((frente) => { estado.srs[id][frente] = { caixa: 2, proxima: dataLocal() }; });
  }
  return estado.srs[id];
}

function filaDeHoje(id, todas) {
  const srs = srsTrilha(id);
  const hoje = dataLocal();
  const dia = diaDeHoje();
  const devidas = todas.filter((c) => srs[c.frente] && srs[c.frente].proxima <= hoje);
  const ineditas = todas.filter((c) => !srs[c.frente]);
  const liberadas = NOVAS_POR_DIA + (dia.extras[id] || 0) - (dia.novas[id] || 0);
  return { devidas, novas: ineditas.slice(0, Math.max(0, liberadas)), ineditas: ineditas.length };
}

function proximoIntervalo(caixaAtual, nota) {
  if (nota === 'errei') {
    return { caixa: 1, dias: 1 };
  }
  if (nota === 'dificil') {
    const caixa = Math.max(1, caixaAtual);
    return { caixa, dias: Math.max(1, Math.round(INTERVALOS[caixa] / 2)) };
  }
  const caixa = Math.min(INTERVALOS.length - 1, caixaAtual + (caixaAtual === 0 ? 2 : 1));
  return { caixa, dias: INTERVALOS[caixa] };
}

function avaliarCarta(id, frente, nota) {
  const srs = srsTrilha(id);
  const dia = diaDeHoje();
  if (!srs[frente]) {
    dia.novas[id] = (dia.novas[id] || 0) + 1;
  }
  const r = proximoIntervalo(srs[frente] ? srs[frente].caixa : 0, nota);
  srs[frente] = { caixa: r.caixa, proxima: somarDias(dataLocal(), r.dias) };
  registrar('carta');
  salvar();
}

function estatisticasCartas(id, todas) {
  const srs = srsTrilha(id);
  const dominadas = todas.filter((c) => srs[c.frente] && srs[c.frente].caixa >= 3).length;
  const vistas = todas.filter((c) => srs[c.frente]).length;
  return { novas: todas.length - vistas, aprendendo: vistas - dominadas, dominadas };
}

function textoDias(dias) {
  return dias === 1 ? 'amanhã' : `${dias} dias`;
}

/* ---------- Utilitários de tela ---------- */

function progressoTrilha(t) {
  const total = t.materiais.length;
  const lidos = t.materiais.filter((m) => estado.lidos[`${t.id}/${m.id}`]).length;
  return { total, lidos, pct: total ? Math.round((lidos / total) * 100) : 0 };
}

function trilhaIniciada(t) {
  return progressoTrilha(t).lidos > 0 || Object.keys(estado.srs[t.id] || {}).length > 0 || estado.tentativas.some((x) => x.trilha === t.id);
}

function melhorNota(trilhaId, avaliacaoId) {
  const notas = estado.tentativas.filter((x) => x.trilha === trilhaId && (!avaliacaoId || x.avaliacao === avaliacaoId));
  if (!notas.length) {
    return null;
  }
  return notas.reduce((melhor, x) => (x.total > melhor.total ? x : melhor));
}

function barra(pct) {
  return `<div class="barra-prog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div>`;
}

function numeroModulo(titulo) {
  const m = titulo.match(/^Módulo (\d+)/);
  return m ? m[1] : titulo.charAt(0);
}

function subtituloModulo(titulo) {
  return titulo.replace(/^Módulo \d+ — /, '');
}

function renderizarFormulas(raiz) {
  raiz.querySelectorAll('code.language-latex').forEach((codigo) => {
    const caixa = document.createElement('div');
    caixa.className = 'formula';
    if (window.katex) {
      window.katex.render(codigo.textContent, caixa, { displayMode: true, throwOnError: false });
    } else {
      caixa.textContent = codigo.textContent;
    }
    codigo.closest('pre').replaceWith(caixa);
  });
}

function emMarkdown(texto) {
  return window.marked ? window.marked.parse(texto) : `<pre>${esc(texto)}</pre>`;
}

function marcarNav(nome) {
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.dataset.nav === nome) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
}

function proximoModulo(t) {
  const modulos = t.materiais.filter((m) => m.id.startsWith('modulo'));
  return modulos.find((m) => !estado.lidos[`${t.id}/${m.id}`]) || null;
}

/* ---------- Questão de múltipla escolha com resposta na hora ---------- */

function lerQuestao(texto) {
  const q = { enunciado: '', alternativas: {}, resposta: '', explicacao: '' };
  const enunciado = [];
  texto.trim().split('\n').forEach((linha) => {
    const alt = linha.match(/^(\*?)([A-E])\)\s*(.*)$/);
    if (alt) {
      q.alternativas[alt[2]] = alt[3];
      if (alt[1]) {
        q.resposta = alt[2];
      }
    } else if (linha.startsWith('>')) {
      q.explicacao += `${linha.slice(1).trim()} `;
    } else if (!Object.keys(q.alternativas).length) {
      enunciado.push(linha.trim());
    }
  });
  q.enunciado = enunciado.join(' ');
  q.explicacao = q.explicacao.trim();
  return q;
}

/**
 * Desenha uma questão que corrige no clique. `aoResponder(letra, certo)` grava o efeito.
 */
function questaoInterativa(caixa, q, { rotulo, marcada, aoResponder, aoRefazer, extra = '' }) {
  const desenhar = (letraMarcada) => {
    const alternativas = Object.entries(q.alternativas).map(([letra, texto]) => {
      const classe = letraMarcada ? (letra === q.resposta ? 'certa' : letra === letraMarcada ? 'errada' : '') : '';
      return `<button type="button" data-letra="${letra}" class="${classe}" ${letraMarcada ? 'disabled' : ''}><b>${letra}</b><span>${esc(texto)}</span></button>`;
    }).join('');
    const certo = letraMarcada === q.resposta;
    caixa.innerHTML = `<span class="etiqueta">${esc(rotulo)}</span>${extra}
      <p class="enunciado">${esc(q.enunciado)}</p>
      <div class="alts-inline">${alternativas}</div>
      ${letraMarcada ? `<p class="expl ${certo ? 'ok' : 'ruim'}"><strong>${certo ? 'Acertou.' : `Resposta ${esc(q.resposta)}.`}</strong> <span>${esc(q.explicacao)}</span></p>` : ''}
      ${letraMarcada && aoRefazer ? '<button type="button" class="link" data-refazer>Tentar de novo</button>' : ''}`;
    caixa.querySelectorAll('[data-letra]').forEach((botao) => {
      botao.onclick = () => {
        aoResponder(botao.dataset.letra, botao.dataset.letra === q.resposta);
        desenhar(botao.dataset.letra);
      };
    });
    const refazer = caixa.querySelector('[data-refazer]');
    if (refazer) {
      refazer.onclick = () => { aoRefazer(); desenhar(''); };
    }
  };
  desenhar(marcada || '');
}

function renderizarQuestoes(raiz, t, m) {
  raiz.querySelectorAll('code.language-questao').forEach((codigo, k) => {
    const q = lerQuestao(codigo.textContent);
    const chave = `${t.id}/${m.id}/${k + 1}`;
    const caixa = document.createElement('div');
    caixa.className = 'questao-inline';
    questaoInterativa(caixa, q, {
      rotulo: 'Teste rápido',
      marcada: estado.inline[chave],
      aoResponder: (letra, certo) => {
        estado.inline[chave] = letra;
        registrar('questao');
        registrarTopico(t.id, m.id, certo);
        if (certo) {
          delete estado.erros[`inline/${chave}`];
        } else {
          guardarErro(`inline/${chave}`, { trilha: t.id, modulo: m.id, origem: m.titulo, ...q });
        }
        salvar();
      },
      aoRefazer: () => { delete estado.inline[chave]; salvar(); },
    });
    codigo.closest('pre').replaceWith(caixa);
  });
}

/* ---------- Início ---------- */

async function painelHoje(cat) {
  const hoje = dataLocal();
  const pontos = pontosDoDia(hoje);
  const pct = Math.min(100, Math.round((pontos / estado.meta) * 100));
  const seq = sequencia();
  const semana = [];
  for (let k = 6; k >= 0; k -= 1) {
    const dia = somarDias(hoje, -k);
    const [ano, mes, d] = dia.split('-').map(Number);
    const letra = new Date(ano, mes - 1, d).toLocaleDateString('pt-BR', { weekday: 'narrow' });
    const altura = Math.min(100, Math.round((pontosDoDia(dia) / estado.meta) * 100));
    semana.push(`<div class="dia ${altura >= 100 ? 'cheio' : ''} ${k === 0 ? 'hoje' : ''}" title="${esc(formatarData(dia))}: ${pontosDoDia(dia)} pontos"><i style="height:${Math.max(altura, 4)}%"></i><small>${esc(letra.toUpperCase())}</small></div>`);
  }
  const tarefas = [];
  const iniciadas = cat.trilhas.filter((t) => t.status === 'ativa' && trilhaIniciada(t));
  for (const t of iniciadas) {
    if (t.flashcards) {
      const fila = filaDeHoje(t.id, await buscar(`content/${t.id}/${t.flashcards}`));
      const total = fila.devidas.length + fila.novas.length;
      if (total) {
        tarefas.push(`<a class="tarefa cor-${esc(t.cor)}" href="#/trilha/${esc(t.id)}/flashcards"><b>${total}</b><span>cartões para hoje<small>${esc(t.titulo)}</small></span></a>`);
      }
    }
    const prox = proximoModulo(t);
    if (prox) {
      tarefas.push(`<a class="tarefa cor-${esc(t.cor)}" href="#/trilha/${esc(t.id)}/ler/${esc(prox.id)}"><b>${esc(numeroModulo(prox.titulo))}</b><span>${esc(subtituloModulo(prox.titulo))}<small>Próxima leitura · ${esc(t.titulo)}</small></span></a>`);
    }
  }
  const erros = Object.keys(estado.erros).length;
  if (erros) {
    tarefas.unshift(`<a class="tarefa erros" href="#/revisar"><b>${erros}</b><span>questões no caderno de erros<small>Refaça até acertar</small></span></a>`);
  }
  const vazio = '<p class="aviso">Você ainda não começou nenhuma trilha. Escolha uma abaixo: 15 minutos por dia já fazem diferença.</p>';
  return `<section class="painel">
      <div class="painel-meta">
        <div class="anel" style="--pct:${pct}"><div><b>${pontos}</b><small>de ${estado.meta}</small></div></div>
        <div class="painel-texto">
          <h2>Hoje</h2>
          <p>${pct >= 100 ? 'Meta do dia cumprida. Tudo o que vier agora é bônus.' : `Faltam ${Math.max(0, estado.meta - pontos)} pontos para a meta.`}</p>
          <p class="sequencia">${seq ? `🔥 ${seq} ${seq === 1 ? 'dia seguido' : 'dias seguidos'}` : 'Cumpra a meta para começar uma sequência'}</p>
          <label class="aviso" for="meta">Meta diária
            <select id="meta">${[[15, 'leve'], [30, 'normal'], [60, 'intensa']].map(([v, n]) => `<option value="${v}" ${estado.meta === v ? 'selected' : ''}>${v} pontos · ${n}</option>`).join('')}</select>
          </label>
        </div>
        <div class="semana" aria-label="Pontos dos últimos 7 dias">${semana.join('')}</div>
      </div>
      <div class="painel-tarefas">
        <h2>O que fazer agora</h2>
        ${tarefas.length ? `<div class="tarefas">${tarefas.slice(0, 5).join('')}</div>` : vazio}
        <p class="aviso pontos-legenda">Cartão revisado vale ${PONTOS.carta} ponto, questão respondida ${PONTOS.questao} e material lido ${PONTOS.leitura}.</p>
      </div>
    </section>`;
}

async function telaInicio() {
  marcarNav('inicio');
  const cat = await catalogo();
  const cartao = (t) => {
    const p = progressoTrilha(t);
    const nota = melhorNota(t.id);
    const ativa = t.status === 'ativa';
    const corpo = `<span class="etiqueta">${esc(ativa ? t.area : 'Em construção')}</span>
      <h3>${esc(t.titulo)}</h3><p>${esc(t.descricao)}</p>
      ${ativa ? `<small class="aviso">${esc(t.resumo || '')}</small>${barra(p.pct)}<div class="meta"><span>${p.lidos} de ${p.total} lidos</span><span>${nota ? `Melhor nota: ${nota.total}/${nota.de}` : `${p.pct}%`}</span></div>` : ''}`;
    return ativa
      ? `<a class="trilha-cartao cor-${esc(t.cor || 'azul')}" href="#/trilha/${esc(t.id)}">${corpo}</a>`
      : `<div class="trilha-cartao cor-${esc(t.cor || 'cinza')}" aria-disabled="true">${corpo}</div>`;
  };
  const secoes = TIPOS.map((tipo) => {
    const trilhas = cat.trilhas.filter((t) => (t.tipo || 'curso') === tipo.id);
    return trilhas.length ? `<section class="secao-tipo" id="${tipo.id}">
        <div class="secao-cabecalho"><h2>${esc(tipo.titulo)}</h2><p class="aviso">${esc(tipo.descricao)}</p></div>
        <div class="grade">${trilhas.map(cartao).join('')}</div></section>` : '';
  }).join('');
  app.innerHTML = `<section class="heroi">
      <h1>${estado.nome ? `Olá, ${esc(estado.nome.split(' ')[0])}` : 'Hub de Estudos'}</h1>
      <p class="sub">Estude um pouco todo dia: leia, responda na hora e revise no momento certo. O site lembra o que você já sabe e o que precisa voltar.</p>
    </section>
    ${await painelHoje(cat)}
    <nav class="abas" aria-label="Tipos de trilha">${TIPOS.map((tipo) => `<a href="#/" data-ancora="${tipo.id}">${esc(tipo.titulo)}</a>`).join('')}</nav>
    ${secoes}`;
  document.getElementById('meta').onchange = (evento) => {
    estado.meta = Number(evento.target.value);
    salvar();
    telaInicio();
  };
  app.querySelectorAll('[data-ancora]').forEach((link) => {
    link.onclick = (evento) => {
      evento.preventDefault();
      document.getElementById(link.dataset.ancora).scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  });
}

/* ---------- Trilha ---------- */

function desempenhoHtml(t) {
  const dados = estado.topicos[t.id];
  if (!dados) {
    return '';
  }
  const linhas = Object.entries(dados)
    .map(([modulo, x]) => ({ m: t.materiais.find((item) => item.id === modulo), ...x, pct: Math.round((x.certas / x.total) * 100) }))
    .filter((r) => r.m)
    .sort((a, b) => a.pct - b.pct);
  if (!linhas.length) {
    return '';
  }
  return `<h2>Desempenho por tópico</h2>
    <p class="aviso">Junta os simulados e os testes rápidos da leitura. Os tópicos mais fracos aparecem primeiro.</p>
    <div class="topicos">${linhas.map((r) => `<a class="topico ${r.pct < 50 ? 'fraco' : r.pct < 70 ? 'medio' : 'forte'}" href="#/trilha/${esc(t.id)}/ler/${esc(r.m.id)}">
      <span>${esc(subtituloModulo(r.m.titulo))}</span>${barra(r.pct)}<small>${r.certas} de ${r.total} · ${r.pct}%${r.pct < 50 ? ' · revise este' : ''}</small></a>`).join('')}</div>`;
}

async function telaTrilha(id) {
  marcarNav('inicio');
  const t = await trilhaPorId(id);
  const p = progressoTrilha(t);
  const apoio = t.materiais.filter((m) => !m.id.startsWith('modulo'));
  const modulos = t.materiais.filter((m) => m.id.startsWith('modulo'));
  const proximo = proximoModulo(t) || modulos[0];
  const acoes = [];
  if (proximo) {
    acoes.push(`<a class="acao" href="#/trilha/${esc(id)}/ler/${esc(proximo.id)}"><strong>${p.lidos ? 'Continuar estudando' : 'Começar pelo primeiro módulo'}</strong><span>${esc(proximo.titulo)}</span></a>`);
  }
  if (t.flashcards) {
    const todas = await buscar(`content/${id}/${t.flashcards}`);
    const fila = filaDeHoje(id, todas);
    const total = fila.devidas.length + fila.novas.length;
    const est = estatisticasCartas(id, todas);
    acoes.push(`<a class="acao" href="#/trilha/${esc(id)}/flashcards"><strong>Flashcards${total ? ` · ${total} para hoje` : ''}</strong><span>${est.dominadas} de ${todas.length} dominados${total ? '' : ' · nada para revisar hoje'}</span></a>`);
  }
  t.avaliacoes.forEach((a) => {
    const nota = melhorNota(id, a.id);
    const andamento = estado.rascunhos[`${id}/${a.id}`];
    acoes.push(`<a class="acao" href="#/trilha/${esc(id)}/avaliacao/${esc(a.id)}"><strong>${esc(a.titulo)}</strong>
      <span>${andamento ? 'Tentativa em andamento' : nota ? `Melhor nota: ${nota.total} de ${nota.de}` : 'Ainda não feito'}</span></a>`);
  });
  const erros = errosDaTrilha(id);
  if (erros) {
    acoes.push(`<a class="acao" href="#/revisar/${esc(id)}"><strong>Caderno de erros · ${erros}</strong><span>Refaça as questões que você errou</span></a>`);
  }
  const lido = (m) => estado.lidos[`${id}/${m.id}`];
  app.innerHTML = `<a class="voltar" href="#/">← Todas as trilhas</a>
    <section class="cabecalho-trilha cor-${esc(t.cor || 'azul')}">
      <span class="etiqueta">${esc(t.area || '')}</span>
      <h1>${esc(t.titulo)}</h1><p class="sub">${esc(t.descricao)}</p>
      ${t.status === 'ativa' ? `${barra(p.pct)}<div class="meta"><span>${p.lidos} de ${p.total} materiais lidos</span><span>${p.pct}%</span></div>` : '<p class="aviso">Esta trilha ainda não tem conteúdo.</p>'}
    </section>
    ${acoes.length ? `<div class="acoes-rapidas cor-${esc(t.cor || 'azul')}">${acoes.join('')}</div>` : ''}
    <div class="cor-${esc(t.cor || 'azul')}">${desempenhoHtml(t)}</div>
    ${modulos.length ? `<h2>Módulos</h2><div class="modulos cor-${esc(t.cor || 'azul')}">${modulos.map((m) => `<a class="modulo ${lido(m) ? 'lido' : ''}" href="#/trilha/${esc(id)}/ler/${esc(m.id)}">
      <span class="num">${lido(m) ? '✓' : esc(numeroModulo(m.titulo))}</span><span>${esc(subtituloModulo(m.titulo))}<small>${lido(m) ? 'Lido' : 'Não lido'}</small></span></a>`).join('')}</div>` : ''}
    ${apoio.length ? `<h2>Apoio</h2><div class="modulos cor-${esc(t.cor || 'azul')}">${apoio.map((m) => `<a class="modulo ${lido(m) ? 'lido' : ''}" href="#/trilha/${esc(id)}/ler/${esc(m.id)}">
      <span class="num">${lido(m) ? '✓' : '•'}</span><span>${esc(m.titulo)}</span></a>`).join('')}</div>` : ''}`;
}

/* ---------- Leitura ---------- */

async function telaLeitura(id, materialId) {
  marcarNav('inicio');
  const t = await trilhaPorId(id);
  const i = t.materiais.findIndex((m) => m.id === materialId);
  if (i < 0) {
    throw new Error('Material não encontrado.');
  }
  const m = t.materiais[i];
  const texto = await buscar(`content/${id}/${m.arquivo}`, 'text');
  const ant = t.materiais[i - 1];
  const prox = t.materiais[i + 1];
  const chave = `${id}/${m.id}`;
  estado.ultima = { trilha: id, material: m.id };
  salvar();
  app.innerHTML = `<div class="progresso-leitura cor-${esc(t.cor || 'azul')}" id="progresso-leitura"></div>
    <a class="voltar" href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a>
    <div class="leitor cor-${esc(t.cor || 'azul')}">
      <aside class="lateral">
        <h4>Nesta página</h4><ol class="sumario" id="sumario"></ol>
        <h4>Materiais</h4>
        <ol>${t.materiais.map((x) => `<li><a href="#/trilha/${esc(id)}/ler/${esc(x.id)}" ${x.id === m.id ? 'aria-current="page"' : ''}>${estado.lidos[`${id}/${x.id}`] ? '✓ ' : ''}${esc(x.titulo)}</a></li>`).join('')}</ol>
      </aside>
      <div>
        <article class="leitura"><h1>${esc(m.titulo)}</h1>${emMarkdown(texto)}</article>
        <div class="acoes"><button id="lido" class="${estado.lidos[chave] ? '' : 'principal'}">${estado.lidos[chave] ? '✓ Lido · desmarcar' : `Marcar como lido · +${PONTOS.leitura} pontos`}</button></div>
        <nav class="navegacao" aria-label="Materiais vizinhos">
          ${ant ? `<a href="#/trilha/${esc(id)}/ler/${esc(ant.id)}"><small>Anterior</small>${esc(ant.titulo)}</a>` : '<span></span>'}
          ${prox ? `<a class="prox" href="#/trilha/${esc(id)}/ler/${esc(prox.id)}"><small>Próximo</small>${esc(prox.titulo)}</a>` : ''}
        </nav>
      </div>
    </div>`;
  const artigo = app.querySelector('.leitura');
  renderizarFormulas(artigo);
  renderizarQuestoes(artigo, t, m);
  artigo.querySelectorAll('input[type=checkbox]').forEach((caixa) => { caixa.disabled = true; });
  const sumario = document.getElementById('sumario');
  artigo.querySelectorAll('h3').forEach((h, k) => {
    h.id = `secao-${k + 1}`;
    const item = document.createElement('li');
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = h.textContent;
    botao.onclick = () => h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    item.appendChild(botao);
    sumario.appendChild(item);
  });
  const barraLeitura = document.getElementById('progresso-leitura');
  aoRolar = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    barraLeitura.style.width = `${total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 100}%`;
  };
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();
  document.getElementById('lido').onclick = () => {
    estado.lidos[chave] = !estado.lidos[chave];
    const dia = diaDeHoje();
    if (estado.lidos[chave] && !dia.lidos.includes(chave)) {
      dia.lidos.push(chave);
      registrar('leitura');
    }
    salvar();
    if (estado.lidos[chave] && prox) {
      window.location.hash = `#/trilha/${id}/ler/${prox.id}`;
    } else {
      telaLeitura(id, materialId);
    }
  };
}

/* ---------- Simulado ---------- */

function formatarTempo(segundos) {
  const s = Math.max(0, Math.floor(segundos));
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
}

function calcularNota(prova, respostas) {
  const acertos = {};
  prova.blocos.forEach((b) => { acertos[b.id] = 0; });
  prova.questoes.forEach((q) => {
    if (respostas[q.n] === q.resposta) {
      acertos[q.bloco] += 1;
    }
  });
  const grupos = prova.grupos.map((g) => {
    const pontos = g.blocos.reduce((soma, b) => soma + acertos[b], 0);
    const zerou = g.naoZerar && g.blocos.some((b) => acertos[b] === 0);
    return { titulo: g.titulo, pontos, total: prova.questoes.filter((q) => g.blocos.includes(q.bloco)).length, minimo: g.minimo, meta: g.meta, aprovado: pontos >= g.minimo && !zerou, zerou };
  });
  return { acertos, grupos, total: Object.values(acertos).reduce((a, b) => a + b, 0), aprovado: grupos.every((g) => g.aprovado) };
}

function questaoHtml(q, respostas, corrigida) {
  const marcada = respostas[q.n];
  const alternativas = Object.entries(q.alternativas).map(([letra, texto]) => {
    const classe = corrigida ? (letra === q.resposta ? 'certa' : letra === marcada ? 'errada' : '') : '';
    return `<label class="alt ${classe}"><input type="radio" name="q${q.n}" value="${letra}" ${marcada === letra ? 'checked' : ''} ${corrigida ? 'disabled' : ''}>
      <span>(${letra}) ${esc(texto)}</span></label>`;
  }).join('');
  const rodape = corrigida ? `<p class="expl"><strong>Resposta ${esc(q.resposta)}.</strong> ${esc(q.explicacao)}${marcada ? '' : ' Questão em branco.'}</p>` : '';
  return `<div class="questao" id="q-${q.n}"><fieldset><legend><span class="n">${q.n}</span>${esc(q.enunciado)}</legend>${alternativas}</fieldset>${rodape}</div>`;
}

function provaHtml(prova, respostas, corrigida) {
  let html = '';
  let passagemMostrada = false;
  prova.blocos.forEach((b) => {
    html += `<h2 class="bloco-titulo">${esc(b.titulo)}</h2>`;
    prova.questoes.filter((q) => q.bloco === b.id).forEach((q) => {
      if (q.passagem && !passagemMostrada) {
        html += `<div class="passagem">${emMarkdown(prova.passagens[q.passagem])}</div>`;
        passagemMostrada = true;
      }
      html += questaoHtml(q, respostas, corrigida);
    });
  });
  return html;
}

function mapaHtml(prova, respostas, corrigida) {
  return `<div class="mapa-grade">${prova.questoes.map((q) => {
    const classe = corrigida ? (respostas[q.n] === q.resposta ? 'certa' : 'errada') : (respostas[q.n] ? 'feita' : '');
    return `<button type="button" class="${classe}" data-ir="${q.n}" aria-label="Ir para a questão ${q.n}">${q.n}</button>`;
  }).join('')}</div>`;
}

function ligarMapa() {
  app.querySelectorAll('[data-ir]').forEach((botao) => {
    botao.onclick = () => document.getElementById(`q-${botao.dataset.ir}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function registrarEntrega(id, a, prova, respostas) {
  let respondidas = 0;
  prova.questoes.forEach((q) => {
    const marcada = respostas[q.n];
    if (!marcada) {
      return;
    }
    respondidas += 1;
    const certo = marcada === q.resposta;
    const chave = `${id}/${a.id}/${q.n}`;
    registrarTopico(id, q.modulo, certo);
    if (certo) {
      delete estado.erros[chave];
    } else {
      guardarErro(chave, {
        trilha: id, modulo: q.modulo, origem: `${prova.titulo}, questão ${q.n}`,
        enunciado: q.enunciado, alternativas: q.alternativas, resposta: q.resposta, explicacao: q.explicacao,
        passagem: q.passagem ? prova.passagens[q.passagem] : undefined,
      });
    }
  });
  if (respondidas) {
    registrar('questao', respondidas);
  }
}

async function telaAvaliacao(id, avaliacaoId) {
  marcarNav('inicio');
  const t = await trilhaPorId(id);
  const a = t.avaliacoes.find((x) => x.id === avaliacaoId);
  if (!a) {
    throw new Error('Avaliação não encontrada.');
  }
  const prova = await buscar(`content/${id}/${a.arquivo}`);
  const chave = `${id}/${a.id}`;
  const rascunho = estado.rascunhos[chave];
  const cor = esc(t.cor || 'azul');
  if (!rascunho) {
    const nota = melhorNota(id, a.id);
    app.innerHTML = `<a class="voltar" href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a>
      <section class="cabecalho-trilha cor-${cor}"><span class="etiqueta">Simulado</span><h1>${esc(prova.titulo)}</h1>
      <p class="sub">${esc(prova.descricao)}</p>
      <div class="numeros"><div class="numero"><b>${prova.questoes.length}</b><span>questões</span></div>
      <div class="numero"><b>${prova.minutos} min</b><span>tempo de prova</span></div>
      ${nota ? `<div class="numero"><b>${nota.total}/${nota.de}</b><span>sua melhor nota</span></div>` : ''}</div>
      <p>Mínimos: ${prova.grupos.map((g) => `${esc(g.titulo)} ${g.minimo} (meta ${g.meta})`).join(' · ')}. As respostas ficam salvas enquanto você faz a prova. As que você errar vão para o caderno de erros.</p>
      <div class="acoes"><button class="principal" id="iniciar">Iniciar agora</button></div></section>`;
    document.getElementById('iniciar').onclick = () => {
      estado.rascunhos[chave] = { inicio: Date.now(), respostas: {} };
      salvar();
      telaAvaliacao(id, avaliacaoId);
    };
    return;
  }
  app.innerHTML = `<a class="voltar" href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a><h1>${esc(prova.titulo)}</h1>
    <div class="prova cor-${cor}">
      <div>${provaHtml(prova, rascunho.respostas, false)}
        <div class="acoes"><button class="principal" id="entregar2">Entregar prova</button><button id="descartar">Descartar tentativa</button></div></div>
      <aside class="mapa" aria-label="Mapa de questões"><div class="tempo" id="tempo"></div><small id="cont"></small>
        <div id="mapa">${mapaHtml(prova, rascunho.respostas, false)}</div>
        <button class="principal" id="entregar">Entregar</button></aside>
    </div>`;
  const atualizar = () => {
    const decorrido = (Date.now() - rascunho.inicio) / 1000;
    const restante = prova.minutos * 60 - decorrido;
    const tempo = document.getElementById('tempo');
    if (tempo) {
      tempo.textContent = restante >= 0 ? formatarTempo(restante) : `+${formatarTempo(-restante)}`;
      tempo.className = `tempo ${restante < 0 ? 'ruim' : ''}`;
      document.getElementById('cont').textContent = `${Object.keys(rascunho.respostas).length} de ${prova.questoes.length} respondidas`;
    }
  };
  atualizar();
  ligarMapa();
  cronometro = setInterval(atualizar, 1000);
  app.onchange = (evento) => {
    if (evento.target.matches('input[type=radio]')) {
      rascunho.respostas[evento.target.name.slice(1)] = evento.target.value;
      salvar();
      document.getElementById('mapa').innerHTML = mapaHtml(prova, rascunho.respostas, false);
      ligarMapa();
      atualizar();
    }
  };
  const entregar = () => {
    const faltam = prova.questoes.length - Object.keys(rascunho.respostas).length;
    if (faltam > 0 && !window.confirm(`Faltam ${faltam} questões. Entregar mesmo assim?`)) {
      return;
    }
    const nota = calcularNota(prova, rascunho.respostas);
    registrarEntrega(id, a, prova, rascunho.respostas);
    estado.tentativas.push({
      trilha: id, avaliacao: a.id, titulo: prova.titulo, data: new Date().toISOString(),
      segundos: Math.round((Date.now() - rascunho.inicio) / 1000), respostas: rascunho.respostas,
      total: nota.total, de: prova.questoes.length, aprovado: nota.aprovado,
      grupos: nota.grupos.map((g) => ({ titulo: g.titulo, pontos: g.pontos, total: g.total })),
    });
    delete estado.rascunhos[chave];
    salvar();
    window.location.hash = `#/resultado/${estado.tentativas.length - 1}`;
  };
  document.getElementById('entregar').onclick = entregar;
  document.getElementById('entregar2').onclick = entregar;
  document.getElementById('descartar').onclick = () => {
    if (window.confirm('Descartar esta tentativa e as respostas marcadas?')) {
      delete estado.rascunhos[chave];
      salvar();
      telaAvaliacao(id, avaliacaoId);
    }
  };
}

async function telaResultado(indice) {
  marcarNav('progresso');
  const r = estado.tentativas[Number(indice)];
  if (!r) {
    throw new Error('Tentativa não encontrada.');
  }
  const t = await trilhaPorId(r.trilha);
  const a = t.avaliacoes.find((x) => x.id === r.avaliacao);
  const prova = await buscar(`content/${r.trilha}/${a.arquivo}`);
  const nota = calcularNota(prova, r.respostas);
  const erradas = prova.questoes.filter((q) => r.respostas[q.n] && r.respostas[q.n] !== q.resposta).length;
  const resumo = `${estado.nome || 'Resultado'} — ${prova.titulo} (${t.titulo}): ${nota.total}/${prova.questoes.length} (${nota.grupos.map((g) => `${g.titulo} ${g.pontos}/${g.total}`).join('; ')}) em ${formatarTempo(r.segundos)}.`;
  app.innerHTML = `<a class="voltar" href="#/trilha/${esc(r.trilha)}">← ${esc(t.titulo)}</a>
    <h1>Resultado: ${nota.total} de ${prova.questoes.length}</h1>
    <span class="selo ${nota.aprovado ? 'ok' : 'ruim'}">${nota.aprovado ? 'Passaria nos mínimos da prova' : 'Ficaria abaixo dos mínimos da prova'}</span>
    <div class="placar cor-${esc(t.cor || 'azul')}">${nota.grupos.map((g) => `<div>${esc(g.titulo)}<b>${g.pontos}/${g.total}</b>
      <div class="barra-prog"><i style="width:${Math.round((g.pontos / g.total) * 100)}%"></i><span class="marca-min" style="left:${Math.round((g.minimo / g.total) * 100)}%"></span></div>
      <small class="${g.aprovado ? 'ok' : 'ruim'}">mínimo ${g.minimo}${g.zerou ? ', disciplina zerada' : ''} · meta ${g.meta}</small></div>`).join('')}
      <div>Tempo<b>${formatarTempo(r.segundos)}</b><small>de ${prova.minutos} min</small></div></div>
    <p class="aviso">Por disciplina: ${prova.blocos.map((b) => `${esc(b.titulo)} ${nota.acertos[b.id]}`).join(' · ')}.</p>
    <div class="acoes">${erradas ? `<a class="botao principal" href="#/revisar/${esc(r.trilha)}">Refazer as ${erradas} que errei</a>` : ''}
      <a class="botao" href="#/trilha/${esc(r.trilha)}">Ver desempenho por tópico</a>
      <button id="copiar">Copiar resultado para enviar</button><a class="botao" href="#/trilha/${esc(r.trilha)}/avaliacao/${esc(r.avaliacao)}">Fazer de novo</a></div>
    <div class="prova cor-${esc(t.cor || 'azul')}"><div>${provaHtml(prova, r.respostas, true)}</div>
      <aside class="mapa" aria-label="Mapa de acertos"><strong>Mapa de acertos</strong>${mapaHtml(prova, r.respostas, true)}</aside></div>`;
  ligarMapa();
  document.getElementById('copiar').onclick = async (evento) => {
    try {
      await navigator.clipboard.writeText(resumo);
      evento.target.textContent = 'Copiado';
    } catch (erro) {
      window.prompt('Copie o resultado:', resumo);
    }
  };
}

/* ---------- Caderno de erros ---------- */

async function telaRevisar(filtro) {
  marcarNav('revisar');
  const cat = await catalogo();
  const trilha = (id) => cat.trilhas.find((t) => t.id === id) || { titulo: id, materiais: [], cor: 'cinza' };
  const entradas = () => Object.entries(estado.erros).filter(([, e]) => !filtro || e.trilha === filtro);
  const lista = entradas();
  if (!lista.length) {
    app.innerHTML = `<h1>Caderno de erros</h1>
      <p class="sub">Toda questão que você errar, no simulado ou nos testes rápidos da leitura, aparece aqui. Você refaz até acertar, e ela sai do caderno.</p>
      <p class="selo ok">Nada para refazer${filtro ? ' nesta trilha' : ''}.</p>
      <p><a href="#/">Voltar ao início</a></p>`;
    return;
  }
  const porTrilha = {};
  lista.forEach(([, e]) => { porTrilha[e.trilha] = (porTrilha[e.trilha] || 0) + 1; });
  const nomeModulo = (e) => {
    const m = trilha(e.trilha).materiais.find((x) => x.id === e.modulo);
    return m ? subtituloModulo(m.titulo) : '';
  };
  app.innerHTML = `${filtro ? `<a class="voltar" href="#/trilha/${esc(filtro)}">← ${esc(trilha(filtro).titulo)}</a>` : ''}
    <h1>Caderno de erros</h1>
    <p class="sub">${lista.length} ${lista.length === 1 ? 'questão' : 'questões'} para refazer. Quem acerta sai do caderno; quem erra de novo continua.</p>
    <div class="acoes"><button class="principal" id="comecar">Refazer ${filtro || Object.keys(porTrilha).length === 1 ? 'agora' : 'todas'}</button>
      ${!filtro && Object.keys(porTrilha).length > 1 ? Object.entries(porTrilha).map(([id, n]) => `<a class="botao" href="#/revisar/${esc(id)}">${esc(trilha(id).titulo)} · ${n}</a>`).join('') : ''}
      ${filtro ? '<a class="botao" href="#/revisar">Ver todas as trilhas</a>' : ''}</div>
    <ul class="lista-erros">${lista.map(([, e]) => `<li class="cor-${esc(trilha(e.trilha).cor)}"><span class="etiqueta">${esc(nomeModulo(e) || trilha(e.trilha).titulo)}</span>
      <p>${esc(e.enunciado)}</p><small class="aviso">${esc(e.origem || '')} · errada ${e.vezes} ${e.vezes === 1 ? 'vez' : 'vezes'}</small></li>`).join('')}</ul>`;
  document.getElementById('comecar').onclick = () => {
    const fila = entradas().map(([chave]) => chave);
    let i = 0;
    let acertos = 0;
    const desenhar = () => {
      if (i >= fila.length) {
        app.innerHTML = `<h1>Revisão concluída</h1><p class="sub">Você acertou ${acertos} de ${fila.length}. ${fila.length - acertos ? 'As que errou continuam no caderno para amanhã.' : 'O caderno ficou limpo.'}</p>
          <div class="acoes"><a class="botao principal" href="#/">Voltar ao início</a>${fila.length - acertos ? '<button id="denovo">Refazer as que faltaram</button>' : ''}</div>`;
        const denovo = document.getElementById('denovo');
        if (denovo) {
          denovo.onclick = () => telaRevisar(filtro);
        }
        return;
      }
      const chave = fila[i];
      const e = estado.erros[chave];
      const t = trilha(e.trilha);
      app.innerHTML = `<div class="cartas cor-${esc(t.cor)}"><div class="meta"><span>Questão ${i + 1} de ${fila.length}</span><span>${acertos} acertos</span></div>
        ${barra(Math.round((i / fila.length) * 100))}
        ${e.passagem ? `<details class="passagem"><summary>Ver o texto da questão</summary>${emMarkdown(e.passagem)}</details>` : ''}
        <div class="questao-inline" id="caixa"></div>
        <div class="acoes"><button class="principal" id="seguir" hidden>Próxima →</button></div></div>`;
      questaoInterativa(document.getElementById('caixa'), e, {
        rotulo: nomeModulo(e) || t.titulo,
        aoResponder: (letra, certo) => {
          registrar('questao');
          registrarTopico(e.trilha, e.modulo, certo);
          if (certo) {
            acertos += 1;
            delete estado.erros[chave];
          } else {
            e.vezes += 1;
          }
          salvar();
          const seguir = document.getElementById('seguir');
          seguir.hidden = false;
          seguir.focus();
        },
      });
      document.getElementById('seguir').onclick = () => { i += 1; desenhar(); };
    };
    desenhar();
  };
}

/* ---------- Flashcards ---------- */

async function explorarCartas(t, todas) {
  const cartas = [...todas];
  let i = 0;
  let virada = false;
  const desenhar = () => {
    const c = cartas[i];
    app.innerHTML = `<a class="voltar" href="#/trilha/${esc(t.id)}/flashcards">← Sessão de hoje</a>
      <div class="cartas cor-${esc(t.cor || 'azul')}">
        <h1>Todos os cartões</h1>
        <div class="meta"><span>Cartão ${i + 1} de ${cartas.length}</span><span>Modo livre: não altera as revisões</span></div>
        <button class="carta ${virada ? 'virada' : ''}" id="virar" aria-label="Virar cartão" aria-live="polite">
          <span class="carta-interna"><span class="face"><small>Pergunta</small>${esc(c.frente)}</span><span class="face verso"><small>Resposta</small>${esc(c.verso)}</span></span>
        </button>
        <div class="acoes"><button id="ant">← Anterior</button><button id="misturar">Embaralhar</button><button id="prox">Próximo →</button></div>
      </div>`;
    const ir = (passo) => { i = (i + passo + cartas.length) % cartas.length; virada = false; desenhar(); };
    document.getElementById('virar').onclick = () => { virada = !virada; document.getElementById('virar').classList.toggle('virada', virada); };
    document.getElementById('ant').onclick = () => ir(-1);
    document.getElementById('prox').onclick = () => ir(1);
    document.getElementById('misturar').onclick = () => {
      for (let k = cartas.length - 1; k > 0; k -= 1) {
        const j = Math.floor(Math.random() * (k + 1));
        [cartas[k], cartas[j]] = [cartas[j], cartas[k]];
      }
      i = 0;
      virada = false;
      desenhar();
    };
  };
  window.onkeydown = (evento) => {
    if (!document.getElementById('virar')) {
      return;
    }
    if (evento.key === 'ArrowRight') {
      document.getElementById('prox').click();
    } else if (evento.key === 'ArrowLeft') {
      document.getElementById('ant').click();
    } else if (evento.key === ' ' && evento.target === document.body) {
      evento.preventDefault();
      document.getElementById('virar').click();
    }
  };
  desenhar();
}

async function telaFlashcards(id, modo) {
  marcarNav('inicio');
  const t = await trilhaPorId(id);
  const todas = await buscar(`content/${id}/${t.flashcards}`);
  if (modo === 'todos') {
    await explorarCartas(t, todas);
    return;
  }
  const { devidas, novas, ineditas } = filaDeHoje(id, todas);
  const fila = [...devidas, ...novas];
  let virada = false;
  let feitas = 0;
  const cor = esc(t.cor || 'azul');
  const desenhar = () => {
    const est = estatisticasCartas(id, todas);
    const chips = `<div class="chips"><span>${est.novas} novos</span><span>${est.aprendendo} aprendendo</span><span class="ok">${est.dominadas} dominados</span></div>`;
    if (!fila.length) {
      const srs = srsTrilha(id);
      const futuras = Object.values(srs).map((x) => x.proxima).filter((d) => d > dataLocal()).sort();
      const restam = todas.filter((c) => !srs[c.frente]).length;
      app.innerHTML = `<a class="voltar" href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a>
        <div class="cartas cor-${cor}"><h1>${feitas ? 'Sessão de hoje concluída' : 'Nada para revisar agora'}</h1>
        <p class="sub">${feitas ? `Você revisou ${feitas} ${feitas === 1 ? 'cartão' : 'cartões'}. ` : ''}${futuras.length ? `A próxima revisão é em ${esc(formatarData(futuras[0]))}.` : ''} Cada cartão volta no momento em que você estaria quase esquecendo.</p>
        ${chips}${barra(Math.round((est.dominadas / todas.length) * 100))}
        <div class="acoes">${restam ? `<button class="principal" id="mais">Aprender mais ${Math.min(NOVAS_POR_DIA, restam)} novos</button>` : ''}<a class="botao" href="#/trilha/${esc(id)}/flashcards/todos">Ver todos os cartões</a></div></div>`;
      const mais = document.getElementById('mais');
      if (mais) {
        mais.onclick = () => {
          const dia = diaDeHoje();
          dia.extras[id] = (dia.extras[id] || 0) + NOVAS_POR_DIA;
          salvar();
          telaFlashcards(id);
        };
      }
      return;
    }
    const c = fila[0];
    const srs = srsTrilha(id);
    const caixa = srs[c.frente] ? srs[c.frente].caixa : 0;
    const opcoes = [['errei', 'Errei', '1'], ['dificil', 'Difícil', '2'], ['facil', 'Fácil', '3']];
    app.innerHTML = `<a class="voltar" href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a>
      <div class="cartas cor-${cor}">
        <h1>Flashcards de hoje</h1>
        <div class="meta"><span>Faltam ${fila.length}${ineditas && novas.length ? ` · ${fila.filter((x) => !srs[x.frente]).length} novos` : ''}</span><span>${feitas} revisados</span></div>
        ${chips}
        <button class="carta ${virada ? 'virada' : ''}" id="virar" aria-label="Virar cartão" aria-live="polite">
          <span class="carta-interna"><span class="face">${caixa ? '' : '<em class="nova">Novo</em>'}<small>Pergunta</small>${esc(c.frente)}</span><span class="face verso"><small>Resposta</small>${esc(c.verso)}</span></span>
        </button>
        <div class="acoes notas" id="notas">${virada
          ? opcoes.map(([nota, rotulo, tecla]) => `<button class="nota-${nota}" data-nota="${nota}"><b>${rotulo}</b><small>${nota === 'errei' ? 'volta já' : textoDias(proximoIntervalo(caixa, nota).dias)}<span class="tecla"> · tecla ${tecla}</span></small></button>`).join('')
          : '<button class="principal" id="mostrar">Mostrar resposta</button>'}</div>
        <p class="aviso">Tente lembrar antes de virar. Seja honesto na nota: é ela que decide quando o cartão volta.</p>
        <p class="aviso"><a href="#/trilha/${esc(id)}/flashcards/todos">Ver todos os cartões em modo livre</a></p>
      </div>`;
    const virar = () => { virada = true; desenhar(); };
    document.getElementById('virar').onclick = () => { if (!virada) { virar(); } };
    const mostrar = document.getElementById('mostrar');
    if (mostrar) {
      mostrar.onclick = virar;
    }
    app.querySelectorAll('[data-nota]').forEach((botao) => {
      botao.onclick = () => {
        avaliarCarta(id, c.frente, botao.dataset.nota);
        feitas += 1;
        fila.shift();
        if (botao.dataset.nota === 'errei') {
          fila.push(c);
        }
        virada = false;
        desenhar();
      };
    });
  };
  window.onkeydown = (evento) => {
    if (!document.getElementById('virar') || evento.target.matches('input, select, textarea')) {
      return;
    }
    if ((evento.key === ' ' || evento.key === 'Enter') && !virada) {
      evento.preventDefault();
      virada = true;
      desenhar();
    } else if (virada && ['1', '2', '3'].includes(evento.key)) {
      const botao = app.querySelectorAll('[data-nota]')[Number(evento.key) - 1];
      if (botao) {
        botao.click();
      }
    }
  };
  desenhar();
}

/* ---------- Progresso ---------- */

async function telaProgresso() {
  marcarNav('progresso');
  const cat = await catalogo();
  const ativas = cat.trilhas.filter((t) => t.status === 'ativa');
  const nomeTrilha = (id) => (cat.trilhas.find((t) => t.id === id) || {}).titulo || id;
  const dias = Object.values(estado.dias);
  const totais = {
    pontos: dias.reduce((s, d) => s + d.pontos, 0),
    cartas: dias.reduce((s, d) => s + d.cartas, 0),
    questoes: dias.reduce((s, d) => s + d.questoes, 0),
    ativos: dias.filter((d) => d.pontos > 0).length,
  };
  const linhas = estado.tentativas.map((r, i) => ({ r, i })).reverse().map(({ r, i }) => `<tr>
    <td>${esc(new Date(r.data).toLocaleDateString('pt-BR'))}</td><td>${esc(nomeTrilha(r.trilha))}</td>
    <td><span class="${r.aprovado ? 'ok' : 'ruim'}">${esc(r.total)}/${esc(r.de)}</span></td><td><a href="#/resultado/${i}">ver correção</a></td></tr>`).join('');
  app.innerHTML = `<h1>Meu progresso</h1>
    <p class="sub">Tudo aqui fica só neste navegador. Para usar em outro aparelho, baixe o backup e restaure lá.</p>
    <div class="numeros">
      <div class="numero"><b>${sequencia()}</b><span>dias seguidos</span></div>
      <div class="numero"><b>${totais.ativos}</b><span>dias estudados</span></div>
      <div class="numero"><b>${totais.pontos}</b><span>pontos no total</span></div>
      <div class="numero"><b>${totais.cartas}</b><span>cartões revisados</span></div>
      <div class="numero"><b>${totais.questoes}</b><span>questões respondidas</span></div>
    </div>
    <label for="nome">Seu nome, usado na saudação e no resultado copiado</label><br>
    <input type="text" id="nome" value="${esc(estado.nome)}" maxlength="60">
    <h2>Trilhas</h2>
    <div class="grade">${ativas.map((t) => { const p = progressoTrilha(t); const n = melhorNota(t.id); return `<a class="trilha-cartao cor-${esc(t.cor || 'azul')}" href="#/trilha/${esc(t.id)}">
      <h3>${esc(t.titulo)}</h3>${barra(p.pct)}<div class="meta"><span>${p.lidos} de ${p.total} lidos</span><span>${n ? `Melhor: ${n.total}/${n.de}` : 'Sem simulado'}</span></div></a>`; }).join('')}</div>
    <h2>Simulados entregues</h2>
    ${linhas ? `<div class="hist-caixa"><table class="hist"><thead><tr><th>Data</th><th>Trilha</th><th>Nota</th><th></th></tr></thead><tbody>${linhas}</tbody></table></div>` :'<p class="aviso">Nenhum simulado entregue ainda.</p>'}
    <h2>Backup</h2>
    <div class="acoes"><button id="exportar">Baixar backup</button><label class="botao">Restaurar backup<input type="file" id="importar" accept="application/json" hidden></label></div>
    <p class="alerta" id="msg" role="status"></p>`;
  document.getElementById('nome').oninput = (evento) => { estado.nome = evento.target.value; salvar(); };
  document.getElementById('exportar').onclick = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(estado, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hub-estudos-backup.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  document.getElementById('importar').onchange = async (evento) => {
    try {
      const dados = JSON.parse(await evento.target.files[0].text());
      if (!Array.isArray(dados.tentativas)) {
        throw new Error('formato');
      }
      Object.assign(estado, dados);
      salvar();
      telaProgresso();
    } catch (erro) {
      document.getElementById('msg').textContent = 'Arquivo de backup inválido.';
    }
  };
}

/* ---------- Tema e rotas ---------- */

function alternarTema() {
  const raiz = document.documentElement;
  const escuroAgora = raiz.dataset.theme ? raiz.dataset.theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  raiz.dataset.theme = escuroAgora ? 'light' : 'dark';
  try {
    localStorage.setItem(CHAVE_TEMA, raiz.dataset.theme);
  } catch (erro) {
    console.warn('Não foi possível salvar o tema.', erro);
  }
}

async function rotear() {
  clearInterval(cronometro);
  app.onchange = null;
  window.onkeydown = null;
  if (aoRolar) {
    window.removeEventListener('scroll', aoRolar);
    aoRolar = null;
  }
  const p = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  try {
    if (p.length === 0) {
      await telaInicio();
    } else if (p[0] === 'progresso') {
      await telaProgresso();
    } else if (p[0] === 'revisar') {
      await telaRevisar(p[1]);
    } else if (p[0] === 'resultado') {
      await telaResultado(p[1]);
    } else if (p[0] === 'trilha' && p[2] === 'ler') {
      await telaLeitura(p[1], p[3]);
    } else if (p[0] === 'trilha' && p[2] === 'avaliacao') {
      await telaAvaliacao(p[1], p[3]);
    } else if (p[0] === 'trilha' && p[2] === 'flashcards') {
      await telaFlashcards(p[1], p[3]);
    } else if (p[0] === 'trilha') {
      await telaTrilha(p[1]);
    } else {
      throw new Error('Página não encontrada.');
    }
  } catch (erro) {
    app.innerHTML = `<h1>Não foi possível abrir</h1><p>${esc(erro.message)}</p><p><a href="#/">Voltar ao início</a></p>`;
  }
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

document.getElementById('tema').onclick = alternarTema;
window.addEventListener('hashchange', rotear);
atualizarSelo();
rotear();
