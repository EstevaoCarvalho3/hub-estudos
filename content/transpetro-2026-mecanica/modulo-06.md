Cobre o item 9 do edital. Em 2023 caíram 3 questões, todas com conta: mistura de fluidos, continuidade num Venturi e Bernoulli.

### Propriedades dos fluidos

| Grandeza | Fórmula | Unidade |
| --- | --- | --- |
| Massa específica | ρ = m/V | kg/m³ (água ≈ 1.000) |
| Peso específico | γ = ρ g | N/m³ |
| Densidade relativa | d = ρ/ρ_água | Adimensional |
| Viscosidade dinâmica | μ | Pa·s |
| Viscosidade cinemática | ν = μ/ρ | m²/s; 1 cSt = 1 mm²/s |

Viscosidade de líquidos **cai** com a temperatura; a de gases **sobe**.

### Hidrostática

```latex
p = p_0 + \rho\, g\, h \qquad \frac{F_1}{A_1} = \frac{F_2}{A_2} \qquad E = \rho_{fluido}\, g\, V_{submerso}
```

- **Stevin:** a pressão cresce com a profundidade e não depende do formato do recipiente.
- **Pascal:** a pressão aplicada a um fluido confinado se transmite igualmente a todos os pontos. É a base da prensa hidráulica.
- **Arquimedes:** o empuxo é igual ao peso do fluido deslocado.

Exemplo: 10 m de água geram cerca de 100 kPa (1 bar). Com óleo de 900 kg/m³, a mesma coluna gera 90 kPa.

```questao
Qual a pressão manométrica no fundo de um tanque com 5 m de óleo de massa específica 800 kg/m³? Use g = 10 m/s².
*A) 40 kPa
B) 400 kPa
C) 4 kPa
D) 50 kPa
E) 8 kPa
> p = ρ g h = 800 × 10 × 5 = 40.000 Pa = 40 kPa.
```

### Continuidade

```latex
Q = A\,v \qquad A_1 v_1 = A_2 v_2 \qquad \dot m = \rho\, Q
```

Se a área cai pela metade, a velocidade dobra. Em mistura de correntes, some as **vazões mássicas**: ρ_mistura = (ρ₁Q₁ + ρ₂Q₂)/(Q₁ + Q₂) para fluidos incompressíveis.

Lembre: área do círculo = π d²/4. Se o diâmetro cai pela metade, a área cai a um quarto e a velocidade quadruplica.

### Bernoulli

```latex
\frac{p_1}{\rho g} + \frac{v_1^2}{2g} + z_1 = \frac{p_2}{\rho g} + \frac{v_2^2}{2g} + z_2 \;(+\,h_{perdas})
```

No Venturi horizontal, a velocidade aumenta na garganta e a pressão cai:

```latex
p_1 - p_2 = \frac{\rho}{2}\,(v_2^2 - v_1^2)
```

Roteiro de prova: use a continuidade para escrever v₂ em função de v₁; substitua em Bernoulli; isole v₁.

```questao
Água (1.000 kg/m³) escoa num Venturi horizontal em que a área da entrada é o dobro da garganta. A velocidade na entrada é 2 m/s. A queda de pressão entre a entrada e a garganta é de
A) 2 kPa
B) 8 kPa
C) 12 kPa
*D) 6 kPa
E) 4 kPa
> Pela continuidade, v₂ = 2 × 2 = 4 m/s. Δp = 1.000/2 × (16 − 4) = 500 × 12 = 6.000 Pa = 6 kPa.
```

### Regime de escoamento e perda de carga

```latex
Re = \frac{\rho\, v\, D}{\mu} = \frac{v\,D}{\nu} \qquad h_f = f\,\frac{L}{D}\,\frac{v^2}{2g} \qquad h_s = K\,\frac{v^2}{2g}
```

| Reynolds em tubo | Regime |
| --- | --- |
| Abaixo de cerca de 2.000 a 2.300 | Laminar |
| Entre 2.300 e 4.000 | Transição |
| Acima de 4.000 | Turbulento |

Perda **distribuída** acontece ao longo do tubo e cresce com o comprimento, a rugosidade e a velocidade. Perda **localizada** acontece em curvas, válvulas, reduções e entradas.

Potência fornecida ao fluido por uma bomba: P = ρ g Q H; a potência no eixo é essa dividida pelo rendimento.

### Armadilhas de prova

- Converta cm² para m² (÷ 10.000) e L/s para m³/s (÷ 1.000).
- Na mistura, a massa específica é a média ponderada **pelas vazões**, não a média simples.
- Bernoulli ideal não tem perdas; se a questão citar perda de carga, some h_perdas.
- A pressão menor fica onde a velocidade é maior.
