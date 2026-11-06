**Agente é um modelo em ciclo com ferramentas, e o harness é tudo em volta que o torna confiável.** A fórmula que se popularizou é [Agente = Modelo + Harness](https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html).


A qualidade depende desse ciclo terminar com uma checagem real. Sem verificação, o agente para quando o trabalho [parece pronto](https://code.claude.com/docs/en/best-practices.md).

### Partes do harness

| Parte | Função | No Claude | No Devin |
| --- | --- | --- | --- |
| Instruções | Contexto permanente | `CLAUDE.md`, rules | `AGENTS.md`, rules |
| Procedimentos | Conhecimento sob demanda | Skills | Skills |
| Memória | Aprendizado entre sessões | Auto memory | Memory e Dreaming |
| Controles | Limitar ações | Permissões, hooks, sandbox | Permissões, hooks, sandbox |
| Isolamento | Separar tarefas | Subagentes, worktrees | Subagentes, sessões, worktrees |
| Ambiente | Rodar e testar | Sua máquina | Sua máquina ou VM |
| Verificação | Provar resultado | Testes, `/code-review`, `/goal` | Testes, Devin Review |

### Comandos para decorar

| Quero | Claude Code | Devin CLI |
| --- | --- | --- |
| Limpar a conversa | `/clear` | `/clear` ou `/new` |
| Resumir o contexto | `/compact` | `/compact` |
| Trocar modelo | `/model` | `/model` |
| Mudar esforço | `/effort` | Depende do modelo escolhido |
| Planejar antes | Modo Plan, `Ctrl+Shift+M` no app | `/plan` |
| Perguntar sem editar | `/btw` para conversa lateral | `/ask` |
| Ver contexto | `/context` | Não encontrei equivalente documentado |
| Ver consumo | `/usage` | **Usage & limits** na web |
| Retomar | `/resume` | `/resume` ou `devin -c` |
| Trabalhar até uma condição | [`/goal`](https://code.claude.com/docs/en/goal.md) | Critério no pedido |
| Revisar | `/code-review` | `/devin review` no PR |
| Mandar para a nuvem | Sessão na nuvem | `/handoff` |
| Rever como você trabalha | `/insights` | Session Insights |

Confira no menu `/` do app, porque nem todo comando do terminal aparece no Desktop. Fontes: [Claude Code](https://code.claude.com/docs/en/costs.md), [app Desktop](https://code.claude.com/docs/en/desktop.md) e [Devin CLI](https://docs.devin.ai/cli/essential-commands.md).

### Três ritmos de autonomia

1. **Acompanhada:** esforço baixo, você revisa cada passo.
2. **Delimitada:** plano aprovado, permissão Auto ou Smart, verificação no fim.
3. **Em segundo plano:** worktree ou nuvem, critério forte e PR como entrega.

**Exercício:** antes de uma correção, peça o plano com os arquivos e a verificação. Aprove, execute e confira se a evidência final prova o critério.
