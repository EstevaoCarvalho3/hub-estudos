**A tendência mais útil para você é trocar instrução longa por contexto mínimo, verificação e controle real.** A área muda rápido e parte da evidência é preliminar, então trate os números como sinais.

| Tendência | O que observar | Evidência | O que fazer |
| --- | --- | --- | --- |
| Harness engineering | O ambiente em volta do modelo muda muito o resultado | Levantamento cita [68% para 88% de sucesso com o mesmo modelo em 25 tarefas](https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html). Fonte secundária de quem também vende harness | Medir uma mudança por vez |
| Instruções enxutas | Arquivo longo ou gerado pode atrapalhar | [Estudo da ETH Zurich](https://arxiv.org/pdf/2602.11988): arquivos de contexto, em geral, não melhoraram o sucesso e aumentaram o custo em mais de 20%. Vale para o cenário testado | Manter só o que o agente não descobre sozinho |
| Verificação primeiro | O agente precisa de um sinal de passou ou falhou | [Boas práticas do Claude Code](https://code.claude.com/docs/en/best-practices.md) | Terminar todo pedido com um teste ou evidência |
| Evals | Medir se a skill ou o agente melhoraram | [Guia da Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Criar 5 a 10 casos reais para suas skills |
| Permissão por classificador | Aprovação manual cansa | Usuários [aceitam cerca de 93% dos pedidos](https://www.anthropic.com/engineering/claude-code-auto-mode) | Usar Auto com `deny` e revisão de PR |
| Skills como padrão | Procedimentos portáveis entre agentes | [Agent Skills](https://agentskills.io/) entrou na [AAIF](https://www.linuxfoundation.org/press/agentic-ai-foundation-announces-four-new-projects-agent-skills-open-responses-openenv-and-opensandbox) | Manter skills em `.agents/skills` |
| Agentes em segundo plano | Várias tarefas em paralelo | [Worktrees](https://code.claude.com/docs/en/worktrees.md), [agent view](https://code.claude.com/docs/en/agent-view.md) e [Devin na nuvem](https://docs.devin.ai/essential-guidelines/when-to-use-devin.md) | Paralelizar só o que sua revisão consegue absorver |

### Quanto a IA aumenta a produtividade?

**Ninguém tem uma resposta limpa para desenvolvedores experientes.** Os dados do METR ajudam a evitar conclusões fáceis:

- No [início de 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), tarefas levaram 19% mais tempo com IA.
- No [fim de 2025](https://metr.org/blog/2026-02-24-uplift-update/), desenvolvedores do estudo original tiveram estimativa de 18% menos tempo, com intervalo de −38% a +9%.
- O METR alerta que esse dado é fraco, porque muitos se recusaram a trabalhar sem IA.
- Em [pesquisa de 2026](https://metr.org/blog/2026-05-11-ai-usage-survey/), a mediana relatou 1,4 a 2 vezes mais valor no trabalho. O dado é autodeclarado, e o METR pede cautela.

**Lição prática:** meça o seu ganho. Compare tempo até o PR, retrabalho e cards concluídos antes e depois de cada ajuste.

### Como acompanhar sem perder tempo

- Toda semana: leia o [What's new do Claude Code](https://code.claude.com/docs/en/whats-new/index.md) e o [changelog da CLI do Devin](https://docs.devin.ai/cli/changelog/stable.md).
- Todo mês: rode `/doctor prompt-audit` e remova regras antigas.
- A cada novo modelo: refaça a tabela de modelo e esforço.

**Exercício:** escolha uma regra do seu `CLAUDE.md`. Teste a mesma tarefa com e sem ela. Mantenha a regra apenas se fizer diferença.

```questao
Segundo este módulo, a tendência mais útil no uso de agentes é
A) escrever instruções cada vez mais longas
*B) trocar instrução longa por contexto mínimo, verificação e controle real
C) aprovar manualmente cada ação
D) evitar testes automatizados
> Estudos recentes indicam que arquivos de instrução longos podem piorar e encarecer o resultado. Verificação e controle dão o sinal de que funcionou.
```
