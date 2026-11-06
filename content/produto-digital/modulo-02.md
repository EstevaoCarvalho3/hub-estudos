**Uma métrica só é útil se muda uma decisão.** Visitas e cadastros fazem bem ao ego, mas o que mostra se o produto funciona é quantas pessoas voltam e quantas pagam.

### Métricas de vaidade e métricas de decisão

| Vaidade | Por que engana | Troque por |
| --- | --- | --- |
| Total de cadastros | Só cresce, mesmo se ninguém usa | Usuários ativos na semana |
| Visualizações de página | Uma pessoa perdida gera muitas | Pessoas que completaram a primeira sessão de estudo |
| Seguidores | Não estudam nem pagam | Visitantes que viraram usuários |

### O funil AARRR

Dave McClure organizou as métricas de uma startup em cinco etapas, apelidadas de "métricas pirata" pela sigla:

| Etapa | Pergunta | Exemplo no Hub |
| --- | --- | --- |
| Aquisição | As pessoas chegam? | Visitas vindas de um vídeo ou indicação |
| Ativação | Tiveram uma boa primeira experiência? | Responderam o primeiro teste rápido e revisaram cartões no primeiro dia |
| Retenção | Voltam? | Estudaram de novo na semana seguinte |
| Indicação | Chamam outras pessoas? | Convidaram um colega |
| Receita | Pagam? | Assinaram o plano completo |

Trabalhe na etapa mais fraca. Não adianta trazer mais gente (aquisição) se quase ninguém volta (retenção): é encher um balde furado.

### Retenção e coortes

**Coorte** é um grupo de pessoas que começou no mesmo período. Em vez de olhar "usuários ativos hoje", você acompanha cada grupo separadamente: dos que entraram na semana 1, quantos voltaram na semana 2, 3, 4?

- **D1, D7 e D30:** a porcentagem que voltou 1, 7 e 30 dias depois do primeiro uso.
- **Curva de retenção:** sempre cai no começo. O que importa é ela **achatar** em algum ponto, sinal de que um grupo fiel ficou.
- **Churn:** a porcentagem de assinantes que cancela em um período. É o inverso da retenção de quem paga.

```questao
Uma curva de retenção cai nas primeiras semanas e depois fica estável em 25%. Isso indica que
A) o produto fracassou, porque 75% saíram
*B) há um grupo fiel que continua usando, o que é um bom sinal
C) é preciso investir mais em anúncios imediatamente
D) a métrica está errada, porque retenção nunca cai
> Toda curva cai no início. Achatar significa que existe um núcleo de pessoas para quem o produto tem valor.
```

### Economia da assinatura

| Sigla | O que é | Conta simplificada |
| --- | --- | --- |
| MRR | Receita recorrente mensal | Assinantes × preço mensal |
| Churn | Taxa de cancelamento mensal | Cancelados no mês ÷ assinantes no início do mês |
| LTV | Quanto um cliente rende ao longo da vida | Preço mensal ÷ churn mensal |
| CAC | Custo para conquistar um cliente pagante | Gasto com marketing ÷ novos clientes |

Exemplo: assinatura de R$ 15 por mês com churn de 10% ao mês. O cliente fica, em média, 1 ÷ 0,10 = 10 meses, e o LTV é R$ 150. Se cada cliente custa R$ 30 em anúncios, a relação LTV/CAC é 5.

Uma regra prática comum é manter **LTV/CAC de pelo menos 3**. Abaixo disso, o marketing come o lucro. Muito acima pode indicar que você está investindo pouco em crescer.

```questao
Um app cobra R$ 20 por mês e tem churn mensal de 5%. Pela conta simplificada, o LTV é
A) R$ 100
B) R$ 200
*C) R$ 400
D) R$ 20
> O cliente fica em média 1 ÷ 0,05 = 20 meses. LTV = R$ 20 × 20 = R$ 400.
```

### Métrica norte

A métrica norte (*North Star metric*) é o número que melhor representa o valor entregue ao usuário. Ela orienta o time inteiro. Para um site de estudos, um bom candidato é **minutos de estudo ativo por semana** ou **dias com a meta cumprida por usuário**. Receita é consequência, não métrica norte.

### No seu Hub

1. Defina o que é um usuário ativado. Sugestão: no primeiro dia, a pessoa respondeu um teste rápido e revisou cartões.
2. Escolha a métrica norte e escreva por que ela mostra valor para o aluno.
3. Na fase com amigos, anote numa planilha, por pessoa, os dias em que estudou. Ao fim de 4 semanas, desenhe a curva de retenção.
