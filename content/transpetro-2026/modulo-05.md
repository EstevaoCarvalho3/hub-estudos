Este módulo cobre os itens 4.1 a 4.4 do edital e valeu 3 questões em 2023: tempo de varredura, diagnóstico de PID e razão de amortecimento.

### Malha aberta e malha fechada

Malha aberta age sem medir o resultado. Malha fechada mede a saída, compara com o valor desejado e corrige o erro.

| Sigla | Significado | Exemplo em temperatura |
| --- | --- | --- |
| SP | Set point, valor desejado | 80 °C |
| PV | Variável de processo, valor medido | 76 °C |
| Erro | SP − PV, em ação reversa | +4 °C |
| MV | Variável manipulada, saída do controlador | Abertura da válvula de vapor |

Cadeia da malha: sensor e transmissor, controlador, elemento final e processo.

Ação reversa: se a PV sobe, a saída desce. Ação direta: se a PV sobe, a saída sobe.

### Controle PID

```latex
u(t) = K_p e(t) + K_i \int e(t)\,dt + K_d \frac{de(t)}{dt}
```

| Ação | Olha para | Efeito | Risco se exagerada |
| --- | --- | --- | --- |
| P | Erro presente | Resposta mais rápida | Oscilação; sozinha deixa erro residual |
| I | Erro acumulado | Elimina erro em regime | Sobressinal e lentidão |
| D | Tendência do erro | Antecipa e amortece | Amplifica ruído |

Diagnóstico rápido: erro permanente pede mais I. Sobressinal e reação lenta a distúrbios pedem ajuste de D. Em vazão, com sinal ruidoso, costuma-se evitar D.

### Dinâmica dos sistemas

Primeira ordem: G(s) = K/(τs + 1). Com τ atinge 63,2% do valor final. A saída estabiliza em cerca de 5τ.

Segunda ordem:

```latex
G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2} \qquad s = -\zeta\omega_n \pm j\omega_n\sqrt{1-\zeta^2}
```

Para polos complexos s = −σ ± jωd, valem ωn = √(σ² + ωd²) e ζ = σ/ωn.

Exemplo: polos em −3 ± j4. ωn = 5 rad/s e ζ = 3/5 = 0,6.

| ζ | Comportamento |
| --- | --- |
| 0 | Não amortecido, oscila sem parar |
| Entre 0 e 1 | Subamortecido, com sobressinal |
| 1 | Criticamente amortecido |
| Maior que 1 | Superamortecido, sem oscilação |

O sistema é estável quando todos os polos têm parte real negativa.

### CLP

O CLP tem fonte, CPU, módulos de entrada e saída e comunicação. Seu ciclo de varredura repete três etapas:

1. Lê as entradas e guarda a imagem delas.
2. Executa o programa com essa imagem.
3. Atualiza as saídas.

Um evento curto pode cair entre duas leituras. Para garantir a detecção, mantenha cada estado por pelo menos dois tempos de varredura. Na prova de 2023, com 300 ms, o gabarito foi 600 ms.

As linguagens da IEC 61131-3 são Ladder (LD), Diagrama de Blocos (FBD), Texto Estruturado (ST), Lista de Instruções (IL) e Sequenciamento Gráfico (SFC). O edital cita Ladder e diagrama de blocos.

### Ladder

| Elemento | Função |
| --- | --- |
| Contato NA | Passa quando o bit é 1 |
| Contato NF | Passa quando o bit é 0 |
| Contatos em série | AND |
| Contatos em paralelo | OR |
| Bobina | Escreve o resultado da linha |
| TON | Liga a saída após atraso |
| TOF | Desliga a saída após atraso |
| CTU | Conta bordas para cima |

Exemplo de partida e parada com selo: K = (LIGA + K)·DESL'. Na linha, LIGA fica em paralelo com o contato de K, e ambos em série com DESL NF. Por segurança, a botoeira física de parada costuma ser NF.

Módulo analógico: resolução = faixa / 2ⁿ. Com 12 bits em 4–20 mA, cada passo vale 16 mA / 4096 ≈ 3,9 µA.

### SDCD e supervisório

| Sistema | Uso típico | Ideia central |
| --- | --- | --- |
| CLP | Lógica discreta e máquinas | Robústo e veloz em intertravamento |
| SDCD | Processos contínuos grandes | Controle distribuído com banco de dados único e redundância |
| SCADA | Supervisão de sistemas extensos | Coleta, mostra e comanda; a lógica fica nos CLPs e RTUs |
| IHM | Operação local | Interface junto à máquina |

Um supervisório trabalha com tags, telas, alarmes, tendências e histórico.

O SIS não deve depender do controle regular. Isso está no Módulo 8.

### Armadilhas de prova

- Dizer que a ação P elimina o erro permanente.
- Usar D em sinal com muito ruído.
- Pegar ζ = 3/4 em vez de ζ = 3/5: divida por ωn, não pela parte imaginária.
- Confundir SCADA, que supervisiona, com CLP, que executa a lógica.
