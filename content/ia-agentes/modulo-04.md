**Use a solução mais simples que resolve.** A orientação da Anthropic é [adicionar complexidade só quando melhora o resultado de forma demonstrável](https://www.anthropic.com/engineering/building-effective-agents).

### Cinco padrões para decorar

| Padrão | Como funciona | Exemplo no seu trabalho |
| --- | --- | --- |
| Encadeamento | A saída de um passo alimenta o próximo | Card → diagnóstico → rascunho de resposta |
| Roteamento | Classifica e envia para o caminho certo | Chamado de dados, bug ou melhoria |
| Paralelização | Várias partes ao mesmo tempo | Revisar web, Java e dashboard separados |
| Orquestrador e trabalhadores | Um coordenador divide tarefas imprevisíveis | Mudança que cruza três repositórios |
| Avaliador e otimizador | Um cria e outro avalia em ciclo | Ajustar uma skill com casos de teste |

### Agente, subagente, sessão ou nuvem

| Situação | Use |
| --- | --- |
| Passos dependem uns dos outros | Mesma sessão |
| Leitura longa que polui o contexto | Subagente |
| Tarefa independente com entrega própria | Nova sessão em worktree |
| Precisa continuar sem sua máquina | Sessão na nuvem ou Devin |
| Repete em horário fixo | Tarefa agendada |
| Muitos itens iguais | [Workflow dinâmico](https://code.claude.com/docs/en/workflows.md) ou várias sessões Devin |

### Limites que evitam desperdício

- Não paralelize partes que tocam os mesmos arquivos.
- [Subagente não é mais inteligente](https://code.claude.com/docs/en/best-practices.md): ele traz paralelismo ou olhar independente, ao custo de tokens.
- [Equipes de agentes são caras](https://code.claude.com/docs/en/costs.md): cerca de 7 vezes mais tokens em modo Plan.
- Prefira poucas passagens de bastão. Um levantamento cita [falhas frequentes acima de quatro handoffs](https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html), mas essa é uma fonte secundária.

**Exercício:** classifique cinco tarefas recorrentes suas em uma linha da segunda tabela. Crie uma skill apenas para a que mais se repete.

```questao
A orientação da Anthropic para montar workflows de agentes é
A) começar sempre com vários agentes em paralelo
*B) usar a solução mais simples e só adicionar complexidade quando ela melhora o resultado de forma demonstrável
C) evitar ferramentas externas
D) usar sempre um orquestrador
> Mais agentes e mais passos custam mais e erram de formas novas. Só vale quando o ganho é medido.
```
