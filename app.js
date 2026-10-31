'use strict';

const CHAVE = 'hub-estudos:v1';
const app = document.getElementById('app');
const cache = {};
let cronometro = null;

function carregarEstado() {
  const base = { nome: '', lidos: {}, rascunhos: {}, tentativas: [] };
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

async function trilhaPorId(id) {
  const catalogo = await buscar('content/catalogo.json');
  const trilha = catalogo.trilhas.find((item) => item.id === id);
  if (!trilha) {
    throw new Error('Trilha não encontrada.');
  }
  return trilha;
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

async function telaInicio() {
  const catalogo = await buscar('content/catalogo.json');
  app.innerHTML = `<h1>Hub de Estudos</h1>
    <p class="sub">Apostilas, simulados corrigidos e flashcards em um só lugar.</p>
    ${catalogo.trilhas.map((t) => `<a class="cartao" href="#/trilha/${esc(t.id)}">
      <strong>${esc(t.titulo)}</strong>${esc(t.descricao)}
      ${t.status === 'ativa' ? '' : '<br><span class="etiqueta">Em construção</span>'}
    </a>`).join('')}`;
}

async function telaTrilha(id) {
  const t = await trilhaPorId(id);
  const lista = t.materiais.map((m) => `<li><a href="#/trilha/${esc(id)}/ler/${esc(m.id)}">
    <span>${esc(m.titulo)}</span>${estado.lidos[`${id}/${m.id}`] ? '<span class="feito">lido</span>' : ''}</a></li>`).join('');
  const avaliacoes = t.avaliacoes.map((a) => {
    const feitas = estado.tentativas.filter((x) => x.trilha === id && x.avaliacao === a.id).length;
    return `<a class="cartao" href="#/trilha/${esc(id)}/avaliacao/${esc(a.id)}"><strong>${esc(a.titulo)}</strong>${feitas} tentativa(s) registrada(s) neste navegador</a>`;
  }).join('');
  app.innerHTML = `<p><a href="#/">← Trilhas</a></p><h1>${esc(t.titulo)}</h1><p class="sub">${esc(t.descricao)}</p>
    ${t.status === 'ativa' ? '' : '<p class="aviso">Esta trilha ainda não tem conteúdo.</p>'}
    ${avaliacoes ? `<h2>Avaliações</h2>${avaliacoes}` : ''}
    ${t.flashcards ? `<h2>Memorização</h2><a class="cartao" href="#/trilha/${esc(id)}/flashcards"><strong>Flashcards</strong>Pergunta na frente, resposta no verso.</a>` : ''}
    ${lista ? `<h2>Material</h2><ul class="lista">${lista}</ul>` : ''}`;
}

async function telaLeitura(id, materialId) {
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
  app.innerHTML = `<p><a href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a></p>
    <h1>${esc(m.titulo)}</h1><article class="leitura">${emMarkdown(texto)}</article>
    <div class="acoes">
      <button id="lido">${estado.lidos[chave] ? 'Desmarcar como lido' : 'Marcar como lido'}</button>
      ${ant ? `<a class="botao" href="#/trilha/${esc(id)}/ler/${esc(ant.id)}">← Anterior</a>` : ''}
      ${prox ? `<a class="botao" href="#/trilha/${esc(id)}/ler/${esc(prox.id)}">Próximo →</a>` : ''}
    </div>`;
  renderizarFormulas(app);
  document.getElementById('lido').onclick = (evento) => {
    estado.lidos[chave] = !estado.lidos[chave];
    salvar();
    evento.target.textContent = estado.lidos[chave] ? 'Desmarcar como lido' : 'Marcar como lido';
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
  const rodape = corrigida ? `<p class="expl">Resposta ${esc(q.resposta)}. ${esc(q.explicacao)}${marcada ? '' : ' Questão em branco.'}</p>` : '';
  return `<div class="questao" id="q-${q.n}"><fieldset><legend><strong>${q.n}.</strong> ${esc(q.enunciado)}</legend>${alternativas}</fieldset>${rodape}</div>`;
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

async function telaAvaliacao(id, avaliacaoId) {
  const t = await trilhaPorId(id);
  const a = t.avaliacoes.find((x) => x.id === avaliacaoId);
  if (!a) {
    throw new Error('Avaliação não encontrada.');
  }
  const prova = await buscar(`content/${id}/${a.arquivo}`);
  const chave = `${id}/${a.id}`;
  const rascunho = estado.rascunhos[chave];
  if (!rascunho) {
    app.innerHTML = `<p><a href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a></p><h1>${esc(prova.titulo)}</h1>
      <p class="sub">${esc(prova.descricao)}</p>
      <p>A correção mostra a resposta certa e a explicação de cada questão.</p>
      <p>Limites: ${prova.grupos.map((g) => `${esc(g.titulo)}, mínimo ${g.minimo} e meta ${g.meta}`).join('; ')}.</p>
      <div class="acoes"><button class="principal" id="iniciar">Iniciar agora</button></div>`;
    document.getElementById('iniciar').onclick = () => {
      estado.rascunhos[chave] = { inicio: Date.now(), respostas: {} };
      salvar();
      telaAvaliacao(id, avaliacaoId);
    };
    return;
  }
  const atualizar = () => {
    const decorrido = (Date.now() - rascunho.inicio) / 1000;
    const restante = prova.minutos * 60 - decorrido;
    const respondidas = Object.keys(rascunho.respostas).length;
    const tempo = document.getElementById('tempo');
    if (tempo) {
      tempo.textContent = restante >= 0 ? `Restam ${formatarTempo(restante)}` : `Tempo esgotado há ${formatarTempo(-restante)}`;
      document.getElementById('cont').textContent = `${respondidas} de ${prova.questoes.length}`;
    }
  };
  app.innerHTML = `<h1>${esc(prova.titulo)}</h1>
    <div class="barra"><span class="tempo" id="tempo"></span><span id="cont"></span><button class="principal" id="entregar">Entregar</button></div>
    ${provaHtml(prova, rascunho.respostas, false)}
    <div class="acoes"><button class="principal" id="entregar2">Entregar</button><button id="descartar">Descartar tentativa</button></div>`;
  atualizar();
  cronometro = setInterval(atualizar, 1000);
  app.onchange = (evento) => {
    if (evento.target.matches('input[type=radio]')) {
      rascunho.respostas[evento.target.name.slice(1)] = evento.target.value;
      salvar();
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
  const r = estado.tentativas[Number(indice)];
  if (!r) {
    throw new Error('Tentativa não encontrada.');
  }
  const t = await trilhaPorId(r.trilha);
  const a = t.avaliacoes.find((x) => x.id === r.avaliacao);
  const prova = await buscar(`content/${r.trilha}/${a.arquivo}`);
  const nota = calcularNota(prova, r.respostas);
  const resumo = `${estado.nome || 'Resultado'} — ${prova.titulo}: ${nota.total}/${prova.questoes.length} (${nota.grupos.map((g) => `${g.titulo} ${g.pontos}/${g.total}`).join('; ')}) em ${formatarTempo(r.segundos)}.`;
  app.innerHTML = `<p><a href="#/trilha/${esc(r.trilha)}">← ${esc(t.titulo)}</a></p>
    <h1>Resultado: ${nota.total} de ${prova.questoes.length}</h1>
    <p class="${nota.aprovado ? 'ok' : 'ruim'}">${nota.aprovado ? 'Passaria nos mínimos da prova.' : 'Ficaria abaixo dos mínimos da prova.'}</p>
    <div class="nota">${nota.grupos.map((g) => `<div>${esc(g.titulo)}<b>${g.pontos}/${g.total}</b>
      <span class="${g.aprovado ? 'ok' : 'ruim'}">mínimo ${g.minimo}${g.zerou ? ', disciplina zerada' : ''}</span>; meta ${g.meta}</div>`).join('')}
      <div>Tempo<b>${formatarTempo(r.segundos)}</b>de ${prova.minutos} min</div></div>
    <p class="aviso">Por disciplina: ${prova.blocos.map((b) => `${esc(b.titulo)} ${nota.acertos[b.id]}`).join(' · ')}.</p>
    <div class="acoes"><button id="copiar">Copiar resultado para enviar</button></div>
    ${provaHtml(prova, r.respostas, true)}`;
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
  const t = await trilhaPorId(id);
  const cards = [...await buscar(`content/${id}/${t.flashcards}`)];
  let i = 0;
  let verso = false;
  const desenhar = () => {
    const c = cards[i];
    app.innerHTML = `<p><a href="#/trilha/${esc(id)}">← ${esc(t.titulo)}</a></p><h1>Flashcards</h1>
      <p class="sub">Cartão ${i + 1} de ${cards.length}</p>
      <button class="card" id="virar" aria-live="polite">${esc(verso ? c.verso : c.frente)}</button>
      <div class="acoes"><button id="ant">← Anterior</button><button class="principal" id="prox">Próximo →</button><button id="misturar">Embaralhar</button></div>`;
    document.getElementById('virar').onclick = () => { verso = !verso; desenhar(); };
    document.getElementById('ant').onclick = () => { i = (i - 1 + cards.length) % cards.length; verso = false; desenhar(); };
    document.getElementById('prox').onclick = () => { i = (i + 1) % cards.length; verso = false; desenhar(); };
    document.getElementById('misturar').onclick = () => {
      for (let k = cards.length - 1; k > 0; k -= 1) {
        const j = Math.floor(Math.random() * (k + 1));
        [cards[k], cards[j]] = [cards[j], cards[k]];
      }
      i = 0;
      verso = false;
      desenhar();
    };
  };
  desenhar();
}

function telaProgresso() {
  const linhas = estado.tentativas.map((r, i) => ({ r, i })).reverse().map(({ r, i }) => `<tr>
    <td>${esc(new Date(r.data).toLocaleDateString('pt-BR'))}</td><td>${esc(r.titulo)}</td>
    <td>${esc(r.total)}/${esc(r.de)}</td><td><a href="#/resultado/${i}">ver</a></td></tr>`).join('');
  app.innerHTML = `<h1>Meu progresso</h1>
    <p class="sub">Tudo aqui fica só neste navegador. Em outro aparelho, use o backup.</p>
    <label for="nome">Seu nome, usado no resultado copiado</label><br>
    <input type="text" id="nome" value="${esc(estado.nome)}" maxlength="60">
    <h2>Tentativas</h2>
    ${linhas ? `<table class="hist"><thead><tr><th>Data</th><th>Avaliação</th><th>Nota</th><th></th></tr></thead><tbody>${linhas}</tbody></table>` : '<p class="aviso">Nenhuma avaliação entregue ainda.</p>'}
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

async function rotear() {
  clearInterval(cronometro);
  app.onchange = null;
  const p = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  try {
    if (p.length === 0) {
      await telaInicio();
    } else if (p[0] === 'progresso') {
      telaProgresso();
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

window.addEventListener('hashchange', rotear);
rotear();
