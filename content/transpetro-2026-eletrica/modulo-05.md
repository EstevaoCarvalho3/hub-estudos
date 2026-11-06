Este módulo cobre os itens 1, 5.6 e 5.7 do edital. Em 2023 caiu 1 questão direta, de partida estrela-triângulo, mas o tema aparece em todas as provas antigas.

### Dispositivos de proteção de baixa tensão

| Dispositivo | Protege contra | Observação |
| --- | --- | --- |
| Fusível | Curto-circuito e sobrecarga | Tipo gG uso geral; aM para motores |
| Disjuntor termomagnético | Sobrecarga (térmico) e curto (magnético) | Curva B: 3 a 5 In; C: 5 a 10 In; D: 10 a 20 In |
| Relé térmico | Sobrecarga de motor | Ajustado pela corrente nominal; atua com contator |
| DR | Fuga à terra e choque | 30 mA para proteção de pessoas |
| DPS | Surtos de tensão | Desvia o surto para a terra |

Coordenação pela NBR 5410: Ib ≤ In ≤ Iz e I2 ≤ 1,45·Iz. Ib é a corrente de projeto, In a do disjuntor, Iz a capacidade do condutor e I2 a corrente de atuação garantida.

```questao
O dispositivo DR (diferencial residual) protege principalmente contra
A) sobrecarga do motor
B) curto-circuito entre fases
*C) choque elétrico por fuga de corrente para a terra
D) subtensão da rede
> O DR compara a corrente que vai com a que volta. A diferença indica fuga para a terra, muitas vezes por uma pessoa.
```

### Partida de motores

| Método | Tensão no motor | Corrente e torque de partida | Requisito |
| --- | --- | --- | --- |
| Direta | 100% | Corrente de 6 a 8 In | Motor pequeno ou rede forte |
| Estrela-triângulo | 1/√3 | Ambos caem a 1/3 | 6 terminais; motor em Δ na tensão da rede |
| Compensadora (autotransformador) | Tap k (50, 65 ou 80%) | Caem a k² | Partida com carga moderada |
| Soft-starter | Rampa por tiristores | Ajustáveis | Reduz golpes mecânicos |
| Inversor de frequência | Controle V/f | Partida suave e controle de velocidade | Gera harmônicos |

Exemplo: motor com In = 20 A e corrente de partida de 7,5 In. Em partida direta, a corrente é 150 A. Em estrela-triângulo, cai para 50 A.

```questao
Na partida estrela-triângulo, a corrente de partida fica reduzida a cerca de
A) metade da partida direta
*B) um terço da partida direta
C) √3 vezes a partida direta
D) um quarto da partida direta
> Em estrela cada bobina recebe Vlinha/√3, e a corrente de linha cai para 1/3. O conjugado de partida também cai para 1/3.
```

### Comando e simbologia

O diagrama de força mostra o caminho da energia até o motor. O diagrama de comando mostra a lógica de bobinas, contatos e botoeiras. O unifilar representa o circuito com um traço por circuito; o trifilar mostra cada condutor.

| Letra (IEC) | Componente |
| --- | --- |
| K | Contator ou relé |
| F | Fusível ou relé térmico |
| Q | Disjuntor ou seccionadora |
| S | Botoeira ou chave |
| M | Motor |
| H | Sinaleiro |

Partida direta com selo: o contato auxiliar NA de K1 fica em paralelo com a botoeira de liga. A botoeira de desliga, NF, fica em série.

Reversão de sentido: dois contatores trocam duas fases. Use intertravamento elétrico (contato NF de cada contator em série com a bobina do outro) e, de preferência, mecânico.

### Armadilhas de prova

- Dizer que a estrela-triângulo reduz a corrente pela metade; ela reduz a um terço.
- Usar estrela-triângulo em motor que só tem 3 terminais.
- Confundir relé térmico, que protege o motor, com disjuntor, que protege o circuito.
