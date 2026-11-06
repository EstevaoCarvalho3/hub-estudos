Cobre o item 15 do edital, exceto bombas, que estão no módulo anterior. Em 2023 caíram 4 questões: área de trocador de calor, caldeira no ciclo Rankine, tempos do motor e ciclos Otto e Diesel.

### Calor e transferência de calor

```latex
Q = m\,c\,\Delta T \qquad Q_{latente} = m\,L
```

| Mecanismo | Como acontece | Exemplo |
| --- | --- | --- |
| Condução | Através do material, sem movimento de massa | Parede de tubo |
| Convecção | Por fluido em movimento | Ar soprado num radiador |
| Radiação | Por ondas eletromagnéticas, sem meio | Chama da caldeira aquecendo os tubos |

### Trocadores de calor

```latex
Q = U \cdot A \cdot F \cdot \Delta T_{ml} \qquad \Delta T_{ml} = \frac{\Delta T_1 - \Delta T_2}{\ln(\Delta T_1 / \Delta T_2)}
```

U é o coeficiente global de troca, A a área, F o fator de correção para arranjos que não são contracorrente pura e ΔT_ml a diferença de temperatura média logarítmica.

| Tipo | Destaque |
| --- | --- |
| Casco e tubos | O mais comum na indústria do petróleo; um fluido nos tubos e outro no casco, com chicanas |
| Placas | Compacto, alta eficiência, fácil de abrir e limpar |
| Duplo tubo | Simples, pequenas cargas |
| Resfriador a ar (air cooler) | Ventiladores sopram ar sobre tubos aletados |

O arranjo em **contracorrente** é mais eficiente que o paralelo. Incrustação (fouling) reduz U e é a principal causa de limpeza de trocadores.

```questao
Um trocador troca 300 kW com U = 500 W/(m²·°C), F = 1 e ΔT_ml = 60 °C. A área necessária é de
A) 15 m²
B) 30 m²
C) 5 m²
*D) 10 m²
E) 20 m²
> A = Q / (U × F × ΔT_ml) = 300.000 / (500 × 1 × 60) = 300.000 / 30.000 = 10 m².
```

### Ciclos térmicos

| Ciclo | Equipamentos em ordem | Onde se usa |
| --- | --- | --- |
| Rankine (vapor) | Bomba → caldeira (gera vapor) → turbina a vapor → condensador | Usinas térmicas, geração de vapor em refinarias |
| Brayton (turbina a gás) | Compressor → câmara de combustão → turbina | Turbogeradores, acionamento de compressores em dutos |
| Otto | Combustão por centelha | Motores a gasolina, etanol, GNV |
| Diesel | Combustão por compressão | Motores diesel |

Turbinas a vapor podem ser de **ação** (a expansão ocorre só nos bocais) ou de **reação** (parte da expansão nas palhetas móveis). Caldeiras são aquatubulares (água nos tubos, altas pressões) ou flamotubulares (gases quentes nos tubos, pressões menores). Caldeiras e vasos de pressão seguem a NR-13.

### Motores de combustão interna

Ordem dos quatro tempos: **admissão, compressão, expansão (combustão) e escape**. O motor de quatro tempos completa o ciclo em duas voltas do virabrequim; o de dois tempos, em uma.

| | Ciclo Otto | Ciclo Diesel |
| --- | --- | --- |
| Ignição | Centelha da vela | Compressão (autoignição) |
| Admissão | Mistura ar e combustível | Só ar; o combustível é injetado no fim da compressão |
| Taxa de compressão | Menor, cerca de 8 a 12:1 | Maior, cerca de 15 a 22:1 |

Cilindrada = área do pistão × curso × número de cilindros.

```questao
No motor de quatro tempos, a etapa em que a válvula de admissão e a de escape estão fechadas e o pistão sobe comprimindo a mistura é a
*A) compressão
B) lavagem
C) escape
D) admissão
E) expansão
> Na compressão as duas válvulas estão fechadas e o pistão sobe. Na expansão também estão fechadas, mas o pistão desce empurrado pelos gases.
```

### Compressores

| Família | Tipos | Destaque |
| --- | --- | --- |
| Deslocamento positivo | Alternativo (pistão), parafuso, palhetas, lóbulos | Pressões altas; vazões menores |
| Dinâmicos | Centrífugo, axial | Grandes vazões; sujeitos a surge (instabilidade em baixa vazão) |

Em compressores de vários estágios, o **resfriamento intermediário** reduz o trabalho de compressão. Compressor alternativo não pode receber líquido na sucção: o líquido não se comprime e quebra peças.

### Armadilhas de prova

- No Rankine quem gera vapor é a caldeira; a turbina só expande.
- Diesel admite só ar.
- Na fórmula do trocador, converta kW para W antes de dividir.
- Surge é problema de compressor dinâmico, não de alternativo.
