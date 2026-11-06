Este módulo cobre os itens 2.4 e 2.6 do edital e valeu 3 questões em 2023: Karnaugh, circuito lógico a partir de uma especificação e sequência de flip-flops.

### Bases numéricas

Cada posição binária vale uma potência de 2. Cada dígito hexadecimal equivale a 4 bits.

Exemplo: 1011₂ = 8 + 2 + 1 = 11. E 2F₁₆ = 0010 1111₂ = 47.

Complemento de 2: inverta os bits e some 1. Em 8 bits, −5 é 1111 1011.

### Portas lógicas

| Porta | Expressão | Saída 1 quando |
| --- | --- | --- |
| AND | A·B | Todas as entradas são 1 |
| OR | A + B | Ao menos uma é 1 |
| NOT | A' | Entrada é 0 |
| NAND | (A·B)' | Ao menos uma é 0 |
| NOR | (A + B)' | Todas são 0 |
| XOR | A⊕B | Entradas diferentes |
| XNOR | (A⊕B)' | Entradas iguais |

NAND e NOR são universais: sozinhas, implementam qualquer função.

### Álgebra booleana

```latex
A + A'B = A + B \qquad A + AB = A \qquad (A \cdot B)' = A' + B' \qquad (A + B)' = A' \cdot B'
```

### Mapa de Karnaugh

Use sempre a ordem 00, 01, 11, 10 nas linhas e colunas. Assim, células vizinhas mudam um só bit.

1. Marque 1 nos mintermos da função.
2. Agrupe em blocos de 2, 4, 8 ou 16 células, os maiores possíveis.
3. Lembre que as bordas opostas são vizinhas, inclusive os quatro cantos.
4. Em cada grupo, mantenha só as variáveis que não mudam.

Exemplo: F(A,B,C,D) = Σm(0, 2, 5, 7, 8, 10, 13, 15).

| AB \\ CD | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 00 | 1 | 0 | 0 | 1 |
| 01 | 0 | 1 | 1 | 0 |
| 11 | 0 | 1 | 1 | 0 |
| 10 | 1 | 0 | 0 | 1 |

Os quatro cantos dão B'D'. O bloco central dá BD. Resultado: F = B'D' + BD, que é a XNOR entre B e D.

### Do problema ao circuito

Exemplo: uma balança entrega X2X1X0 e Y deve ser 1 somente em 0, 2 e 4 kg, sem usar valores acima de 7.

Os mintermos são 000, 010 e 100. Em todos, X0 = 0. Falta excluir 6 (110), que também tem X0 = 0. Então Y = X0'·(X2·X1)'. Em portas: uma NAND de X2 e X1, cuja saída entra em uma AND com X0 invertido.

### Circuitos combinacionais comuns

- **Multiplexador:** escolhe 1 entre 2ⁿ entradas com n seleções.
- **Decodificador:** ativa 1 entre 2ⁿ saídas a partir de n bits.
- **Somador completo:** S = A⊕B⊕Ce e Cs = AB + Ce·(A⊕B).
- **Comparador:** usa XNOR bit a bit para testar igualdade.

### Flip-flops e sequenciais

Circuito sequencial tem memória: a saída depende também do estado anterior. O flip-flop muda na borda do clock.

| Tipo | Regra | Observação |
| --- | --- | --- |
| D | Q(próximo) = D | Copia a entrada |
| T | T = 1 inverte Q | Divide o clock por 2 |
| JK | 00 mantém, 01 zera, 10 seta, 11 inverte | Não tem estado proibido |
| SR | S seta, R reseta | S = R = 1 é proibido |

N flip-flops formam contador de até 2ⁿ estados. Um contador de anel tem N estados; um Johnson tem 2N.

Exemplo Johnson de 2 flip-flops, com D1 = Q2' e D2 = Q1, partindo de 00. Tabela de estados:

| Clock | Q1 | Q2 |
| --- | --- | --- |
| 0 | 0 | 0 |
| 1 | 1 | 0 |
| 2 | 1 | 1 |
| 3 | 0 | 1 |
| 4 | 0 | 0 |

Método para questões de sequência: escreva a equação de cada entrada, monte a tabela clock a clock e só então relacione os estados aos LEDs.

```questao
O número decimal 13 escrito em binário é
A) 1011
*B) 1101
C) 1110
D) 0111
> 13 = 8 + 4 + 1, ou seja, 1101.
```

### Armadilhas de prova

- Ordenar o mapa como 00, 01, 10, 11.
- Esquecer de agrupar os quatro cantos.
- Em questão de marcação X', confundir variável negada com a função negada.
- Atualizar um flip-flop antes do outro: todos usam o estado anterior ao clock.
