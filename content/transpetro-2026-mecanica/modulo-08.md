Cobre o item 14 e a parte de bombas do item 15 do edital. Em 2023 caíram 2 questões: válvulas que regulam e bloqueiam, e escorva de bomba centrífuga. Na prova de Projeto, Construção e Montagem, hidráulica foi um dos temas mais frequentes.

### Hidráulica: força, velocidade e potência

```latex
F = p \cdot A \qquad v = \frac{Q}{A} \qquad P_{hidráulica} = p \cdot Q
```

Exemplo: 100 bar (10 MPa = 10 N/mm²) num cilindro de 2.000 mm² de área geram 20.000 N. Com mesma vazão, um cilindro de área menor anda mais rápido.

O cilindro de dupla ação avança mais devagar do que recua, porque no recuo a haste ocupa parte da área e o óleo enche um volume menor.

| Componente | Função |
| --- | --- |
| Reservatório | Armazena, resfria e decanta o óleo |
| Bomba (engrenagens, palhetas, pistões) | Gera vazão; todas são de deslocamento positivo |
| Válvula de alívio | Limita a pressão máxima do sistema; protege a bomba |
| Válvula direcional | Escolhe o caminho do óleo. 4/3 = 4 vias e 3 posições |
| Válvula de controle de vazão | Ajusta a velocidade do atuador |
| Válvula de retenção | Permite fluxo em um só sentido |
| Acumulador | Guarda energia, absorve picos e mantém pressão |
| Filtro | Protege componentes de partículas; a maioria das falhas hidráulicas vem de contaminação |

```questao
Uma bomba de deslocamento positivo alimenta um cilindro bloqueado no fim de curso. O que protege o sistema contra a pressão excessiva?
A) A válvula de retenção
B) A válvula direcional 4/3
C) O acumulador
D) O filtro de retorno
*E) A válvula de alívio
> Como a bomba de deslocamento positivo continua enviando óleo, a válvula de alívio abre e desvia a vazão para o tanque ao atingir a pressão ajustada.
```

### Pneumática

O ar comprimido passa por compressor, resfriador, secador, reservatório e, antes do uso, pela **unidade de conservação FRL**: filtro, regulador de pressão e lubrificador. A pressão de trabalho típica é de cerca de 6 bar. Por ser compressível, o ar dá velocidade e limpeza, mas pouca precisão de posição e força limitada.

### Bombas

| Tipo | Como funciona | Cuidados |
| --- | --- | --- |
| Centrífuga | O rotor transfere energia cinética ao líquido | Precisa estar cheia de líquido para partir (escorva). Parte com a válvula de descarga fechada para reduzir a potência de partida |
| Deslocamento positivo (engrenagens, parafusos, pistão, diafragma) | Desloca um volume fixo por ciclo | Nunca operar com a descarga fechada; precisa de válvula de alívio |

- **Escorva:** encher a carcaça e a sucção com o líquido para retirar o ar antes da partida.
- **Cavitação:** a pressão na sucção cai abaixo da pressão de vapor, formam-se bolhas que implodem no rotor. Causa ruído de "cascalho", vibração e erosão. Evita-se garantindo NPSH disponível maior que o NPSH requerido.
- **Leis de afinidade** (mesma bomba, mudando a rotação): Q ∝ n, H ∝ n², P ∝ n³.
- **Associação:** em série, somam-se as alturas; em paralelo, as vazões.
- **Vedação do eixo:** gaxeta precisa gotejar um pouco para se refrigerar; selo mecânico não deve vazar.

```questao
Uma bomba centrífuga passa de 1.750 para 3.500 rpm. Pelas leis de afinidade, a potência consumida fica multiplicada por
A) 4
*B) 8
C) 1,5
D) 2
E) 16
> P ∝ n³. Dobrar a rotação multiplica a potência por 2³ = 8. A vazão dobra e a altura quadruplica.
```

### Válvulas industriais

| Válvula | Função principal | Observação |
| --- | --- | --- |
| Gaveta | Bloqueio | Totalmente aberta ou fechada; regular causa erosão |
| Globo | Regulagem | Boa vedação e controle; maior perda de carga |
| Esfera | Bloqueio rápido | Um quarto de volta |
| Borboleta | Bloqueio e regulagem | Compacta, grandes diâmetros |
| Diafragma | Bloqueio e regulagem | Fluidos corrosivos, sujos ou com sólidos |
| Retenção | Impedir o retorno | Portinhola, pistão ou esfera |
| Segurança | Proteger contra sobrepressão em gases e vapor | Abertura total e rápida ("pop") |
| Alívio | Proteger contra sobrepressão em líquidos | Abertura proporcional |

**Golpe de aríete:** pico de pressão quando uma válvula fecha bruscamente e a coluna de líquido para de repente.

### Armadilhas de prova

- Bombas hidráulicas de engrenagens, palhetas e pistões são todas de deslocamento positivo.
- Centrífuga parte com descarga fechada; deslocamento positivo, nunca.
- Cavitação é na **sucção**; golpe de aríete é no fechamento rápido.
- Gaveta não serve para regular vazão.
