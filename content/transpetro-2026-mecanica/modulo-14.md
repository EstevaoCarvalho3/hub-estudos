Cobre os itens 12, 19 e 23 do edital. Em 2023 caíram 3 questões: disponibilidade de um equipamento, manutenção definida pela análise de vibração e uma função lógica.

### Tipos de manutenção

| Tipo | Quando age | Exemplo |
| --- | --- | --- |
| Corretiva não planejada | Depois da falha, sem preparação | Bomba quebra e para a produção |
| Corretiva planejada | Por decisão, deixa operar até falhar ou corrige um desempenho já acompanhado | Lâmpada trocada quando queima |
| Preventiva | Em intervalos fixos de tempo ou uso | Troca de óleo a cada 2.000 horas |
| Preditiva | Pela **condição** medida do equipamento | Troca de rolamento indicada pela análise de vibração |
| Detectiva | Busca falhas ocultas em sistemas de proteção | Teste de alarme e de válvula de segurança |
| Engenharia de manutenção | Elimina causas de falhas repetitivas | Mudança de projeto após análise de causa raiz |

Técnicas preditivas: análise de vibração, termografia, análise de óleo, ultrassom e medição de espessura.

**TPM** (manutenção produtiva total) envolve a operação na manutenção, com manutenção autônoma, limpeza e inspeção. **RCM** (manutenção centrada em confiabilidade) define a estratégia de cada componente pelas consequências da falha.

**Comissionamento** é o conjunto de verificações e testes que confirma que a instalação foi montada conforme o projeto e está pronta para operar.

```questao
Um acelerômetro num mancal mostrou vibração crescente, e a equipe programou a troca do rolamento na próxima parada. Esse é um exemplo de manutenção
A) autônoma
B) preventiva
C) detectiva
D) corretiva não planejada
*E) preditiva
> A decisão veio do acompanhamento da condição do equipamento, e não de um intervalo fixo nem de uma falha.
```

### Indicadores

```latex
MTBF = \frac{\text{tempo de operação}}{\text{número de falhas}} \qquad MTTR = \frac{\text{tempo de reparo}}{\text{número de reparos}} \qquad D = \frac{MTBF}{MTBF + MTTR}
```

Exemplo: no mês, o equipamento ficou 150 h disponível e 50 h em manutenção. D = 150 / 200 = 0,75.

| Na vibração | Sinal típico |
| --- | --- |
| Desbalanceamento | Pico em 1 × rotação, radial |
| Desalinhamento | Picos em 1× e 2× rotação, com vibração axial alta |
| Folga mecânica | Muitos harmônicos da rotação |
| Defeito de rolamento | Frequências altas, não múltiplas inteiras da rotação |

### Segurança, meio ambiente e saúde

| NR | Tema |
| --- | --- |
| NR-6 | Equipamento de proteção individual (EPI) |
| NR-10 | Segurança em instalações e serviços em eletricidade |
| NR-11 | Transporte, movimentação, armazenagem e manuseio de materiais |
| NR-12 | Segurança em máquinas e equipamentos: proteções e parada de emergência |
| NR-13 | Caldeiras, vasos de pressão, tubulações e tanques metálicos |
| NR-15 | Atividades e operações insalubres |
| NR-26 | Sinalização de segurança |
| NR-33 | Espaços confinados |
| NR-35 | Trabalho em altura, acima de 2 m do nível inferior |

Ordem de prioridade das medidas de controle: eliminar o risco, substituir, proteção coletiva (EPC), medidas administrativas e, por último, EPI. Antes de intervir num equipamento: **permissão de trabalho**, bloqueio e etiquetagem das fontes de energia e teste de energia zero.

### Noções de eletrotécnica

```latex
V = R\,I \qquad P = V\,I = R\,I^2 \qquad P_{3\phi} = \sqrt{3}\,V_L\,I_L\cos\varphi \qquad n_s = \frac{120 f}{p}
```

- Motor de indução trifásico de 4 polos em 60 Hz tem rotação síncrona de 1.800 rpm; o rotor gira um pouco abaixo (escorregamento).
- Para inverter o sentido de giro, troque duas fases entre si.
- Partida estrela-triângulo reduz a corrente de partida a cerca de um terço; o inversor de frequência controla a velocidade.

| Porta lógica | Saída 1 quando |
| --- | --- |
| E (AND) | Todas as entradas são 1 |
| OU (OR) | Pelo menos uma entrada é 1 |
| NÃO (NOT) | A entrada é 0 |
| NE (NAND) | Nem todas as entradas são 1 |
| NOU (NOR) | Todas as entradas são 0 |

```questao
Um motor de indução trifásico de 6 polos é alimentado em 60 Hz. A velocidade síncrona é de
A) 1.800 rpm
B) 600 rpm
*C) 1.200 rpm
D) 900 rpm
E) 3.600 rpm
> ns = 120 × 60 / 6 = 1.200 rpm.
```

### Armadilhas de prova

- Preditiva depende de **medir a condição**; preventiva segue o calendário.
- Disponibilidade usa o tempo total no denominador: disponível ÷ (disponível + parado).
- NR-13 trata de vasos de pressão e caldeiras; NR-12, de máquinas.
- EPI é a última opção na hierarquia de controle, não a primeira.
