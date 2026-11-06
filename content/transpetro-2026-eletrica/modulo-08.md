Este módulo cobre o item 9 do edital e valeu 6 questões em 2023: amplificador operacional, lógica, PID, entrada de CLP, ganho crítico e função de transferência.

### Eletrônica analógica básica

- **Diodo de silício:** conduz a partir de cerca de 0,7 V em polarização direta.
- **Transistor como chave:** em corte, não conduz; em saturação, VCE ≈ 0,2 V.
- **Amplificador operacional ideal com realimentação negativa:** as duas entradas têm a mesma tensão e não recebem corrente.
- **Comparador (sem realimentação negativa):** a saída satura positiva se V+ > V− e negativa se V+ < V−.

Exemplo de comparador: referência de 4 V na entrada inversora e sinal Vi na não inversora. A saída é negativa quando Vi for menor que 4 V.

| Circuito com amp-op | Ganho |
| --- | --- |
| Inversor | −Rf/Ri |
| Não inversor | 1 + Rf/Ri |
| Seguidor | 1 |

### Eletrônica digital

```latex
(A \cdot B)' = A' + B' \qquad (A + B)' = A' \cdot B' \qquad A + A'B = A + B
```

Para ler um diagrama lógico, escreva a saída de cada porta, da entrada para a saída, e só então simplifique. NAND e NOR são portas universais.

### Entrada digital de CLP com pull-up

O resistor de pull-up forma um divisor com a resistência interna da entrada. Ele precisa ser pequeno o bastante para garantir nível alto e grande o bastante para não aquecer com a chave fechada.

Exemplo: 12 V, entrada com 4 kΩ, nível alto a partir de 9 V e no máximo 0,2 W no resistor.

1. Nível alto: 12 × 4/(4 + R) ≥ 9, então R ≤ 1,33 kΩ.
2. Potência com a chave fechada: 12²/R ≤ 0,2, então R ≥ 720 Ω.
3. Um resistor de 1 kΩ atende às duas condições.

### CLP e automação

O CLP repete o ciclo: lê as entradas, executa o programa e atualiza as saídas. As linguagens da IEC 61131-3 são Ladder, Diagrama de Blocos, Texto Estruturado, Lista de Instruções e SFC. No Ladder, contatos em série fazem E; em paralelo, OU.

Na pirâmide da automação, o nível de campo tem sensores e atuadores; acima vêm controle (CLP), supervisão (SCADA), gestão da produção e gestão corporativa.

### Controle em malha fechada

| Ação do PID | Efeito | Sintoma quando falta |
| --- | --- | --- |
| Proporcional | Resposta à diferença atual | Resposta lenta |
| Integral | Elimina o erro em regime | Variável nunca chega ao setpoint |
| Derivativa | Antecipa pela tendência | Recuperação lenta de distúrbios e sobressinal |

Na prova de 2023, um forno que nunca chegava ao setpoint e se recuperava devagar teve gabarito "proporcional e integral".

### Ganho crítico (Routh-Hurwitz)

Para uma malha fechada com polinômio s³ + a·s² + b·s + K, o sistema fica no limite de estabilidade quando K = a·b. Nesse ponto surgem polos imaginários puros em ±j√b, e a saída oscila com amplitude constante.

Exemplo: s³ + 10s² + 20s + K oscila com K = 200, na frequência de √20 ≈ 4,5 rad/s.

### Armadilhas de prova

- Calcular só uma das duas condições do pull-up.
- Esquecer que comparador não tem curto virtual.
- Atribuir à ação derivativa a eliminação do erro em regime.
