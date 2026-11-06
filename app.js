'use strict';

const CHAVE = 'hub-estudos:v1';
const CHAVE_TEMA = 'hub-estudos:tema';
const app = document.getElementById('app');
const cache = {};
let cronometro = null;
let aoRolar = null;

function carregarEstado() {
  const base = { nome: '', lidos: {}, rascunhos: {}, tentativas: [], cartas: {} };
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

function progressoTrilha(t) {
  const total = t.materiais.length;
  const lidos = t.materiais.filter((m) => estado.lidos[`${t.id}/${m.id}`]).length;
  return { total, lidos, pct: total ? Math.round((lidos / total) * 100) : 0 };
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

async function telaInicio() {
  marcarNav('inicio');
  const cat = await catalogo();
  const ativas = cat.trilhas.filter((t) => t.status === 'ativa');
  const modulos = ativas.reduce((s, t) => s + t.materiais.filter((m) => m.id.startsWith('modulo')).length, 0);
  const avaliacoes = ativas.reduce((s, t) => s + t.avaliacoes.length, 0);
  const areas = [...new Set(cat.trilhas.map((t) => t.area || 'Outros'))];
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
  app.innerHTML = `<section class="heroi">
      <h1>Hub de Estudos</h1>
      <p class="sub">Apostilas, simulados corrigidos na hora e flashcards para memorizar. Escolha uma trilha e acompanhe o seu progresso.</p>
      <div class="numeros">
        <div class="numero"><b>${ativas.length}</b><span>trilhas ativas</span></div>
        <div class="numero"><b>${modulos}</b><span>módulos</span></div>
        <div class="numero"><b>${avaliacoes}</b><span>simulados</span></div>
        <div class="numero"><b>${estado.tentativas.length}</b><span>tentativas suas</span></div>
      </div>
    </section>
    ${areas.map((area) => `<h2 class="area-titulo">${esc(area)}</h2>
      <div class="grade">${cat.trilhas.filter((t) => (t.area || 'Outros') === area).map(cartao).join('')}</div>`).join('')}`;
}

async function telaTrilha(id) {
  marcarNav('inicio');
  const t = await trilhaPorId(id);
  const p = progressoTrilha(t);
  const apoio = t.materiais.filter((m) => !m.id.startsWith('modulo'));
  const modulos = t.materiais.filter((m) => m.id.startsWith('modulo'));
  const proximo = modulos.find((m) => !estado.lidos[`${id}/${m.id}`]) || modulos[0];
  const acoes = [];
  if (proximo) {
    acoes.push(`<a class="acao" href="#/trilha/${esc(id)}/ler/${esc(proximo.id)}"><strong>${p.lidos ? 'Continuar estudando' : 'Começar pelo primeiro módulo'}</strong><span>${esc(proximo.titulo)}</span></a>`);
  }
  t.avaliacoes.forEach((a) => {
    const nota = melhorNota(id, a.id);
    const andamento = estado.rascunhos[`${id}/${a.id}`];
    acoes.push(`<a class="acao" href="#/trilha/${esc(id)}/avaliacao/${esc(a.id)}"><strong>${esc(a.titulo)}</strong>
      <span>${andamento ? 'Tentativa em andamento' : nota ? `Melhor nota: ${nota.total} de ${nota.de}` : 'Ainda não feito'}</span></a>`);
  });
  if (t.flashcards) {
    const sabidas = (estado.cartas[id] || []).length;
    acoes.push(`<a class="acao" href="#/trilha/${esc(id)}/flashcards"><strong>Flashcards</strong><span>${sabidas ? `${sabidas} marcados como "sabia"` : 'Pergunta na frente, resposta no verso'}</span></a>`);
  }
  app.innerHTML = `<a class="voltar" href="#/">← Todas as trilhas</a>
    <section class="cabecalho-trilha cor-${esc(t.cor || 'azul')}">
      <span class="etiqueta">${esc(t.area || '')}</span>
      <h1>${esc(t.titulo)}</h1><p class="sub">${esc(t.descricao)}</p>
      ${t.status === 'ativa' ? `${barra(p.pct)}<div class="meta"><span>${p.lidos} de ${p.total} materiais lidos</span><span>${p.pct}%</span></div>` : '<p class="aviso">Esta trilha ainda não tem conteúdo.</p>'}
    </section>
    ${acoes.length ? `<div class="acoes-rapidas cor-${esc(t.cor || 'azul')}">${acoes.join('')}</div>` : ''}
    ${modulos.length ? `<h2>Módulos</h2><div class="modulos cor-${esc(t.cor || 'azul')}">${modulos.map((m) => `<a class="modulo ${estado.lidos[`${id}/${m.id}`] ? 'lido' : ''}" href="#/trilha/${esc(id)}/ler/${esc(m.id)}">
      <span class="num">${estado.lidos[`${id}/${m.id}`] ? '✓' : esc(numeroModulo(m.titulo))}</span><span>${esc(subtituloModulo(m.titulo))}<small>${estado.lidos[`${id}/${m.id}`] ? 'Lido' : 'Não lido'}</small></span></a>`).join('')}</div>` : ''}
    ${apoio.length ? `<h2>Apoio</h2><div class="modulos cor-${esc(t.cor || 'azul')}">${apoio.map((m) => `<a class="modulo ${estado.lidos[`${id}/${m.id}`] ? 'lido' : ''}" href="#/trilha/${esc(id)}/ler/${esc(m.id)}">
      <span class="num">${estado.lidos[`${id}/${m.id}`] ? '✓' : '•'}</span><span>${esc(m.titulo)}</span></a>`).join('')}</div>` : ''}`;
}

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
        <div class="acoes"><button id="lido" class="${estado.lidos[chave] ? '' : 'principal'}">${estado.lidos[chave] ? '✓ Lido · desmarcar' : 'Marcar como lido'}</button></div>
        <nav class="navegacao" aria-label="Materiais vizinhos">
          ${ant ? `<a href="#/trilha/${esc(id)}/ler/${esc(ant.id)}"><small>Anterior</small>${esc(ant.titulo)}</a>` : '<span></span>'}
          ${prox ? `<a class="prox" href="#/trilha/${esc(id)}/ler/${esc(prox.id)}"><small>Próximo</small>${esc(prox.titulo)}</a>` : ''}
        </nav>
      </div>
    </div>`;
  const artigo = app.querySelector('.leitura');
  renderizarFormulas(artigo);
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
    salvar();
    if (estado.lidos[chave] && prox) {
      window.location.hash = `#/trilha/${id}/ler/${prox.id}`;
    } else {
      telaLeitura(id, materialId);
    }
  };
}

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
      <p>Mínimos: ${prova.grupos.map((g) => `${esc(g.titulo)} ${g.minimo} (meta ${g.meta})`).join(' · ')}. As respostas ficam salvas enquanto você faz a prova.</p>
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
  const resumo = `${estado.nome || 'Resultado'} — ${prova.titulo} (${t.titulo}): ${nota.total}/${prova.questoes.length} (${nota.grupos.map((g) => `${g.titulo} ${g.pontos}/${g.total}`).join('; ')}) em ${formatarTempo(r.segundos)}.`;
  app.innerHTML = `<a class="voltar" href="#/trilha/${esc(r.trilha)}">← ${esc(t.titulo)}</a>
    <h1>Resultado: ${nota.total} de ${prova.questoes.length}</h1>
    <span class="selo ${nota.aprovado ? 'ok' : 'ruim'}">${nota.aprovado ? 'Passaria nos mínimos da prova' : 'Ficaria abaixo dos mínimos da prova'}</span>
    <div class="placar cor-${esc(t.cor || 'azul')}">${nota.grupos.map((g) => `<div>${esc(g.titulo)}<b>${g.pontos}/${g.total}</b>
      <div class="barra-prog"><i style="width:${Math.round((g.pontos / g.total) * 100)}%"></i><span class="marca-min" style="left:${Math.round((g.minimo / g.total) * 100)}%"></span></div>
      <small class="${g.aprovado ? 'ok' : 'ruim'}">mínimo ${g.minimo}${g.zerou ? ', disciplina zerada' : ''} · meta ${g.meta}</small></div>`).join('')}
      <div>Tempo<b>${formatarTempo(r.segundos)}</b><small>de ${prova.minutos} min</small></div></div>
    <p class="aviso">Por disciplina: ${prova.blocos.map((b) => `${esc(b.titulo)} ${nota.acertos[b.id]}`).join(' · ')}.</p>
    <div class="acoes"><button class="principal" id="copiar">Copiar resultado para enviar</button><a class="botao" href="#/trilha/${esc(r.trilha)}/avaliacao/${esc(r.avaliacao)}">Fazer de novo</a></div>
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

async function telaFlashcards(id) {
  marcarNav('inicio');
  const t = await trilhaPorId(id);
  const todas = await buscar(`content/${id}/${t.flashcards}`);
  const sabidas = new Set(estado.cartas[id] || []);
  let somenteRevisar = false;
  let cartas = [...todas];
  let i = 0;
  let virada = false;
  const lista = () => (somenteRevisar ? todas.filter((c) => !sabidas.has(c.frente)) : cartas);
  const desenhar = () => {
    const atual = lista();
    if (!atual.length) {
      app.innerHTML = `<a class="voltar" href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a><h1>Flashcards</h1>
        <p>Você marcou todos os cartões como "sabia".</p><div class="acoes"><button id="zerar">Recomeçar do zero</button></div>`;
      document.getElementById('zerar').onclick = () => { sabidas.clear(); estado.cartas[id] = []; salvar(); somenteRevisar = false; i = 0; desenhar(); };
      return;
    }
    i = Math.min(i, atual.length - 1);
    const c = atual[i];
    app.innerHTML = `<a class="voltar" href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a>
      <div class="cartas cor-${esc(t.cor || 'azul')}">
        <h1>Flashcards</h1>
        <div class="meta"><span>Cartão ${i + 1} de ${atual.length}</span><span>${sabidas.size} de ${todas.length} marcados como "sabia"</span></div>
        ${barra(Math.round((sabidas.size / todas.length) * 100))}
        <button class="carta ${virada ? 'virada' : ''}" id="virar" aria-label="Virar cartão" aria-live="polite">
          <span class="carta-interna"><span class="face"><small>Pergunta</small>${esc(c.frente)}</span><span class="face verso"><small>Resposta</small>${esc(c.verso)}</span></span>
        </button>
        <div class="acoes"><button id="ant">← Anterior</button><button id="revisar">Revisar depois</button><button class="principal" id="sabia">Sabia</button><button id="prox">Próximo →</button></div>
        <div class="acoes"><button id="misturar">Embaralhar</button><button id="filtro">${somenteRevisar ? 'Mostrar todos' : 'Só os que faltam'}</button></div>
        <p class="aviso">Clique no cartão ou aperte espaço para virar. Use as setas para navegar.</p>
      </div>`;
    const ir = (passo) => { i = (i + passo + atual.length) % atual.length; virada = false; desenhar(); };
    document.getElementById('virar').onclick = () => { virada = !virada; document.getElementById('virar').classList.toggle('virada', virada); };
    document.getElementById('ant').onclick = () => ir(-1);
    document.getElementById('prox').onclick = () => ir(1);
    document.getElementById('sabia').onclick = () => { sabidas.add(c.frente); estado.cartas[id] = [...sabidas]; salvar(); if (somenteRevisar) { virada = false; desenhar(); } else { ir(1); } };
    document.getElementById('revisar').onclick = () => { sabidas.delete(c.frente); estado.cartas[id] = [...sabidas]; salvar(); ir(1); };
    document.getElementById('filtro').onclick = () => { somenteRevisar = !somenteRevisar; i = 0; virada = false; desenhar(); };
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

async function telaProgresso() {
  marcarNav('progresso');
  const cat = await catalogo();
  const ativas = cat.trilhas.filter((t) => t.status === 'ativa');
  const nomeTrilha = (id) => (cat.trilhas.find((t) => t.id === id) || {}).titulo || id;
  const linhas = estado.tentativas.map((r, i) => ({ r, i })).reverse().map(({ r, i }) => `<tr>
    <td>${esc(new Date(r.data).toLocaleDateString('pt-BR'))}</td><td>${esc(nomeTrilha(r.trilha))}</td>
    <td><span class="${r.aprovado ? 'ok' : 'ruim'}">${esc(r.total)}/${esc(r.de)}</span></td><td><a href="#/resultado/${i}">ver correção</a></td></tr>`).join('');
  app.innerHTML = `<h1>Meu progresso</h1>
    <p class="sub">Tudo aqui fica só neste navegador. Para usar em outro aparelho, baixe o backup e restaure lá.</p>
    <label for="nome">Seu nome, usado no resultado copiado</label><br>
    <input type="text" id="nome" value="${esc(estado.nome)}" maxlength="60">
    <h2>Trilhas</h2>
    <div class="grade">${ativas.map((t) => { const p = progressoTrilha(t); const n = melhorNota(t.id); return `<a class="trilha-cartao cor-${esc(t.cor || 'azul')}" href="#/trilha/${esc(t.id)}">
      <h3>${esc(t.titulo)}</h3>${barra(p.pct)}<div class="meta"><span>${p.lidos} de ${p.total} lidos</span><span>${n ? `Melhor: ${n.total}/${n.de}` : 'Sem simulado'}</span></div></a>`; }).join('')}</div>
    <h2>Simulados entregues</h2>
    ${linhas ? `<table class="hist"><thead><tr><th>Data</th><th>Trilha</th><th>Nota</th><th></th></tr></thead><tbody>${linhas}</tbody></table>` : '<p class="aviso">Nenhum simulado entregue ainda.</p>'}
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
    } else if (p[0] === 'resultado') {
      await telaResultado(p[1]);
    } else if (p[0] === 'trilha' && p[2] === 'ler') {
      await telaLeitura(p[1], p[3]);
    } else if (p[0] === 'trilha' && p[2] === 'avaliacao') {
      await telaAvaliacao(p[1], p[3]);
    } else if (p[0] === 'trilha' && p[2] === 'flashcards') {
      await telaFlashcards(p[1]);
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
rotear();
