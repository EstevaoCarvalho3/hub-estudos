Cobre o item 7 do edital. Em 2023 foram 3 questões: deformação específica, ponto de maior tensão numa viga e rigidez de mola.

### Tensão e deformação

```latex
\sigma = \frac{F}{A} \qquad \tau = \frac{V}{A} \qquad \varepsilon = \frac{\Delta L}{L} \qquad \sigma = E\,\varepsilon \qquad \Delta L = \frac{F L}{E A}
```

| Grandeza | Unidade | Observação |
| --- | --- | --- |
| Tensão normal σ | Pa (N/m²); usa-se MPa = N/mm² | Força perpendicular à seção |
| Tensão de cisalhamento τ | MPa | Força paralela à seção (pinos, rebites, chavetas) |
| Deformação específica ε | Adimensional | Muitas vezes em µ (10⁻⁶) ou % |
| Módulo de elasticidade E | GPa | Aço ≈ 200 a 210 GPa; alumínio ≈ 70 GPa |

Exemplo: uma barra de 2 m alonga 0,01 mm. ε = 0,01 / 2.000 = 5 × 10⁻⁶ = 5 µ.

Coeficiente de segurança: n = tensão limite ÷ tensão admissível. Para materiais dúcteis, a tensão limite costuma ser o escoamento; para frágeis, a ruptura.

```questao
Um tirante de aço com seção de 100 mm² suporta 20 kN. A tensão normal é de
A) 2.000 MPa
B) 20 MPa
C) 2 MPa
*D) 200 MPa
E) 0,2 MPa
> σ = 20.000 N / 100 mm² = 200 N/mm² = 200 MPa.
```

### Diagrama tensão-deformação

1. **Regime elástico:** a deformação desaparece quando a carga é retirada. Vale a Lei de Hooke até o limite de proporcionalidade.
2. **Escoamento:** o material deforma sem aumento significativo de carga. Quando não há patamar visível, usa-se o limite convencional de 0,2%.
3. **Encruamento:** a tensão volta a subir até o limite de resistência (máximo do gráfico).
4. **Estricção e ruptura:** a seção afina localmente até romper.

Material dúctil (aço de baixo carbono, alumínio puro) deforma muito antes de romper. Material frágil (ferro fundido cinzento, aço temperado sem revenido) rompe quase sem deformar.

### Flexão

```latex
\sigma = \frac{M\,c}{I} \qquad I_{retângulo} = \frac{b\,h^3}{12} \qquad I_{círculo} = \frac{\pi d^4}{64}
```

A maior tensão de flexão ocorre na seção de **maior momento fletor**, nas **fibras mais afastadas** da linha neutra. Na linha neutra a tensão normal é zero. De um lado a fibra é tracionada; do outro, comprimida.

| Viga | Momento máximo |
| --- | --- |
| Biapoiada com carga P no meio | P L / 4, no meio |
| Biapoiada com carga distribuída q | q L² / 8, no meio |
| Em balanço com carga P na ponta | P L, no engaste |

Como I depende de h³, uma viga retangular é muito mais rígida "em pé" do que deitada.

### Torção

```latex
\tau_{máx} = \frac{T\,r}{J} = \frac{16\,T}{\pi d^3} \qquad J_{eixo\ maciço} = \frac{\pi d^4}{32}
```

Dobrar o diâmetro de um eixo maciço reduz a tensão de torção 8 vezes.

### Molas helicoidais

```latex
k = \frac{G\,d^4}{8\,D^3\,N}
```

G é o módulo de elasticidade transversal, d o diâmetro do arame, D o diâmetro médio da mola e N o número de espiras ativas. **Cortar a mola** reduz N e, portanto, **aumenta a rigidez**.

| Associação | Rigidez equivalente |
| --- | --- |
| Série | 1/k = 1/k₁ + 1/k₂ |
| Paralelo | k = k₁ + k₂ |

```questao
Duas molas iguais, de 200 N/mm cada, são associadas em série. A rigidez equivalente é de
A) 400 N/mm
B) 300 N/mm
*C) 100 N/mm
D) 50 N/mm
E) 200 N/mm
> Em série, 1/k = 1/200 + 1/200 = 2/200, então k = 100 N/mm. Em paralelo seria 400 N/mm.
```

### Armadilhas de prova

- 1 MPa = 1 N/mm². Use mm² e a conta fica direta.
- A tensão máxima de flexão nunca está na linha neutra.
- Molas: série funciona como resistores em paralelo, e vice-versa.
- Flambagem afeta peças longas e esbeltas sob **compressão**, mesmo abaixo do escoamento.
