Este módulo cobre os itens 2.1, 2.2, 2.3 e 2.5 do edital e valeu 5 questões em 2023. A prova pediu polarização de transistor, amplificador operacional e reconhecimento de esquemas.

### Diodos e retificadores

O diodo de silício conduz a partir de cerca de 0,7 V em polarização direta. O Zener trabalha reversamente e fixa a tensão em Vz. O LED tem queda maior, em geral de 1,8 V a 3,3 V.

| Retificador | Tensão média ideal | Frequência de ondulação | Diodos conduzindo por vez |
| --- | --- | --- | --- |
| Meia onda | Vp / π | f | 1 |
| Onda completa com center tap | 2·Vp / π | 2f | 1 |
| Ponte | 2·Vp / π | 2f | 2 |

Com filtro capacitivo, a ondulação é aproximadamente ΔV = I / (fr·C), em que fr é a frequência de ondulação.

Exemplo de resistor de LED: fonte de 12 V, 3 LEDs de 2 V em série e 20 mA. R = (12 − 6) / 0,02 = 300 Ω.

Exemplo de regulador Zener: entrada de 15 V, Zener de 9 V e resistor de 300 Ω. A corrente no resistor é de 20 mA. Com carga de 10 mA, sobram 10 mA no Zener.

### Transistor bipolar (TJB)

```latex
I_E = I_C + I_B \qquad I_C = \beta I_B \qquad V_{BE} \approx 0{,}7\ \text{V}
```

| Região | Junção BE | Junção BC | Uso |
| --- | --- | --- | --- |
| Corte | Reversa | Reversa | Chave aberta |
| Ativa | Direta | Reversa | Amplificador |
| Saturação | Direta | Direta | Chave fechada, VCE ≈ 0,2 V |

Exemplo de polarização fixa: VCC = 15 V, RB = 1,43 MΩ, RC = 5 kΩ e β = 100.

1. IB = (15 − 0,7) / 1,43 MΩ = 10 µA.
2. IC = 100 × 10 µA = 1 mA.
3. VCE = 15 − 1 mA × 5 kΩ = 10 V.
4. Como VCE > 0,2 V, o transistor está na região ativa.

Polarização por divisor: calcule VB pelo divisor, faça VE = VB − 0,7 e IE = VE / RE.

Exemplo de fonte de corrente para LEDs: VCC = 12 V, base fixa em 2,7 V e RE = 200 Ω. VE = 2 V e IC ≈ 10 mA. Sobra 12 − 2 − 0,2 = 9,8 V para LEDs de 1,8 V. Cabem 5 LEDs, pois 6 pediriam 10,8 V.

| Configuração | Entrada | Saída | Ganho de tensão | Traço marcante |
| --- | --- | --- | --- | --- |
| Emissor comum | Base | Coletor | Alto, invertido | Mais usada como amplificador |
| Coletor comum | Base | Emissor | Cerca de 1 | Seguidor, boa impedância de entrada |
| Base comum | Emissor | Coletor | Alto, sem inversão | Baixa impedância de entrada |

### MOSFET

O MOSFET é controlado por tensão e sua porta quase não drena corrente. O canal N de enriquecimento conduz quando VGS passa da tensão de limiar Vt.

```latex
I_D = \tfrac{1}{2} k (V_{GS} - V_t)^2 \quad (\text{saturação}) \qquad P_{cond} = R_{DS(on)} I_D^2
```

Exemplo: k = 2 mA/V², Vt = 2 V e VGS = 4 V. ID = ½ × 2 × 2² = 4 mA.

Comparação rápida: o TJB é controlado por corrente e o MOSFET por tensão. Em eletrônica de potência, o MOSFET chaveia mais rápido em baixas e médias tensões.

### Amplificador operacional ideal

Use duas regras na realimentação negativa: tensão igual nas duas entradas e corrente zero nas entradas.

| Circuito | Saída | Observação |
| --- | --- | --- |
| Inversor | Vs = −(Rf/Ri)·Ve | Resistência de entrada = Ri |
| Não inversor | Vs = (1 + Rf/Ri)·Ve | Entrada muito alta |
| Seguidor | Vs = Ve | Isola estágios |
| Somador inversor | Vs = −Rf·(V1/R1 + V2/R2) | Soma ponderada |
| Diferencial | Vs = (R2/R1)·(V+ − V−) | Exige R4/R3 = R2/R1 |
| Integrador | Vs = −(1/RC)·∫Ve dt | Capacitor na realimentação |
| Comparador | Satura em ±Vsat | Sem realimentação negativa |

Exemplo: inversor com Ri = 10 kΩ, Rf = 47 kΩ e Ve = 0,2 V dá Vs = −0,94 V.

No diferencial, R1 liga a entrada inversora, R2 realimenta, R3 liga a entrada não inversora e R4 vai ao terra. Com a outra fonte zerada, a fonte da entrada inversora vê R1. A fonte da não inversora vê R3 + R4.

Produto ganho-banda: se GBW = 1 MHz e o ganho é 20, a banda é 50 kHz.

### Transdutores

Transdutor converte uma grandeza física em outra, em geral elétrica. Exemplos: extensômetro (deformação em resistência), termopar (temperatura em tensão), Pt100 (temperatura em resistência), LVDT (deslocamento em tensão) e piezoelétrico (força em carga).

A ponte de Wheatstone equilibra quando R1·R4 = R2·R3. Ela é o circuito típico de leitura de sensores resistivos.

### Tiristores

| Dispositivo | Conduz em | Dispara por | Corta quando |
| --- | --- | --- | --- |
| SCR | Um sentido | Pulso de gatilho | Corrente cai abaixo da de manutenção |
| TRIAC | Dois sentidos | Pulso de gatilho | Corrente passa por zero |
| DIAC | Dois sentidos | Tensão de ruptura | Tensão cai; usado para disparar TRIAC |

Um retificador de meia onda com SCR e ângulo de disparo α entrega Vméd = Vp·(1 + cos α) / (2π).

### Conversores e nobreaks

| Conversor | Ganho ideal, com razão cíclica D | Como reconhecer o esquema |
| --- | --- | --- |
| Buck (abaixador) | Vs = D·Ve | Chave em série, diodo ao terra, indutor em série com a saída |
| Boost (elevador) | Vs = Ve / (1 − D) | Indutor na entrada, chave ao terra, diodo em série até a saída |
| Buck-boost | Vs = −Ve·D / (1 − D) | Chave em série, indutor ao terra, saída invertida |

Exemplo: boost com 24 V e D = 0,6 entrega 24 / 0,4 = 60 V.

A fonte chaveada retifica a rede, chaveia em alta frequência, usa transformador pequeno, retifica de novo e realimenta por PWM. Ela rende mais e pesa menos que a fonte linear, mas gera mais ruído.

O nobreak online tem dupla conversão: retificador, banco de baterias, inversor e chave de bypass. O inversor alimenta a carga o tempo todo, sem tempo de transferência. No offline, a carga só passa ao inversor quando a rede falha.

Conversores CA/CA variam tensão por controle de fase (gradador com TRIAC) ou também frequência (cicloconversor). O inversor de frequência usa estágio CC: CA → CC → CA, com PWM.

### Leitura de esquemas

1. Ache as alimentações e o terra.
2. Marque entrada e saída do sinal.
3. Separe polarização (CC) de sinal (CA): capacitores de acoplamento bloqueiam CC.
4. Para cada transistor, identifique por qual terminal o sinal entra e sai.

### Armadilhas de prova

- Aplicar IC = β·IB em saturação.
- Esquecer as duas quedas de diodo na ponte.
- Tratar frequência de ondulação da onda completa como f, em vez de 2f.
- Confundir o ganho do boost com o do buck: D no numerador é buck.
