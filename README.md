# Hub de Estudos

Base de conhecimento com apostilas, simulados corrigidos e flashcards. É um site estático, sem etapa de build, publicado pelo GitHub Pages.

## Como adicionar uma trilha

1. Crie a pasta `content/<id-da-trilha>/`.
2. Coloque os textos em arquivos `.md`. Fórmulas vão em blocos de código `latex`.
3. Opcionalmente, adicione uma avaliação em JSON (siga `content/transpetro-2026/simulado.json`) e flashcards em JSON.
4. Registre a trilha em `content/catalogo.json`.

## Testar localmente

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Limitação atual

Não há login nem banco de dados. As trilhas atuais são Transpetro 2026 (Eletrônica e Elétrica), IA e agentes, e Zeny ERP (vazia). Notas e progresso ficam no navegador de cada pessoa, que pode baixar um backup ou copiar o resultado para enviar.
