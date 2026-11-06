Cobre os itens 13 e 20 do edital. Em 2023 caíram 4 questões: velocidade de corte no torno, processo para engrenagens helicoidais, defeito de perfil de solda e simbologia de solda.

### Conformação mecânica

| Processo | Como | Produto típico |
| --- | --- | --- |
| Laminação | Passa entre cilindros que giram | Chapas, barras, perfis, trilhos |
| Forjamento | Golpes de martelo ou prensa | Virabrequins, ganchos, flanges; orienta as fibras e aumenta a resistência |
| Trefilação | O material é **puxado** através de uma fieira | Arames e barras finas |
| Extrusão | O material é **empurrado** através de uma matriz | Perfis de alumínio, tubos |
| Estampagem | Corte, dobra e embutimento de chapas | Carcaças, painéis |

A quente (acima da temperatura de recristalização) exige menos força. A frio encrua o material: aumenta a dureza e a resistência e reduz a ductilidade.

### Usinagem

```latex
V_c = \frac{\pi\, D\, n}{1000} \quad (V_c \text{ em m/min, } D \text{ em mm, } n \text{ em rpm})
```

Exemplo: peça de 40 mm a 800 rpm. Vc = 3,14 × 40 × 800 / 1000 ≈ 100 m/min.

| Processo | Movimento principal | Usos |
| --- | --- | --- |
| Torneamento | A peça gira | Superfícies cilíndricas, cônicas, roscas, faceamento |
| Fresamento | A ferramenta gira | Planos, rasgos, canais de chaveta, engrenagens |
| Furação | A broca gira e avança | Furos; ângulo de ponta de 118° para aço |
| Retificação | Rebolo abrasivo | Acabamento fino e tolerâncias apertadas, inclusive em peças temperadas |
| Mandrilamento | Ferramenta ajusta furos | Furos precisos e grandes |
| Aplainamento | Movimento alternativo | Superfícies planas e rasgos longos |

Ferramentas, da menos para a mais dura: aço rápido (HSS), metal duro, cerâmica, CBN e diamante. O fluido de corte refrigera, lubrifica e retira cavaco.

```questao
Uma barra de 50 mm de diâmetro deve ser torneada com velocidade de corte de 150 m/min. Usando π = 3, a rotação é de
A) 500 rpm
B) 9.000 rpm
C) 3.000 rpm
*D) 1.000 rpm
E) 1.500 rpm
> n = 1000 × Vc / (π D) = 1000 × 150 / (3 × 50) = 150.000 / 150 = 1.000 rpm.
```

### Processos de soldagem

| Processo | Sigla | Destaque |
| --- | --- | --- |
| Eletrodo revestido | SMAW | Versátil e barato; o revestimento estabiliza o arco, protege e forma escória |
| TIG | GTAW | Eletrodo de tungstênio **não consumível** e gás inerte (argônio). Alta qualidade; passe de raiz em tubulação |
| MIG/MAG | GMAW | Arame contínuo. MIG com gás inerte; MAG com gás ativo (CO₂ ou misturas) |
| Arame tubular | FCAW | Fluxo dentro do arame; alta produtividade |
| Arco submerso | SAW | Arco coberto por fluxo granulado; alta deposição, posição plana |
| Oxiacetilênica | OFW | Chama de oxigênio e acetileno; também usada para corte |

**Zona termicamente afetada (ZTA):** região do metal base que não fundiu, mas mudou de estrutura com o calor. Pré-aquecimento reduz o risco de trinca em aços temperáveis; o tratamento de alívio de tensões vem depois da soldagem.

### Juntas, chanfros e símbolos

Juntas: de topo, em ângulo (T), sobreposta, de canto e de aresta. Chanfros: em V, meio-V, X, U, J e K, conforme a espessura e o acesso.

Na simbologia AWS: o símbolo **abaixo** da linha de referência indica solda do **lado da seta**; **acima**, do outro lado. Uma bandeira indica solda de campo; um círculo, solda em todo o contorno; o triângulo é a solda de filete.

| Defeito | O que é |
| --- | --- |
| Porosidade | Bolhas de gás presas no cordão |
| Inclusão de escória | Escória presa entre passes |
| Falta de fusão | O metal depositado não fundiu com o metal base ou com o passe anterior |
| Falta de penetração | A solda não atingiu a raiz da junta |
| Mordedura | Sulco no metal base, na margem do cordão |
| Convexidade excessiva | Reforço exagerado no filete |
| Perna ou garganta insuficiente | Filete menor que o especificado |
| Trinca | O mais grave; não é aceitável |

```questao
Qual processo usa eletrodo de tungstênio não consumível e proteção por gás inerte?
A) Arco submerso
*B) TIG
C) Arame tubular
D) MAG
E) Eletrodo revestido
> No TIG o tungstênio só mantém o arco; o metal de adição, quando existe, entra por uma vareta separada.
```

### Armadilhas de prova

- Trefilar é puxar; extrudar é empurrar.
- Na fórmula de Vc, o diâmetro está em mm e a divisão por 1000 converte para metros.
- Engrenagens helicoidais são produzidas por fresamento, não por torneamento.
- No símbolo de solda, abaixo da linha é o lado da seta.
