Este módulo cobre os itens 8 e 10.1 do edital e valeu 7 questões em 2023. A banca cobra esquemas de aterramento, queda de tensão e trechos da NBR 5410.

### NBR 5410 em pontos

- Vale para instalações de baixa tensão: até 1.000 V em CA e 1.500 V em CC.
- Proteção contra choque tem duas frentes: contato direto (isolação, barreiras, invólucros) e contato indireto (seccionamento automático e equipotencialização). As duas são obrigatórias.
- Condutores que escoam corrente de falta, como o de proteção, precisam suportá-la sem aquecimento excessivo.
- A instalação deve permitir seccionamento para manutenção, e reformas exigem nova inspeção.
- O DR de 30 mA é obrigatório em áreas molhadas, tomadas externas e cozinhas, lavanderias e garagens.
- Seções mínimas de cobre: 1,5 mm² para iluminação e 2,5 mm² para tomadas.
- Cores: neutro azul-claro; proteção (PE) verde-amarela ou verde.

### Esquemas de aterramento

| Esquema | Como é | Corrente de falta | Proteção típica |
| --- | --- | --- | --- |
| TN-S | Neutro e PE separados desde a fonte | Alta, de curto-circuito | Disjuntor atua rápido; DR complementa |
| TN-C | Neutro e PE no mesmo condutor (PEN) | Alta | Não admite DR |
| TN-C-S | PEN no início, separado depois | Alta | Disjuntor e DR após a separação |
| TT | Massas em eletrodo próprio | Baixa, limitada pelo solo | DR indispensável |
| IT | Fonte isolada ou por alta impedância | Muito baixa na 1ª falta | Dispositivo supervisor de isolamento |

```questao
No esquema de aterramento TN-S, o neutro e o condutor de proteção
*A) são separados em toda a instalação
B) formam um único condutor PEN em toda a instalação
C) são combinados no início e separados depois
D) não existem
> TN-S: S de separado. TN-C usa um só condutor PEN, e TN-C-S começa combinado e depois separa.
```

### Equipotencialização

Toda edificação tem um barramento de equipotencialização principal (BEP). As canalizações metálicas de água, gás e outras utilidades devem ser ligadas a ele. Elas não podem ser usadas como eletrodo de aterramento.

### Queda de tensão

Com a queda unitária q, em V/(A·km): ΔV = q × I × L.

Exemplo: equipamento de 4.400 VA em 220 V puxa 20 A. Com limite de 4%, ΔV = 8,8 V. Com q = 11 V/(A·km), L = 8,8/(11 × 20) = 0,04 km = 40 m.

O limite usual para circuitos terminais é de 4%.

```questao
Um circuito de 220 V tem queda de tensão de 6,6 V até a carga. A queda percentual é
A) 6,6%
*B) 3%
C) 0,3%
D) 33%
> ΔV% = 6,6 / 220 × 100 = 3%.
```

### Neutro rompido

Com o neutro do alimentador rompido e cargas mal distribuídas entre as fases, o ponto neutro se desloca. A fase com menos carga sofre sobretensão, que pode queimar equipamentos.

### Condutores e isolação

| Isolação | Temperatura em serviço | Uso |
| --- | --- | --- |
| PVC | 70 °C | Uso geral |
| EPR | 90 °C | Flexível, para média tensão e ambientes úmidos |
| XLPE | 90 °C | Boa resistência mecânica e térmica |

Na prova de 2023, para um condutor danificado por impactos mecânicos, o gabarito foi XLPE.

### Redes aéreas de 1 kV a 17,5 kV

As redes de distribuição primária de 13,8 kV usam a classe de 15 kV. Os componentes principais são postes, cruzetas, isoladores, chaves fusíveis, para-raios e transformadores de distribuição.

### SPDA (NBR 5419)

| Parte da norma | Assunto |
| --- | --- |
| 1 | Princípios gerais |
| 2 | Gerenciamento de risco |
| 3 | Danos físicos e risco à vida: SPDA externo |
| 4 | Sistemas elétricos e eletrônicos: medidas de proteção contra surtos (MPS) |

O SPDA externo tem captação, descidas e aterramento. Os métodos de captação são ângulo de proteção (Franklin), esfera rolante e malha (gaiola de Faraday). Os níveis de proteção vão de I (mais rigoroso) a IV.

### Armadilhas de prova

- Achar que o esquema TN dispensa o DR.
- Usar a tubulação de água como eletrodo de aterramento.
- Calcular a queda de tensão com a potência em vez da corrente.
