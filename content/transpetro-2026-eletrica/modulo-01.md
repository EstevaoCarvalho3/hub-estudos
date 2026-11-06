Este módulo cobre o item 2 do edital e valeu 7 questões em 2023. Domine Ohm, Kirchhoff, Thévenin, fasores e os valores médio, eficaz e de pico.

### Corrente contínua

```latex
V = R I \qquad P = V I = R I^2 = \frac{V^2}{R} \qquad R = \frac{\rho L}{A}
```

- **Série:** resistências somam e a corrente é a mesma.
- **Paralelo:** a tensão é a mesma e 1/Req = Σ 1/R. Dois resistores: R1·R2/(R1 + R2).
- **Lei dos Nós:** a soma das correntes que saem de um nó é zero.
- **Lei das Malhas:** a soma das tensões em um laço fechado é zero.

Exemplo nodal: fonte de 100 V ligada ao nó por 10 Ω, com dois resistores de 10 Ω do nó ao terra. (100 − V)/10 = 2V/10, então V = 33,3 V.

```questao
Dois resistores de 6 Ω em paralelo estão em série com um de 2 Ω, sob 10 V CC. A corrente total é
A) 1 A
*B) 2 A
C) 5 A
D) 0,5 A
> O paralelo de dois resistores iguais vale R/2 = 3 Ω. Somando 2 Ω, o total é 5 Ω, e I = 10/5 = 2 A.
```

### Thévenin, Norton e fonte real

1. Retire a carga e calcule a tensão em aberto: é Vth.
2. Anule as fontes independentes: tensão vira curto e corrente vira aberto.
3. Calcule a resistência vista dos terminais: é Rth.
4. A corrente na carga é I = Vth/(Rth + RL).

Norton usa a mesma Rth em paralelo com In = Vth/Rth. Com fonte dependente, não anule a dependente; aplique uma fonte de teste.

Exemplo de resistência interna: uma bateria marca 11,2 V com 2 A e 10,8 V com 3 A. r = (11,2 − 10,8)/(3 − 2) = 0,4 Ω, e a f.e.m. é 11,2 + 0,4 × 2 = 12 V.

### Valores de uma onda senoidal

```latex
V_{ef} = \frac{V_p}{\sqrt{2}} \qquad V_{pp} = 2V_p \qquad V_{med,\,meia\ onda} = \frac{V_p}{\pi} \qquad V_{med,\,onda\ completa} = \frac{2V_p}{\pi}
```

Exemplo: pico de 212 V dá eficaz de 212/1,414 ≈ 150 V. A rede de 127 V eficazes tem pico de cerca de 180 V.

```questao
Uma tomada de 127 V eficazes tem tensão de pico de cerca de
A) 90 V
*B) 180 V
C) 127 V
D) 254 V
> Vp = Vef × √2 = 127 × 1,414 ≈ 180 V. Dividir por √2 é o caminho inverso, do pico para o eficaz.
```

### Fasores e impedância

```latex
X_L = \omega L \qquad X_C = \frac{1}{\omega C} \qquad Z = R + j(X_L - X_C) \qquad \omega = 2\pi f
```

Some senoides de mesma frequência somando fasores. Exemplo: 30 sen(ωt) + 40 sen(ωt + 90°) tem pico de √(30² + 40²) = 50 V.

No divisor RC, a saída no capacitor é Vo = Vi·XC/√(R² + XC²). Exemplo: R = 1 kΩ, XC = 1 kΩ e Vi = 10 V de pico dão Vo ≈ 7,07 V.

No indutor, a corrente atrasa 90° da tensão. No capacitor, adianta 90°. Em ressonância, XL = XC e ω0 = 1/√(LC).

### Resposta no tempo e função de transferência

```latex
\tau_{RC} = RC \qquad \tau_{RL} = \frac{L}{R} \qquad x(t) = x(\infty) + [x(0^+) - x(\infty)]\,e^{-t/\tau}
```

No domínio de Laplace, R vira R, L vira sL e C vira 1/(sC). Para um RLC série com saída na corrente:

```latex
G(s) = \frac{I(s)}{V(s)} = \frac{1}{R + sL + \frac{1}{sC}} = \frac{\frac{s}{L}}{s^2 + \frac{R}{L}s + \frac{1}{LC}}
```

### Armadilhas de prova

- Usar valor de pico na potência sem dividir por 2.
- Somar amplitudes de senoides defasadas em vez de somar fasores.
- Anular a fonte dependente no cálculo de Rth.
- Confundir resistência interna com resistência de carga no ensaio de bateria.
