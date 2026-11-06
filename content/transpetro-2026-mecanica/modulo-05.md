Cobre o item 8 do edital. Em 2023 não teve questão isolada, mas nas provas de 2011 e 2018 foi o tema com mais citações: rolamentos, engrenagens e correias.

### Eixos, árvores e uniões

- **Eixo** apenas suporta elementos (pode nem girar); **árvore** transmite torque.
- **Chavetas** transmitem torque entre árvore e cubo: paralela (a mais comum), meia-lua (Woodruff) e inclinada. Estrias substituem chavetas em cargas maiores.
- **Acoplamentos rígidos** exigem alinhamento perfeito; **flexíveis** (de garras com elastômero, de engrenagens, de grade) toleram pequenos desalinhamentos e amortecem choques.
- O alinhamento entre motor e máquina é feito com relógio comparador ou laser. Desalinhamento é uma das principais causas de falha de rolamentos e selos.

### Mancais e rolamentos

| Tipo | Carga | Uso típico |
| --- | --- | --- |
| Rígido de esferas | Radial e axial moderada | Motores elétricos, uso geral |
| Rolos cilíndricos | Radial alta, quase nenhuma axial | Redutores, cargas pesadas |
| Rolos cônicos | Radial e axial combinadas | Cubos de roda; montados aos pares |
| Autocompensador (esferas ou rolos) | Radial; aceita desalinhamento | Eixos longos, mancais bipartidos |
| Axial de esferas | Só axial | Mesas giratórias |
| Agulhas | Radial em pouco espaço | Juntas e articulações |

Mancais de deslizamento (buchas) suportam choques e trabalham bem com lubrificação hidrodinâmica, mas têm atrito de partida maior.

**Designação básica:** nos dois últimos dígitos, de 04 em diante, o diâmetro do furo é o número vezes 5. Assim, o 6205 tem furo de 25 mm, e o 6310, de 50 mm. Os códigos 00, 01, 02 e 03 correspondem a 10, 12, 15 e 17 mm.

**Montagem:** o anel que gira em relação à carga leva ajuste com interferência. Aqueça o rolamento com aquecedor indutivo ou banho de óleo até cerca de 110 °C; nunca com maçarico. Nunca transmita a força de montagem pelas esferas.

```questao
Qual é o diâmetro do furo de um rolamento 6208?
A) 80 mm
*B) 40 mm
C) 8 mm
D) 62 mm
E) 20 mm
> A partir do código 04, o furo é o número multiplicado por 5: 08 × 5 = 40 mm.
```

### Polias e correias

```latex
i = \frac{n_1}{n_2} = \frac{d_2}{d_1}
```

| Correia | Destaque |
| --- | --- |
| Plana | Altas velocidades, pode escorregar |
| Em V (trapezoidal) | A mais comum; o atrito vem do encaixe nas laterais do canal |
| Sincronizada (dentada) | Sem escorregamento; mantém o sincronismo |
| Poli-V | Várias nervuras; compacta |

Correia em V não deve tocar o fundo do canal. Em conjuntos com várias correias, troque todas juntas.

### Engrenagens

```latex
m = \frac{d_p}{z} \qquad p = \pi\,m \qquad d_e = m\,(z + 2) \qquad i = \frac{z_2}{z_1} = \frac{n_1}{n_2}
```

| Tipo | Eixos | Destaque |
| --- | --- | --- |
| Cilíndrica de dentes retos | Paralelos | Simples; ruidosa em alta rotação |
| Cilíndrica helicoidal | Paralelos | Silenciosa; gera força axial |
| Cônica | Concorrentes, em geral a 90° | Muda a direção do movimento |
| Coroa e sem-fim | Reversos (não se cruzam) | Grande redução em um estágio; pode ser irreversível |
| Pinhão e cremalheira | — | Converte rotação em translação |

Para engrenar, duas engrenagens precisam ter o **mesmo módulo** e o mesmo ângulo de pressão (em geral 20°). Engrenagens são fabricadas por fresamento (fresa módulo ou caracol), por renteamento e, para precisão, por retificação.

```questao
Um pinhão de 20 dentes gira a 1.500 rpm e aciona uma coroa de 60 dentes. A rotação da coroa é de
*A) 500 rpm
B) 300 rpm
C) 1.500 rpm
D) 4.500 rpm
E) 750 rpm
> n₂ = n₁ × z₁/z₂ = 1.500 × 20/60 = 500 rpm. A coroa maior gira mais devagar e com mais torque.
```

### Correntes, parafusos e travas

- Corrente de rolos: transmite grandes cargas sem escorregar; exige lubrificação e tensão correta.
- Rosca métrica: M12 × 1,75 indica diâmetro nominal de 12 mm e passo de 1,75 mm. Sem o passo, é rosca grossa.
- Travamento: arruela de pressão, porca autotravante, contraporca, trava química, contrapino.

### Armadilhas de prova

- Na transmissão, a polia ou engrenagem **maior** gira mais devagar.
- Rolo cônico aceita carga axial; rolo cilíndrico comum, praticamente não.
- Mancal autocompensador compensa desalinhamento, mas não corrige a causa.
- Engrenagem helicoidal é mais silenciosa, mas exige mancal para a carga axial.
