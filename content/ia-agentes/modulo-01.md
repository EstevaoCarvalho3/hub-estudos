**Um LLM prevê a continuação mais provável de um texto. Ele só conhece o treinamento e o que está no contexto.** Tudo fora disso precisa vir de uma ferramenta, ou ele pode inventar com confiança.

| Termo | O que é | Por que importa para você |
| --- | --- | --- |
| Token | Unidade de texto processada | Define custo e tamanho do contexto |
| Janela de contexto | Tudo que o modelo vê na requisição | [Os modelos atuais têm 1M de tokens](https://platform.claude.com/docs/en/models/overview), cerca de 555 mil palavras |
| Esforço (`effort`) | Quanto o modelo pensa e verifica | Principal controle de qualidade, tempo e gasto |
| Pensamento adaptativo | O modelo decide quanto pensar | Substitui o orçamento fixo de tokens |
| Cache de prompt | Reaproveita o início repetido da conversa | [Dura cerca de 1 hora em assinatura e 5 minutos em API](https://code.claude.com/docs/en/best-practices.md) |
| Corte de conhecimento | Data limite do treinamento | Em junho de 2026 para os modelos atuais. Para novidades, pesquise |
| Embedding | Vetor que representa significado | Base da busca semântica |
| RAG | Buscar informação e entregar ao modelo | Parecido com consultar a documentação de um sistema antes de responder |
| Alucinação | Resposta plausível e falsa | Sempre confira rotina, campo e parâmetro no código ou na base |

### Modelos atuais

| Modelo | Melhor uso | Preço na API por milhão de tokens |
| --- | --- | --- |
| Fable 5.1 | Raciocínio exigente e trabalho longo | US$ 10 entrada, US$ 50 saída |
| Opus 5.5 | Trabalho longo com agentes | US$ 4 entrada, US$ 20 saída |
| Sonnet 5.5 | Equilíbrio entre velocidade e inteligência | US$ 2 entrada, US$ 10 saída |
| Haiku 5.5 | Classificação, extração e alto volume | A partir de US$ 0,10 entrada, US$ 0,50 saída |

Valores da [página de modelos](https://platform.claude.com/docs/en/models/overview). Em assinatura, o custo real aparece como consumo do plano em `/usage`.

### O que deixou de valer

- **`temperature`:** a [versão 2026-10-21 da API](https://platform.claude.com/docs/en/api/migration-2026-10-21) removeu esse parâmetro, `top_p` e `top_k`. A versão 2023-06-01 ainda aceita o parâmetro nos modelos que o suportam. No Claude Code, você controla esforço e modelo.
- **“O contexto não cabe”:** com 1M, raramente falta espaço. O problema passou a ser [pagar por contexto desnecessário](https://code.claude.com/docs/en/best-practices.md) e perder foco.
