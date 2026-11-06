Este módulo cobre os itens 7.1 a 7.4 do edital e valeu 5 questões em 2023. São pontos rápidos: a maioria das questões pede definição, não conta. O edital escreve "PERT/COM", que tudo indica ser erro de digitação de PERT/CPM.

### Sistema Instrumentado de Segurança

O SIS leva o processo a um estado seguro quando as proteções normais falham. Ele tem sensores, lógica e elementos finais, separados do sistema de controle básico (BPCS). Cada ação de proteção é uma Função Instrumentada de Segurança (FIS). As normas de referência são IEC 61508 e IEC 61511.

O SIL é a classificação de redução de risco de uma FIS, de 1 a 4. Quanto maior, mais rigoroso. SIL não mede resistência física, complexidade nem frequência de manutenção.

| SIL | PFD média | Fator de redução de risco |
| --- | --- | --- |
| 1 | 10⁻² a 10⁻¹ | 10 a 100 |
| 2 | 10⁻³ a 10⁻² | 100 a 1.000 |
| 3 | 10⁻⁴ a 10⁻³ | 1.000 a 10.000 |
| 4 | 10⁻⁵ a 10⁻⁴ | 10.000 a 100.000 |

Votação MooN significa que M de N canais precisam atuar. Em 2oo3, dois de três sensores precisam concordar, o que equilibra segurança e paradas falsas.

O ciclo de vida de segurança vai da análise de risco à especificação, projeto, instalação, operação, testes periódicos e descomissionamento.

### PERT/CPM

```latex
t_e = \frac{O + 4M + P}{6} \qquad \sigma = \frac{P - O}{6}
```

Exemplo: O = 4, M = 6 e P = 14 dias. te = (4 + 24 + 14)/6 = 7 dias.

O caminho crítico é o caminho mais longo da rede. Suas atividades têm folga zero: atrasar uma delas atrasa o projeto.

Exemplo: A(3) precede B(5) e C(2). B precede E(4). C precede D(6). E e D precedem F(1).

| Caminho | Duração |
| --- | --- |
| A–B–E–F | 3 + 5 + 4 + 1 = 13 |
| A–C–D–F | 3 + 2 + 6 + 1 = 12 |

O caminho crítico é A–B–E–F, com 13 dias. A atividade D tem folga de 1 dia.

### Saúde e segurança do trabalho

| Norma | Assunto |
| --- | --- |
| NR-1 | Disposições gerais, GRO e PGR |
| NR-5 | CIPA |
| NR-6 | EPI |
| NR-7 | PCMSO: exames admissional, periódico, de retorno, de mudança de função e demissional |
| NR-9 | Avaliação de agentes físicos, químicos e biológicos |
| NR-10 | Segurança em eletricidade |
| NR-12 | Máquinas e equipamentos |
| NR-20 | Inflamáveis e combustíveis |
| NR-33 | Espaços confinados |
| NR-35 | Trabalho em altura |

Prioridade de proteção: eliminar o risco, depois medidas coletivas (EPC), medidas administrativas e, por último, EPI.

Desenergização pela NR-10, nesta ordem:

1. Seccionamento.
2. Impedimento de reenergização.
3. Constatação da ausência de tensão.
4. Instalação de aterramento temporário com equipotencialização.
5. Proteção dos elementos energizados na zona controlada.
6. Instalação da sinalização de impedimento de reenergização.

### Manutenção e comissionamento

| Tipo | Quando atua | Exemplo |
| --- | --- | --- |
| Corretiva | Depois da falha | Trocar transmissor queimado |
| Preventiva | Em intervalos ou critérios predefinidos | Limpeza e troca programadas |
| Preditiva | Conforme a condição monitorada | Análise de vibração e termografia |

Comissionamento verifica se a instalação foi montada e funciona como projetado, antes da partida. Inclui testes de malha (loop check), teste de lógicas e testes funcionais.

```latex
D = \frac{MTBF}{MTBF + MTTR}
```

Exemplo: MTBF = 95 h e MTTR = 5 h dão disponibilidade de 95%.

```questao
No PERT, uma atividade tem estimativas otimista de 4, mais provável de 6 e pessimista de 14 dias. A duração esperada é
A) 6 dias
*B) 7 dias
C) 8 dias
D) 8,5 dias
> te = (o + 4m + p) / 6 = (4 + 24 + 14) / 6 = 7 dias.
```

### Armadilhas de prova

- Dizer que SIL vai de 0 a 5. Vai de 1 a 4.
- Confundir preditiva (condição) com preventiva (intervalo).
- Escolher o caminho mais curto como crítico.
- Trocar PCMSO (NR-7) por PGR (NR-1).
