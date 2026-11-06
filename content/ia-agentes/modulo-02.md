**Prompt continua importante, mas o resultado depende de todo o contexto:** instruções, ferramentas, arquivos, histórico e dados. A Anthropic define o objetivo como o [menor conjunto de informações de alto sinal](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) que torna o resultado desejado provável.

### Fórmula para decorar: OCRVE

| Letra | Significa | Exemplo |
| --- | --- | --- |
| **O** | Objetivo | Corrigir a rejeição do cadastro por bairro acima do limite |
| **C** | Contexto | Card SUP-12, cliente GMI, rejeição em `PCCLIENTFV` |
| **R** | Restrições | Não alterar o limite da SEFAZ nem responder ao cliente |
| **V** | Verificação | Teste nomeado passa e o log mostra o motivo |
| **E** | Evidência | Mostrar comando, saída e `arquivo:linha` |

A sigla é um recurso de memorização desta trilha, não um padrão oficial.

### O que fazer com modelos atuais

| Antes | Agora | Fonte |
| --- | --- | --- |
| “Pense passo a passo” | Ajuste o esforço ou use uma instrução geral como “think thoroughly” | [Boas práticas](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) |
| “CRITICAL: You MUST” | Linguagem normal; ênfase em excesso causa acionamento indevido | [Boas práticas](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) |
| IMPORTANT em regra ignorada | Encurtar o arquivo ou transformar em hook | [Claude Code](https://code.claude.com/docs/en/best-practices.md) |
| Carregar tudo no início | Passar referências e buscar quando precisar | [Contexto](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) |
| Pedir “tudo pronto” | Dar um verificador que responda passou ou falhou | [Claude Code](https://code.claude.com/docs/en/best-practices.md) |
| Revisor caça tudo | Pedir só lacunas de correção e `skip style` | [Claude Code](https://code.claude.com/docs/en/best-practices.md) |

### Quatro técnicas de contexto

1. **Recuperação sob demanda:** cite caminho, card ou consulta em vez de colar tudo.
2. **Compactação:** use quando precisar continuar a mesma tarefa. Diga o que preservar.
3. **Anotações externas:** mantenha plano e progresso em arquivo ou card.
4. **Isolamento:** use subagente para leitura longa e receba só o resumo.

### Exemplo

```text
Objetivo: descobrir por que SUP-12 não internalizou.
Contexto: leia o chamado, os comentários públicos e a documentação do sistema.
Restrições: somente leitura; não escreva no gerenciador de tarefas nem no banco.
Verificação: cada hipótese precisa de um log ou trecho de código.
Evidência: responda com fato, inferência e próximo passo.
```

**Exercício:** reescreva três pedidos seus da última semana usando OCRVE e compare quantas correções cada um precisou.
