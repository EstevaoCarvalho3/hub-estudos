Este módulo cobre o item 4 do edital e valeu 2 questões em 2023. As outras provas trazem trifásico em quase toda edição, então vale estudar com folga.

### Estrela e triângulo

| Ligação | Tensões | Correntes |
| --- | --- | --- |
| Estrela (Y) | VL = √3·Vf | IL = If |
| Triângulo (Δ) | VL = Vf | IL = √3·If |

```latex
P_{3\varphi} = \sqrt{3}\, V_L I_L \cos\varphi \qquad S_{3\varphi} = \sqrt{3}\, V_L I_L \qquad Z_Y = \frac{Z_\Delta}{3}
```

No Brasil, as redes de baixa tensão mais comuns são 220/127 V e 380/220 V. O primeiro número é a tensão de linha; o segundo, a de fase.

```questao
Em uma ligação estrela equilibrada com tensão de linha de 380 V, a tensão de fase é de cerca de
A) 380 V
B) 127 V
*C) 220 V
D) 660 V
> Na estrela, Vfase = Vlinha/√3 = 380/1,732 ≈ 220 V.
```

### Exemplo com duas cargas

Rede com VL = 100√3 V alimenta uma carga em Δ com j10 Ω por ramo e outra em Y com j5 Ω por ramo.

1. Em Δ, cada ramo recebe 100√3 V. If = 100√3/10 = 10√3 A e IL = √3 × 10√3 = 30 A.
2. Em Y, cada ramo recebe 100 V. IL = 100/5 = 20 A.
3. As duas cargas são puramente indutivas, então as correntes estão em fase e somam: 50 A.

Se as cargas tivessem ângulos diferentes, seria preciso somar fasores.

### Relações que caem como pegadinha

- Duas cargas, uma em Δ e outra em Y, puxando a mesma corrente de linha: a corrente de fase do Δ é IL/√3 e a do Y é IL. A razão Δ/Y é √3/3.
- Em carga equilibrada em Y, a corrente de neutro é zero.
- A mesma carga ligada em Δ consome 3 vezes a potência que consumiria em Y na mesma rede.

Exemplo de potência: 380 V, 20 A e FP 0,85 dão P = 1,732 × 380 × 20 × 0,85 ≈ 11,2 kW.

### Sequência de fases

A sequência ABC ou ACB define o sentido de giro de motores trifásicos. Trocar duas fases quaisquer inverte o sentido. O sequencímetro confirma a sequência antes de ligar um motor.

```questao
Em uma carga ligada em triângulo equilibrado, a corrente de linha é
*A) √3 vezes a corrente de fase
B) igual à corrente de fase
C) a corrente de fase dividida por √3
D) 3 vezes a corrente de fase
> No triângulo a tensão de linha é igual à de fase, e a corrente de linha é √3 vezes a de fase. Na estrela acontece o contrário.
```

### Armadilhas de prova

- Usar a tensão de linha no ramo de uma carga em Y.
- Esquecer o √3 na corrente de linha do triângulo.
- Somar módulos de correntes com ângulos diferentes.
