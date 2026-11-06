Este módulo cobre os itens 1.1 a 1.8 do edital e valeu 14 questões em 2023. Domine resistência equivalente, análise nodal, Thévenin, fasores e potência.

### Grandezas e resistência

Tensão (V) é energia por carga. Corrente (A) é carga por tempo. Resistência (Ω) é oposição à corrente.

```latex
V = R \cdot I \qquad P = V I = R I^2 = \frac{V^2}{R} \qquad E = P \cdot t
```

```latex
R = \frac{\rho L}{A}
```

Exemplo: um cabo de cobre tem ρ = 0,0172 Ω·mm²/m, 50 m e 2,5 mm². Então R = 0,0172 × 50 / 2,5 = 0,344 Ω. Com 10 A, a queda é de 3,44 V.

### Componentes

| Componente | Série | Paralelo | Em CC, regime permanente | Energia |
| --- | --- | --- | --- | --- |
| Resistor | R1 + R2 | R1·R2 / (R1 + R2) | Lei de Ohm | Dissipa E = R·I²·t |
| Capacitor | C1·C2 / (C1 + C2) | C1 + C2 | Circuito aberto | ½·C·V² |
| Indutor | L1 + L2 | L1·L2 / (L1 + L2) | Curto-circuito | ½·L·I² |

O transformador ideal conserva potência. A impedância do secundário aparece no primário multiplicada por a², em que a = N1/N2.

```latex
\frac{V_1}{V_2} = \frac{N_1}{N_2} = \frac{I_2}{I_1} \qquad Z' = a^2 Z_{carga}
```

Exemplo: 240 V no primário, relação 4:1 e carga de 6 Ω. O secundário tem 60 V e 10 A. O primário tem 2,5 A e enxerga 96 Ω.

### Kirchhoff, Thévenin e Norton

A Lei dos Nós diz que a soma das correntes que saem de um nó é zero. A Lei das Malhas diz que a soma das tensões em um laço fechado é zero.

Exemplo nodal: uma fonte de 20 V liga-se ao nó por 4 Ω, um resistor de 4 Ω vai ao terra e uma fonte injeta 2 A no nó.

```latex
\frac{20 - V}{4} + 2 = \frac{V}{4} \;\Rightarrow\; 7 = \frac{V}{2} \;\Rightarrow\; V = 14\ \text{V}
```

Thévenin troca a rede por uma fonte Vth em série com Rth. Siga quatro passos:

1. Retire a carga e calcule a tensão entre os terminais: esse valor é Vth.
2. Anule as fontes: fonte de tensão vira curto e fonte de corrente vira aberto.
3. Calcule a resistência vista dos terminais: esse valor é Rth.
4. Recoloque a carga e aplique I = Vth / (Rth + RL).

Norton usa a mesma Rth em paralelo com uma fonte In = Vth / Rth.

Exemplo: fonte de 12 V, 6 Ω em série e 3 Ω em derivação, seguidos de 2 Ω em série até a saída. Vth = 12 × 3 / 9 = 4 V. Rth = (6 ∥ 3) + 2 = 4 Ω. In = 1 A.

A máxima transferência de potência ocorre com RL = Rth. Neste exemplo, RL = 4 Ω recebe P = Vth² / (4·Rth) = 1 W.

### Corrente alternada e fasores

```latex
v(t) = V_p \,\text{sen}(\omega t + \phi) \qquad \omega = 2\pi f \qquad V_{ef} = \frac{V_p}{\sqrt{2}}
```

```latex
X_L = \omega L \qquad X_C = \frac{1}{\omega C} \qquad Z = R + j(X_L - X_C)
```

No paralelo, some admitâncias: Y = 1/R + jωC − j/(ωL).

Exemplo: R = 5 Ω, L = 10 mH e C = 300 µF em paralelo, com ω = 1000 rad/s. Y = 0,2 + j0,3 − j0,1 = 0,2 + j0,2 S. Logo Z = 1/Y = 2,5 − j2,5 Ω.

Exemplo de corrente: v(t) = 100 sen(ωt) sobre Z = 10 + j10 Ω. |Z| = 10√2 e o ângulo é +45°. Então i(t) = 5√2 sen(ωt − 45°). A corrente atrasa porque a carga é indutiva.

### Ressonância

```latex
\omega_0 = \frac{1}{\sqrt{LC}} \qquad f_0 = \frac{1}{2\pi\sqrt{LC}} \qquad Q_{série} = \frac{\omega_0 L}{R}
```

Em ressonância, X\_L = X\_C. O circuito série tem impedância mínima, igual a R. O paralelo ideal tem impedância máxima.

Exemplo: 1 mH em série com dois capacitores de 2 mF em série (C = 1 mF). LC = 10⁻⁶, então ω0 = 1000 rad/s.

### Potência em CA

| Grandeza | Fórmula com valores eficazes | Unidade |
| --- | --- | --- |
| Ativa | P = V·I·cos φ | W |
| Reativa | Q = V·I·sen φ | var |
| Aparente | S = V·I = √(P² + Q²) | VA |
| Fator de potência | FP = P / S = R / \|Z\| | adimensional |

Correção do fator de potência: Qc = P·(tan φ1 − tan φ2).

Exemplo: v = 100 cos(200t) V e i = 4 cos(200t − 60°) A. Como os valores são de pico, P = ½ × 100 × 4 × cos 60° = 100 W. Já S = 200 VA.

Exemplo com carga fora da fonte: em um filtro com L e C ideais, toda a potência ativa da fonte chega ao resistor. L e C ideais não dissipam.

### Bateria com resistência interna

Exemplo: bateria de 12 V com r = 2 Ω e carga de 4 Ω. I = 12 / 6 = 2 A. Na carga, P = 4 × 2² = 16 W. A tensão nos terminais cai para 8 V.

### Resposta no tempo

```latex
x(t) = x(\infty) + [x(0^+) - x(\infty)]\, e^{-t/\tau} \qquad \tau_{RC} = RC \qquad \tau_{RL} = \frac{L}{R}
```

A tensão do capacitor e a corrente do indutor não saltam. Logo após fechar a chave, capacitor descarregado age como curto e indutor sem corrente age como aberto. Depois de cerca de 5τ, vale o regime permanente: capacitor aberto e indutor em curto.

Exemplo: 10 V, 1 kΩ e 100 µF. τ = 0,1 s. Em t = τ, o capacitor tem 6,32 V. Em t = 5τ, está praticamente em 10 V.

### Resposta em frequência

Um filtro RC tem corte em ωc = 1/(RC). Nesse ponto o ganho é 0,707, ou −3 dB. Saída no capacitor dá passa-baixas; saída no resistor dá passa-altas.

Exemplo: 1 kΩ e 1 µF dão ωc = 1000 rad/s e fc ≈ 159 Hz. Ganho em decibéis: G = 20·log(Vs/Ve).

### Instalações e motores

- **Trifásico:** em estrela, VL = √3·Vf e IL = If. Em triângulo, VL = Vf e IL = √3·If. Em ambos, P = √3·VL·IL·cos φ.
- **Proteção:** disjuntor protege contra sobrecarga e curto. DR protege contra choque e fuga; o de 30 mA é o de proteção de pessoas.
- **Diagramas:** o multifilar mostra todos os condutores, o unifilar simplifica e o funcional mostra a lógica.
- **Motor CC:** a força contraeletromotriz vale E = Ke·ω. Portanto Ke se expressa em V/(rad/s).

```questao
Um resistor de 1 kΩ percorrido por 5 mA dissipa
A) 5 mW
*B) 25 mW
C) 250 mW
D) 5 W
> P = I² × R = (0,005)² × 1.000 = 0,025 W = 25 mW.
```

### Armadilhas de prova

- Trocar valor de pico por eficaz na potência.
- Esquecer que capacitor em série soma como resistor em paralelo.
- Usar mH e µF sem converter para H e F.
- Dar a resposta do equivalente quando a pergunta pede a potência em um só resistor.
- Esquecer que, no paralelo de duas cargas iguais, a corrente da fonte muda por causa da resistência interna.
