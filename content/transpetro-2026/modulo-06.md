Este módulo cobre os itens 5.1 a 5.5 do edital e valeu 3 questões em 2023. A prova pediu pressão hidrostática, símbolos da ISA e tipo de diagrama.

### Mecânica dos fluidos

```latex
P = \frac{F}{A} \qquad P_{hid} = \rho g h \qquad A_1 v_1 = A_2 v_2
```

```latex
P_1 + \tfrac{1}{2}\rho v_1^2 + \rho g z_1 = P_2 + \tfrac{1}{2}\rho v_2^2 + \rho g z_2 \qquad Re = \frac{\rho v D}{\mu}
```

- **Stevin:** a pressão cresce com a profundidade e não depende da área da base.
- **Pascal:** pressão aplicada a um fluido em repouso transmite-se integralmente.
- **Continuidade:** se a área cai pela metade, a velocidade dobra.
- **Bernoulli:** onde a velocidade sobe, a pressão estática cai. É a base da placa de orifício.
- **Reynolds:** abaixo de cerca de 2.000 o escoamento é laminar; acima de cerca de 4.000, turbulento.
- **Perda de carga:** é a energia perdida por atrito, em trechos retos e acessórios.

Exemplo: fluido de 800 kg/m³ e coluna de 5 m, com g = 10 m/s². P = 800 × 10 × 5 = 40 kPa.

### Identificação ISA S5.1

A primeira letra diz a variável medida. As seguintes dizem a função. O número identifica a malha.

| Letra | Como primeira letra | Como letra seguinte |
| --- | --- | --- |
| A | Análise | Alarme |
| C | Livre (condutividade em uso comum) | Controlador |
| D | Densidade | Diferencial, como modificador |
| E | Tensão | Elemento primário |
| F | Vazão | Fração ou razão, como modificador |
| H | Manual | Alto |
| I | Corrente | Indicação |
| L | Nível | Lâmpada, ou baixo |
| P | Pressão | Ponto de teste |
| Q | Quantidade | Totalização, como modificador |
| R | Radiação | Registro |
| S | Velocidade ou frequência | Chave ou segurança |
| T | Temperatura | Transmissor |
| V | Vibração | Válvula |
| Y | Evento ou estado | Relé ou conversão |
| Z | Posição | Atuador ou elemento final |

Decifre sempre pela primeira letra:

| Tag | Leitura |
| --- | --- |
| PT-101 | Transmissor de pressão |
| TIC-204 | Controlador indicador de temperatura |
| FE-10 | Elemento de vazão, como a placa de orifício |
| FCV-10 | Válvula controladora de vazão |
| PDT-5 | Transmissor de pressão diferencial |
| LAH-30 | Alarme de nível alto |
| PSV-7 | Válvula de segurança de pressão |

### Símbolos de linha e de instrumento

| Representação | Significado |
| --- | --- |
| Linha cheia e fina | Conexão ao processo |
| Linha com traços cruzados | Sinal pneumático |
| Linha tracejada | Sinal elétrico |
| Linha com a letra L | Sinal hidráulico |
| Linha com X | Tubo capilar |
| Linha com círculos | Ligação por software ou dados |
| Círculo sem traço | Instrumento de campo |
| Círculo com traço cheio | Painel de sala de controle, acessível ao operador |
| Círculo com traço duplo ou tracejado | Local auxiliar ou atrás do painel |
| Círculo no quadrado | Função de SDCD, compartilhada |
| Hexágono | Função de computador |
| Losango no quadrado | Função de CLP |
| Válvula com letra M ou semicírculo com M | Atuador elétrico motorizado |

A notação varia entre edições e empresas. Confira esses símbolos em uma tabela ilustrada da norma, porque aqui eles estão só descritos, e a prova de 2023 os cobrou como figura.

### Documentos de instrumentação

| Documento | Responde a |
| --- | --- |
| Fluxograma de engenharia (P&ID) | O que existe no processo e como se liga? |
| Lista de instrumentos | Quais são todos os tags? |
| Folha de dados | Qual a especificação de cada instrumento? |
| Típico de instalação | Como montar fisicamente? |
| Diagrama de interligação | Qual cabo e borne liga o quê? |
| Diagrama de malha | Qual o caminho completo do sinal de uma malha? |
| Diagrama lógico | Como funciona o intertravamento? |
| Matriz de causa e efeito | Qual evento dispara qual ação? |
| Planta de instrumentação | Onde cada instrumento fica? |

### Tubulação e diagramas elétricos

- **Planta de tubulação:** vista de cima, com a posição das linhas.
- **Isométrico:** vista em perspectiva de uma linha, com cotas e materiais.
- **Lista de linhas:** tabela com diâmetro, fluido, classe, pressão e temperatura.
- **Diagrama unifilar:** desenhado sobre a planta baixa, mostra dispositivos e trajeto.
- **Diagrama multifilar ou trifilar:** mostra todos os condutores.
- **Diagrama funcional:** mostra o funcionamento, sem a posição física.

### CAD

Ferramentas CAD organizam o desenho em camadas (layers), blocos reutilizáveis e escalas de plotagem. Os formatos usuais são DWG e DXF. O desenho é feito em escala real e ajustado na folha de impressão.

### Armadilhas de prova

- Ler o tag pela última letra. FT é transmissor de vazão, não o contrário.
- Incluir a área da base em ρ·g·h: é um dado distrator.
- Confundir diagrama de malha (uma malha) com diagrama de interligação (cabos e bornes).
- Trocar sinal pneumático por elétrico.
