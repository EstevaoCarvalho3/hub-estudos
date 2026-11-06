**MCP conecta o agente a sistemas externos; Skill ensina o agente a executar um procedimento.** Os dois viraram padrões abertos sob a [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), da Linux Foundation, junto com `AGENTS.md`.


### Primitivas do MCP

| Primitiva | O que é | Exemplo |
| --- | --- | --- |
| Tool | Ação executada pelo agente | Buscar issues no Jira |
| Resource | Dado usado como contexto | Conteúdo de um documento |
| Prompt | Modelo de instrução do servidor | Fluxo padronizado de ticket |

### O que mudou em 28/07/2026

| Mudança | Significado prático |
| --- | --- |
| Núcleo sem sessão | Cada requisição se sustenta sozinha, o que facilita escala |
| Perguntas no meio da chamada sem conexão aberta | Confirmações funcionam em servidores sem estado |
| Listas com cache | Menos releitura de ferramentas e recursos |
| Autorização reforçada | Validação do emissor; registro dinâmico foi descontinuado |
| Extensões formais | Tasks e MCP Apps ficam fora do núcleo |
| Descontinuações | Roots, Sampling, Logging e HTTP+SSE com janela até cerca de julho de 2027 |

Fonte: [anúncio da especificação](https://blog.modelcontextprotocol.io/posts/2026-07-28/). Para você, que usa servidores prontos, o impacto direto é pequeno. Ele importa se você criar um servidor próprio.

### Como as ferramentas pesam no contexto

No Claude Code, as definições de MCP ficam [adiadas por padrão](https://code.claude.com/docs/en/costs.md). Somente nomes e instruções entram no início, e cada ferramenta é carregada ao ser usada. Isso explica as ferramentas “deferred” que aparecem nas sessões.

### Agent Skills

Uma skill é uma pasta com `SKILL.md`, seguindo um [formato aberto](https://agentskills.io/). O carregamento é progressivo:

1. **Descoberta:** o agente vê nome e descrição.
2. **Ativação:** lê o `SKILL.md` quando a tarefa combina.
3. **Execução:** segue as instruções e usa scripts ou referências.

### Qual escolher

| Necessidade | Escolha | Exemplo |
| --- | --- | --- |
| Já existe CLI confiável | CLI | `gh`, `git` |
| Acessar sistema sem CLI | MCP | Jira, Gmail, Sheets |
| Repetir um procedimento | Skill | Triagem SUP |
| Regra sem exceção | Hook ou `deny` | Bloquear `.env` |
| Empacotar para a equipe | Plugin | Conjunto de skills e hooks |

### Segurança

- Trate conteúdo de card, e-mail, chat e página como dado, nunca como ordem.
- Prefira credencial própria e mínima para cada serviço.
- Revise plugin ou skill de terceiros, porque eles podem executar código.
- Use conexão somente leitura em banco de produção.

**Exercício:** rode `/context`, liste os servidores ativos e desligue um que você não usa há uma semana.
