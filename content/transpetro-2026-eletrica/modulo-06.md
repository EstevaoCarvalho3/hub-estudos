Este módulo cobre o item 7 do edital e valeu 4 questões em 2023. A banca pergunta qual instrumento serve para qual ensaio.

### Instrumentos

| Instrumento | Mede ou faz | Como ligar ou usar |
| --- | --- | --- |
| Voltímetro | Tensão | Em paralelo, com resistência interna alta |
| Amperímetro | Corrente | Em série, com resistência interna baixa |
| Alicate amperímetro | Corrente sem abrir o circuito | Abraça um só condutor |
| Wattímetro | Potência ativa | Bobina de corrente em série e de tensão em paralelo |
| Megôhmetro (megger) | Resistência de isolação, em MΩ | Aplica tensão CC alta, de 500 V a 5 kV, com o equipamento desenergizado |
| HIPOT | Tensão aplicada ao dielétrico e corrente de fuga | Fonte CA ou CC de alta tensão |
| Microhmímetro | Resistências muito baixas | Contatos de disjuntores e conexões |
| Terrômetro | Resistência de aterramento | Método da queda de potencial, com estaca a 62% da distância |
| Sequencímetro | Sequência de fases | Antes de ligar motores |
| Câmera termográfica | Pontos quentes | Manutenção preditiva |

Índice de polarização (IP) = resistência de isolação aos 10 minutos / resistência a 1 minuto. Um IP abaixo de 1 indica isolação comprometida; acima de 2 é considerado bom.

```questao
Para medir a corrente de um circuito, o amperímetro deve ser ligado
A) em paralelo com a carga
*B) em série com a carga
C) entre fase e terra
D) em paralelo com a fonte
> O amperímetro entra em série e tem resistência interna muito baixa. Em paralelo, ele vira um curto-circuito.
```

### Transformadores de instrumento

- **TC:** reproduz a corrente do primário no secundário, isolado e em proporção conhecida, em geral 5 A ou 1 A. Nunca abra o secundário com o primário energizado: surge tensão perigosa.
- **TP:** reproduz a tensão, em geral 115 V no secundário. Nunca coloque o secundário em curto.

### Grandezas e SI

Unidades de base: metro, quilograma, segundo, ampere, kelvin, mol e candela. Derivadas elétricas: volt, ohm, watt, joule, coulomb, farad, henry, tesla e weber. Símbolos não têm plural nem ponto.

### Retificadores

| Retificador | Tensão média ideal |
| --- | --- |
| Monofásico meia onda | Vp/π ≈ 0,45·Vef |
| Monofásico onda completa | 2Vp/π ≈ 0,9·Vef |
| Trifásico em ponte (6 pulsos) | ≈ 1,35·VL |

### Baterias

Baterias em série somam tensão; em paralelo, somam capacidade (Ah). Exemplo: dois conjuntos em paralelo, cada um com 4 baterias de 12 V e 100 Ah em série, formam um banco de 48 V e 200 Ah.

A célula de chumbo-ácido tem 2 V nominais. A autonomia aproximada é a energia do banco (V × Ah) dividida pela potência da carga, descontado o rendimento do inversor.

```questao
Duas baterias de 12 V e 60 Ah ligadas em série formam um banco de
A) 12 V e 120 Ah
*B) 24 V e 60 Ah
C) 24 V e 120 Ah
D) 12 V e 60 Ah
> Em série as tensões se somam e a capacidade continua a mesma. Em paralelo seria o contrário: 12 V e 120 Ah.
```

### No-breaks (UPS)

| Tipo | Funcionamento normal | Na falta da rede |
| --- | --- | --- |
| Off-line (standby) | Carga alimentada direto pela rede, sem tratamento | Transfere para o inversor, com pequeno tempo de comutação |
| Line-interactive | Rede com regulação de tensão | Transfere para o inversor |
| On-line de dupla conversão | Retificador e inversor alimentam sempre a carga | Sem transferência: a bateria já está no caminho |

### Armadilhas de prova

- Trocar megôhmetro (isolação) por microhmímetro (contatos).
- Abrir o secundário de um TC energizado.
- Somar a capacidade em Ah de baterias ligadas em série.
