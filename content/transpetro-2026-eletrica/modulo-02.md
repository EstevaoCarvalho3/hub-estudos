Este módulo cobre o item 3 do edital e valeu 5 questões em 2023. Quase todas pedem montar o triângulo de potências.

### Triângulo de potências

```latex
P = V I \cos\varphi \qquad Q = V I \,\text{sen}\,\varphi \qquad S = V I = \sqrt{P^2 + Q^2} \qquad FP = \frac{P}{S}
```

| Grandeza | Unidade | O que representa |
| --- | --- | --- |
| Ativa (P) | W | Trabalho útil: calor, movimento, luz |
| Reativa (Q) | var | Energia que vai e volta nos campos de L e C |
| Aparente (S) | VA | O que a rede precisa fornecer |

Carga indutiva absorve reativo (Q positivo); capacitor fornece reativo (Q negativo). Por isso, um banco de capacitores reduz o Q visto pela rede.

Exemplo: S = 100 kVA e P = 60 kW. Q = √(100² − 60²) = 80 kvar e FP = 0,6.

### Correção do fator de potência

Some as potências de cada carga separadamente: P com P e Q com Q. Nunca some S diretamente.

Exemplo: motor 1 com 50 kVA e FP 0,8 tem P = 40 kW e Q = 30 kvar. Motor 2 com 20 kVA e FP 0,6 tem P = 12 kW e Q = 16 kvar. Com banco de 20 kvar, a rede vê Q = 30 + 16 − 20 = 26 kvar.

```latex
Q_C = P\,(\tan\varphi_1 - \tan\varphi_2)
```

No Brasil, o fator de potência de referência para cobrança de excedente reativo é 0,92.

### Energia

1 kWh = 1.000 W × 3.600 s = 3,6 × 10⁶ J.

Exemplo de medidor com disco: a constante é 2,5 Wh por volta. Uma carga de 100 W por 30 minutos consome 50 Wh, e uma de 60 W por 60 minutos, 60 Wh. O disco dá 110/2,5 = 44 voltas.

### Medição de potência

O wattímetro tem bobina de corrente em série e bobina de tensão em paralelo. Em sistema trifásico a três fios, o método dos dois wattímetros dá a potência total pela soma algébrica das leituras. Uma das leituras pode ser negativa quando o FP é menor que 0,5.

```latex
P = W_1 + W_2 \qquad Q = \sqrt{3}\,(W_1 - W_2)
```

### Rendimento e máxima transferência

Rendimento é η = P saída / P entrada. Uma fonte entrega potência máxima à carga quando RL = Rth; nesse caso, o rendimento é de 50%.

### Armadilhas de prova

- Somar kVA de cargas com fatores de potência diferentes.
- Esquecer que o banco de capacitores subtrai reativo.
- Converter kWh para J usando 60 em vez de 3.600.
