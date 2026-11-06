Este módulo cobre os itens 5.1 a 5.5 do edital e valeu 5 questões em 2023. Motores são o termo mais frequente nas provas antigas de Elétrica.

### Eletromagnetismo aplicado

```latex
F = B I L \,\text{sen}\,\theta \qquad e = -N\frac{d\Phi}{dt} \qquad \Phi = B A
```

- **Força em condutor:** F = I·L × B. Use a regra da mão esquerda (motor) ou o produto vetorial.
- **Faraday:** variação de fluxo induz tensão.
- **Lenz:** a corrente induzida se opõe à variação que a criou; daí o sinal negativo.

Exemplo: condutor de 0,5 m no eixo y, 20 A no sentido +y, campo de 0,8 T entrando na página (−z). F = 0,8 × 20 × 0,5 = 8 N. Pelo produto vetorial, ŷ × (−ẑ) = −x̂: a força aponta para −x.

### Transformadores

```latex
\frac{V_1}{V_2} = \frac{N_1}{N_2} = \frac{I_2}{I_1} \qquad \eta = \frac{P_{saída}}{P_{saída} + P_{ferro} + P_{cobre}}
```

| Perda | Onde ocorre | Como reduzir | Ensaio que mede |
| --- | --- | --- | --- |
| Histerese | Núcleo | Aço-silício de grão orientado | A vazio |
| Correntes parasitas (Foucault) | Núcleo | Laminar o núcleo com chapas isoladas | A vazio |
| Cobre (Joule) | Enrolamentos | Condutor de maior seção | Em curto-circuito |

O índice horário indica a defasagem entre as tensões de linha do primário e do secundário, em múltiplos de 30°. Em Dyn1, o secundário fica 30° atrasado; em Dyn11, 330° atrasado, o que equivale a 30° adiantado. A questão de Dy5 da prova de 2023 foi anulada.

Para ligar transformadores em paralelo, exija a mesma relação de transformação, o mesmo índice horário, a mesma sequência de fases e impedâncias percentuais próximas. Potências iguais não são obrigatórias.

### Motor de indução trifásico

```latex
n_s = \frac{120 f}{p} \qquad s = \frac{n_s - n}{n_s}
```

Exemplo: 6 polos em 60 Hz dão ns = 1.200 rpm. Girando a 1.164 rpm, s = 36/1.200 = 3%.

O rotor nunca alcança a velocidade síncrona com carga; se alcançasse, não haveria indução. A corrente de partida direta fica, em geral, entre 6 e 8 vezes a nominal.

### Máquinas síncronas

Giram exatamente na velocidade síncrona. Como gerador, a potência aparente é S = √3·VL·IL; em ligação Δ, a corrente de fase é IL/√3. Como motor, ajustando a excitação, pode operar com FP capacitivo e corrigir o fator de potência da instalação.

Exemplo: gerador de 60√3 kVA, 400 V, em Δ. IL = 60.000√3/(√3 × 400) = 150 A e If = 150/√3 = 50√3 ≈ 86,6 A.

### Máquinas de corrente contínua

```latex
E = V - I_a R_a \qquad P_{desenv} = E\, I_a \qquad P_{saída} = P_{desenv} - P_{rotacionais}
```

No motor shunt, a corrente da rede divide-se em corrente de campo (If = V/Rf) e corrente de armadura (Ia = IL − If).

Exemplo: 220 V, 30 A da rede, Rf = 110 Ω, Ra = 0,5 Ω e perdas rotacionais de 368 W. If = 2 A, Ia = 28 A, E = 220 − 14 = 206 V, Pdesenv = 5.768 W e Psaída = 5.400 W.

| Excitação | Traço marcante |
| --- | --- |
| Shunt | Velocidade quase constante |
| Série | Alto torque de partida; não pode partir a vazio, pois dispara |
| Composta | Combina as duas |
| Independente | Controle fino de velocidade |

### Armadilhas de prova

- Dizer que laminar o núcleo reduz histerese; ela reduz correntes parasitas.
- Esquecer de subtrair a corrente de campo no motor shunt.
- Usar p como pares de polos em 120f/p; aqui p é o número de polos.
