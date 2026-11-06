# Hub de Estudos

Base de conhecimento com apostilas, simulados corrigidos e flashcards. É um site estático, sem etapa de build, publicado pelo GitHub Pages.

## Como adicionar uma trilha

1. Crie a pasta `content/<id-da-trilha>/`.
2. Coloque os textos em arquivos `.md`. Fórmulas vão em blocos de código `latex`.
3. Opcionalmente, adicione uma avaliação em JSON (siga `content/transpetro-2026/simulado.json`) e flashcards em JSON. Em cada questão do simulado, o campo `modulo` liga a questão ao módulo, para o desempenho por tópico.
4. Registre a trilha em `content/catalogo.json`, com `tipo` igual a `concurso` ou `curso`.

### Teste rápido no meio do texto

Dentro de um módulo, um bloco `questao` vira uma questão corrigida no clique. A alternativa certa leva `*` antes da letra, e a linha com `>` é a explicação:

````markdown
```questao
A velocidade síncrona de um motor de 4 polos em 60 Hz é
A) 3.600 rpm
*B) 1.800 rpm
C) 1.200 rpm
> ns = 120 × f / p = 1.800 rpm.
```
````

Questões erradas, no simulado ou no teste rápido, vão para o caderno de erros (Revisar). Os flashcards usam repetição espaçada: Errei volta na mesma sessão, Difícil e Fácil marcam a próxima revisão.

## Testar localmente

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Limitação atual

Não há login nem banco de dados. As trilhas atuais são Transpetro 2026 (Eletrônica e Elétrica), IA e agentes, Produto digital e Zeny ERP (vazia). Notas e progresso ficam no navegador de cada pessoa, que pode baixar um backup ou copiar o resultado para enviar.
