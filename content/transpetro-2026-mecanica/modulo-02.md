Cobre o item 3 do edital. Em 2023 caíram 2 questões: identificar um medidor de vazão pela figura e o tipo de termopar.

### Pressão

```latex
p_{absoluta} = p_{manométrica} + p_{atmosférica} \qquad \Delta p = \rho\, g\, h
```

| Instrumento | Princípio | Uso |
| --- | --- | --- |
| Tubo de Bourdon | Tubo curvo que se abre com a pressão | Manômetro de campo mais comum |
| Diafragma ou fole | Membrana que se deforma | Baixas pressões e fluidos sujos, com selo |
| Coluna líquida (tubo em U) | Δp = ρ g h | Baixas pressões e calibração |
| Transmissor eletrônico | Sensor piezorresistivo ou capacitivo | Envia sinal de 4 a 20 mA ao controle |

Vacuômetro mede abaixo da atmosférica; manovacuômetro mede acima e abaixo.

### Temperatura

| Sensor | Como funciona | Destaque |
| --- | --- | --- |
| Termopar | Dois metais diferentes geram tensão (efeito Seebeck) proporcional à diferença de temperatura entre as junções | Faixa ampla, robusto, precisa de cabo de compensação |
| Termorresistência (RTD, Pt100) | A resistência da platina aumenta com a temperatura | 100 Ω a 0 °C; mais exata que o termopar em faixas médias |
| Termistor (NTC, PTC) | Semicondutor com grande variação de resistência | Barato, faixa estreita |
| Bimetálico | Duas lâminas com dilatações diferentes se curvam | Indicação local, sem energia |
| Pirômetro de radiação | Mede a radiação emitida | Sem contato, peças em movimento ou muito quentes |

| Termopar | Materiais | Característica |
| --- | --- | --- |
| J | Ferro e constantan | Uso geral até cerca de 750 °C |
| K | Cromel e alumel | O mais usado, até cerca de 1.250 °C |
| T | Cobre e constantan | Baixas temperaturas, inclusive negativas |
| E | Cromel e constantan | Maior sensibilidade (mV/°C) |
| N | Nicrosil e nisil | Alternativa mais estável ao K |
| R, S e B | Platina e ródio | Altas temperaturas, acima de 1.300 °C |

```questao
Qual sensor de temperatura tem resistência de 100 Ω a 0 °C?
A) Termopar tipo K
B) Pirômetro óptico
C) Termômetro bimetálico
*D) Pt100
E) Termistor NTC
> O nome Pt100 indica platina com 100 Ω a 0 °C. Termopar gera tensão, não varia resistência.
```

### Nível

Medição direta: visor de vidro, régua, boia. Medição indireta: pressão diferencial (h = Δp/ρg), radar, ultrassom, capacitivo e por empuxo (deslocador). Em tanque pressurizado, o transmissor de pressão diferencial compensa a pressão do gás acima do líquido.

### Vazão

```latex
Q = A \cdot v \qquad \text{placa de orifício: } Q \propto \sqrt{\Delta p}
```

| Medidor | Princípio | Destaque |
| --- | --- | --- |
| Placa de orifício | Restrição gera Δp | Barato e muito usado; alta perda de carga permanente |
| Venturi | Restrição suave | Menor perda de carga que a placa; mais caro |
| Bocal | Restrição intermediária | Vapor e altas velocidades |
| Tubo de Pitot | Pressão de estagnação | Mede velocidade em um ponto |
| Rotâmetro | Flutuador em tubo cônico (área variável) | Leitura local, montagem vertical |
| Turbina | Rotor gira com o fluxo | Líquidos limpos, boa exatidão |
| Eletromagnético | Lei de Faraday | Só fluidos condutores; sem perda de carga |
| Coriolis | Tubos vibrando se torcem com a massa que passa | Mede vazão mássica e densidade diretamente |
| Vórtice | Frequência dos vórtices atrás de um obstáculo | Sem partes móveis |
| Ultrassônico | Tempo de trânsito ou efeito Doppler | Pode ser instalado por fora do tubo |

Como Q é proporcional à raiz de Δp, se o Δp cai para um quarto, a vazão cai para a metade.

```questao
Um medidor de placa de orifício indica 100 m³/h. Se o diferencial de pressão aumentar 4 vezes, a vazão passa a ser
A) 25 m³/h
B) 400 m³/h
*C) 200 m³/h
D) 50 m³/h
E) 160 m³/h
> Q é proporcional a √Δp. √4 = 2, então a vazão dobra.
```

### Armadilhas de prova

- Coriolis é o único da lista que mede vazão **mássica** diretamente.
- O eletromagnético não funciona com hidrocarbonetos, que não conduzem eletricidade.
- Termopar mede **diferença** de temperatura entre junções; por isso precisa de compensação da junta de referência.
- Pressão manométrica pode ser negativa (vácuo); a absoluta nunca.
