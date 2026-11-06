Este módulo cobre os itens 3.1, 3.2, 3.3 e 6.1 do edital e valeu 4 questões em 2023. Saiba conversões de unidade, o princípio de cada medidor e o vocabulário da metrologia.

### Sistema Internacional

As sete unidades de base são metro (m), quilograma (kg), segundo (s), ampere (A), kelvin (K), mol (mol) e candela (cd). Símbolo não tem plural nem ponto: 5 kg, não 5 kgs.

| Grandeza derivada | Unidade | Equivalência |
| --- | --- | --- |
| Força | newton (N) | kg·m/s² |
| Pressão | pascal (Pa) | N/m² |
| Energia | joule (J) | N·m |
| Potência | watt (W) | J/s |
| Tensão | volt (V) | W/A |
| Resistência | ohm (Ω) | V/A |
| Capacitância | farad (F) | C/V |
| Indutância | henry (H) | Wb/A |

### Instrumentos de bancada

- **Voltímetro:** em paralelo, com resistência interna alta.
- **Amperímetro:** em série, com resistência interna baixa.
- **Ohmímetro:** com o circuito desenergizado.
- **True RMS:** mede o valor eficaz correto de ondas não senoidais.
- **Frequencímetro:** conta ciclos em uma janela de tempo.

No osciloscópio, a tela é dividida em divisões. Multiplique divisões pela escala.

Exemplo: um ciclo ocupa 4 divisões a 5 ms/div, e a onda tem 6 divisões de pico a pico a 2 V/div. T = 20 ms e f = 50 Hz. Vpp = 12 V, Vp = 6 V e Vef ≈ 4,24 V.

Acoplamento CA bloqueia o nível CC. Ponta ×10 divide o sinal por 10 e carrega menos o circuito.

### Pressão

| Unidade | Em kPa |
| --- | --- |
| 1 bar | 100 |
| 1 atm | 101,325 |
| 1 kgf/cm² | 98,07 |
| 1 psi | 6,895 |
| 1 mmHg | 0,1333 |

Pressão absoluta = pressão manométrica + pressão atmosférica. Pressão diferencial é a diferença entre dois pontos. Medidores comuns: tubo de Bourdon, diafragma, célula capacitiva e extensômetro.

### Temperatura

```latex
T(K) = T(^{\circ}C) + 273{,}15 \qquad T(^{\circ}F) = 1{,}8\, T(^{\circ}C) + 32
```

| Sensor | Princípio | Ponto de atenção |
| --- | --- | --- |
| Pt100 | Resistência vale 100 Ω a 0 °C e sobe cerca de 0,385 Ω/°C | Ligação a 3 fios compensa os cabos |
| Termopar | Efeito Seebeck: duas ligas geram tensão | Exige compensação da junção fria e cabo apropriado |
| Termistor NTC | Resistência cai com a temperatura | Não linear |

Tipos de termopar frequentes: J (ferro-constantan), K (cromel-alumel), T (cobre-constantan) e S (platina-ródio, alta temperatura).

### Nível

Medição direta: visor, flutuador, radar e ultrassom. Medição indireta: pressão diferencial, empuxo (displacer), capacitivo e borbulhador.

Por pressão diferencial, h = ΔP / (ρ·g). Exemplo: 40 kPa com ρ = 800 kg/m³ e g = 10 m/s² dão h = 5 m.

### Vazão

```latex
Q = k\sqrt{\Delta P}
```

Exemplo: se o ΔP na placa de orifício quadruplica, a vazão dobra. A relação é com a raiz, não com o quadrado.

| Medidor | Princípio | Observação |
| --- | --- | --- |
| Placa de orifício, Venturi, Pitot | Pressão diferencial | Barato e muito usado; placa gera perda de carga |
| Turbina | Rotação proporcional à velocidade | Exige fluido limpo |
| Eletromagnético | Lei de Faraday | Só fluido condutivo |
| Ultrassônico | Tempo de trânsito | Pode ser não intrusivo |
| Vortex | Frequência de vórtices | Sem partes móveis |
| Coriolis | Força de Coriolis em tubos vibrando | Mede massa e densidade diretamente |
| Deslocamento positivo | Volumes fixos | Usado em custódia |

### Massa e densidade

Massa é medida por célula de carga, balança ou Coriolis. Densidade: ρ = m/V, em kg/m³. Densidade relativa compara com a água e não tem unidade.

### Sinal 4–20 mA

O padrão de campo usa 4 mA em 0% e 20 mA em 100%. O zero vivo permite detectar fio rompido, porque 0 mA não é um valor válido. O equivalente pneumático é de 3 a 15 psi.

```latex
I = 4 + 16 \cdot \frac{PV - LRV}{URV - LRV}
```

Exemplo: faixa de 0 a 10 bar e 7,5 bar medidos. I = 4 + 16 × 0,75 = 16 mA. Em um resistor de 250 Ω, o sinal vira 1 a 5 V.

### Metrologia

| Termo | Definição curta |
| --- | --- |
| Exatidão | Proximidade do valor verdadeiro |
| Precisão | Proximidade entre medições repetidas |
| Repetibilidade | Precisão nas mesmas condições |
| Reprodutibilidade | Precisão em condições diferentes |
| Resolução | Menor variação perceptível na indicação |
| Sensibilidade | Variação da saída por variação da entrada |
| Histerese | Leitura muda com o sentido da variação |
| Deriva | Mudança lenta da indicação com o tempo |
| Incerteza | Faixa de dúvida atribuída ao resultado |
| Calibração | Compara com padrão e registra; não é ajuste |
| Ajuste | Intervenção para corrigir o instrumento |
| Rastreabilidade | Cadeia documentada até um padrão de referência |

Os três ramos: científica (padrões de mais alto nível), industrial (produção e calibração) e legal (comércio, saúde, segurança e ambiente, com exigência regulamentar).

Erro = indicação − valor verdadeiro. Correção = −erro. Exemplo: leitura de 102 kPa com padrão de 100 kPa tem erro de +2 kPa e correção de −2 kPa.

```questao
Um transmissor de 0 a 100 °C com saída de 4 a 20 mA indica 12 mA. A temperatura é
A) 25 °C
*B) 50 °C
C) 60 °C
D) 75 °C
> (12 − 4) / 16 = 0,5, ou seja, 50% da faixa: 50 °C. Esquecer o zero vivo de 4 mA leva a 60 °C.
```

### Armadilhas de prova

- Usar g/cm³ em ρ·g·h sem converter. Lembre: 0,8 g/cm³ = 800 kg/m³.
- Aplicar proporção direta de vazão com ΔP.
- Confundir precisão com exatidão.
- Dizer que calibrar é ajustar.
