Este módulo cobre os itens 6.2 e 6.3 do edital e valeu 3 questões em 2023. A prova pediu identificar Profibus pelas variantes DP e PA, escolher topologia e contar enlaces de malha.

### Topologias

| Topologia | Ligação | Vantagem | Fraqueza |
| --- | --- | --- | --- |
| Barramento | Todos em um cabo | Pouco cabo | Falha no tronco derruba a rede |
| Estrela | Todos em um nó central | Fácil de manter; um cabo ruim afeta um só nó | Depende do nó central |
| Anel | Cada nó liga-se a dois vizinhos | Previsível; pode ter redundância | Anel simples para com uma falha |
| Árvore | Estrelas hierarquizadas | Escala bem | Falha alta afeta o ramo |
| Malha | Nós com vários caminhos | Alta redundância: a rede segue operando | Muitos enlaces |

Na malha completa com n dispositivos, o número de enlaces é n(n − 1)/2. Com 8 dispositivos, são 28.

### Modelo OSI

As camadas são Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação. Redes de campo costumam usar só Física, Enlace e Aplicação.

### Meios físicos

| Meio | Uso | Observação |
| --- | --- | --- |
| Par trançado | Ethernet e RS-485 | Trança e blindagem reduzem ruído |
| Coaxial | Instalações antigas e sinais de RF | Bom contra interferência |
| Fibra óptica | Longas distâncias e áreas com ruído | Imune a interferência eletromagnética |
| RS-485 | Campo, multiponto | Diferencial; exige terminação nas pontas |

### Protocolos do edital

| Protocolo | Traço que identifica |
| --- | --- |
| Ethernet | Rede local; par trançado com até 100 m por segmento, em geral com TCP/IP |
| Profibus DP | Periferia descentralizada; RS-485, até 12 Mbit/s |
| Profibus PA | Automação de processo; 31,25 kbit/s, energia pelo barramento, áreas classificadas |
| Modbus RTU | Mestre-escravo em serial; endereços de 1 a 247; aberto e simples |
| Modbus TCP | Modbus sobre Ethernet |
| HART | Digital FSK sobre o 4–20 mA: 1200 Hz = bit 1, 2200 Hz = bit 0 |
| Foundation Fieldbus H1 | Digital de processo; 31,25 kbit/s; controle pode rodar nos instrumentos |
| Foundation Fieldbus HSE | Rede de alta velocidade sobre Ethernet |

HART é o único da lista que mantém o sinal analógico junto do digital. Por isso entrou fácil em instalações de 4–20 mA.

### Armadilhas de prova

- Confundir DP (manufatura e periferia) com PA (processo).
- Dizer que a malha tem n(n − 1) enlaces. Esse número conta cada enlace duas vezes.
- Associar Foundation Fieldbus H1 a alta velocidade.
- Esquecer que barramento precisa de terminadores.
