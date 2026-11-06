Cobre os itens 1, 2, 4 e 5 do edital. Em 2023 foram 3 questões: resolução do paquímetro, incerteza de medição e conversão de rpm para rad/s.

### Resolução dos instrumentos

A resolução é a menor variação que o instrumento consegue indicar. No paquímetro, divida a menor divisão da escala fixa pelo número de divisões do nônio.

```latex
\text{resolução} = \frac{\text{menor divisão da escala fixa}}{\text{número de divisões do nônio}}
```

| Instrumento | Resolução típica | Observação |
| --- | --- | --- |
| Paquímetro com nônio de 10 divisões | 1/10 = 0,1 mm | |
| Paquímetro com nônio de 20 divisões | 1/20 = 0,05 mm | |
| Paquímetro com nônio de 50 divisões | 1/50 = 0,02 mm | O mais comum em manutenção |
| Paquímetro em polegada | 1/128" ou 0,001" | |
| Micrômetro | 0,01 mm | Passo do fuso de 0,5 mm dividido por 50 divisões do tambor |
| Micrômetro com nônio | 0,001 mm | |
| Relógio comparador | 0,01 mm | Mede por comparação com uma referência |

Regra prática: a resolução deve ser de no máximo um décimo da tolerância que se quer verificar. Para conferir uma peça com ± 0,01 mm, o paquímetro não serve; use micrômetro.

```questao
Um paquímetro tem escala fixa em milímetros e nônio com 20 divisões. Sua resolução é
A) 0,02 mm
B) 0,2 mm
C) 0,5 mm
D) 0,1 mm
*E) 0,05 mm
> 1 mm dividido por 20 divisões dá 0,05 mm. Com 50 divisões seriam 0,02 mm.
```

### Erro, exatidão e incerteza

| Termo | Significado |
| --- | --- |
| Exatidão | Proximidade entre o valor medido e o valor verdadeiro |
| Repetibilidade | Concordância entre medições sucessivas nas mesmas condições |
| Reprodutibilidade | Concordância quando mudam operador, local ou instrumento |
| Erro sistemático | Sempre no mesmo sentido; corrigível por calibração |
| Erro aleatório | Varia de forma imprevisível; reduz-se com média de várias medições |
| Incerteza de medição | Faixa de dúvida sobre o resultado |
| Rastreabilidade | Cadeia ininterrupta de calibrações até o padrão nacional (no Brasil, o Inmetro) |

A incerteza declarada no certificado de calibração é definida por dois parâmetros: o **intervalo de incerteza** (por exemplo, ± 0,02 mm) e a **probabilidade de abrangência** (normalmente 95%, com fator k ≈ 2).

### Sistema Internacional de Unidades

As sete unidades de base são metro, quilograma, segundo, ampere, kelvin, mol e candela. As derivadas que mais caem: newton (N = kg·m/s²), pascal (Pa = N/m²), joule (J = N·m), watt (W = J/s), hertz (Hz = 1/s) e radiano.

| Conversão | Valor |
| --- | --- |
| 1 polegada | 25,4 mm |
| 1 bar | 100 kPa = 10⁵ Pa |
| 1 kgf | ≈ 9,81 N |
| 1 psi | ≈ 6,9 kPa |
| 1 cv | ≈ 735,5 W |
| rpm para rad/s | multiplicar por 2π/60 |

Exemplo: 1.200 rpm × 2π/60 = 40π rad/s ≈ 125,7 rad/s. Se a questão mandar usar π = 3, fica 120 rad/s. Em hertz, 1.200 rpm são 20 Hz.

### Ajustes e tolerâncias

A tolerância é a diferença entre a dimensão máxima e a mínima permitidas. Pelo sistema ISO (no Brasil, NBR 6158), uma letra indica a posição da tolerância e um número indica a qualidade (IT): letra maiúscula para furo, minúscula para eixo.

| Ajuste | O que acontece | Exemplo no sistema furo-base |
| --- | --- | --- |
| Com folga | O eixo é sempre menor que o furo | H7/g6, H7/f7 |
| Incerto | Pode haver folga ou interferência | H7/k6, H7/j6 |
| Com interferência | O eixo é sempre maior que o furo | H7/p6, H7/s6 |

No **furo-base**, o furo é sempre H (afastamento inferior zero) e o eixo varia. No **eixo-base**, o eixo é sempre h e o furo varia. O furo-base é o mais usado porque é mais fácil variar o diâmetro de um eixo do que o de um furo.

Folga máxima = furo máximo − eixo mínimo. Interferência máxima = eixo máximo − furo mínimo.

```questao
Um furo mede 20,000 a 20,021 mm e o eixo, 19,980 a 19,993 mm. A folga máxima é de
A) 0,007 mm
B) 0,020 mm
C) 0,021 mm
D) 0,013 mm
*E) 0,041 mm
> Folga máxima = furo máximo − eixo mínimo = 20,021 − 19,980 = 0,041 mm. A folga mínima seria 20,000 − 19,993 = 0,007 mm.
```

### Tolerâncias geométricas e rugosidade

| Grupo | Características |
| --- | --- |
| Forma | Retitude, planeza, circularidade, cilindricidade |
| Orientação | Paralelismo, perpendicularidade, inclinação |
| Posição | Posição, concentricidade, simetria |
| Batimento | Circular (radial ou axial) e total |

A rugosidade média Ra é indicada em classes de N1 a N12. As que mais aparecem: N6 = 0,8 µm, N7 = 1,6 µm, N8 = 3,2 µm e N9 = 6,3 µm. Cada classe acima dobra o Ra.

### Armadilhas de prova

- Resolução não é exatidão: um instrumento pode ter boa resolução e estar descalibrado.
- Incerteza se declara com intervalo e probabilidade de abrangência, não com "exatidão e precisão".
- No furo-base, a letra do furo é H; no eixo-base, a letra do eixo é h.
- Ao converter rpm, não esqueça a divisão por 60.
