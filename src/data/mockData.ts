export const kpiData = {
  gtasEmitidas: { value: "2,45 Mi", delta: -3.2, label: "GTAs Emitidas" },
  animaisMovimentados: { value: "18,72 Mi", delta: 6.8, label: "Animais Movimentados" },
  municipiosOrigem: { value: "482", delta: 2.1, label: "Municípios de Origem" },
  municipiosDestino: { value: "479", delta: 1.8, label: "Municípios de Destino" },
  fluxoInterestadual: { value: "1,38 Mi", delta: 5.6, label: "Fluxos Interestaduais" },
  fluxoInternacional: { value: "162 Mil", delta: 8.3, label: "Fluxos Internacionais" },
  barreiraAtivas: { value: "32", delta: 0, label: "Barreiras Ativas" },
};

export const municipiosTransitoData = [
  { municipio: "Uruguaiana", animais: 312450, distancia: 126, prioridade: "Alta" },
  { municipio: "Dom Pedrito", animais: 298104, distancia: 112, prioridade: "Alta" },
  { municipio: "Tapes", animais: 245711, distancia: 108, prioridade: "Alta" },
  { municipio: "Rosário do Sul", animais: 201153, distancia: 96, prioridade: "Média" },
  { municipio: "Canguçu", animais: 189332, distancia: 94, prioridade: "Média" },
  { municipio: "Pinheiro Machado", animais: 167845, distancia: 83, prioridade: "Média" },
  { municipio: "São Gabriel", animais: 154291, distancia: 74, prioridade: "Média" },
  { municipio: "Bagé", animais: 142778, distancia: 61, prioridade: "Baixa" },
  { municipio: "Alegrete", animais: 138940, distancia: 48, prioridade: "Baixa" },
  { municipio: "Santana do Livramento", animais: 131205, distancia: 38, prioridade: "Baixa" },
];

export const corredoresData = [
  { origem: "Uruguaiana", destino: "Alegrete", especie: "Bovinos", volume: 1860000, variacao: 4.2, cobertura: "Sim" },
  { origem: "Santana do Livramento", destino: "Uruguaiana", especie: "Bovinos", volume: 1420000, variacao: -1.3, cobertura: "Parcial" },
  { origem: "Alegrete", destino: "Santa Maria", especie: "Bovinos", volume: 1180000, variacao: 7.1, cobertura: "Sim" },
  { origem: "Bagé", destino: "Pelotas", especie: "Bovinos", volume: 980000, variacao: 2.8, cobertura: "Parcial" },
  { origem: "Cruz Alta", destino: "Passo Fundo", especie: "Bovinos", volume: 820000, variacao: -4.5, cobertura: "Não" },
  { origem: "Cachoeira do Sul", destino: "Santa Maria", especie: "Suínos", volume: 710000, variacao: 12.3, cobertura: "Sim" },
  { origem: "Erechim", destino: "Passo Fundo", especie: "Suínos", volume: 650000, variacao: 8.7, cobertura: "Sim" },
  { origem: "Ijuí", destino: "Santa Rosa", especie: "Aves", volume: 610000, variacao: -2.1, cobertura: "Parcial" },
  { origem: "Pelotas", destino: "Porto Alegre", especie: "Bovinos", volume: 580000, variacao: 1.4, cobertura: "Sim" },
  { origem: "Santa Maria", destino: "Porto Alegre", especie: "Suínos", volume: 540000, variacao: 6.9, cobertura: "Sim" },
];

export const barreiraData = [
  { barreira: "Barreira Quaraí", abordagens: 18452, irregularidades: 412, efetividade: 2.23, tendencia: "up", lat: -30.38, lng: -56.45 },
  { barreira: "Barreira Iraí", abordagens: 9871, irregularidades: 174, efetividade: 1.76, tendencia: "up", lat: -27.19, lng: -53.24 },
  { barreira: "Barreira Palmeira das Missões", abordagens: 7632, irregularidades: 104, efetividade: 1.36, tendencia: "down", lat: -27.90, lng: -53.31 },
  { barreira: "Barreira São Borja", abordagens: 12104, irregularidades: 138, efetividade: 1.14, tendencia: "up", lat: -28.66, lng: -55.97 },
  { barreira: "Barreira Vacaria", abordagens: 6558, irregularidades: 60, efetividade: 0.91, tendencia: "down", lat: -28.51, lng: -50.93 },
  { barreira: "Barreira Bagé", abordagens: 23221, irregularidades: 183, efetividade: 0.79, tendencia: "down", lat: -31.33, lng: -54.10 },
  { barreira: "Barreira Alegrete", abordagens: 16754, irregularidades: 121, efetividade: 0.72, tendencia: "neutral", lat: -29.78, lng: -55.79 },
  { barreira: "Barreira Osório", abordagens: 14302, irregularidades: 71, efetividade: 0.50, tendencia: "down", lat: -29.88, lng: -50.27 },
  { barreira: "Barreira Caxias do Sul", abordagens: 11240, irregularidades: 43, efetividade: 0.38, tendencia: "neutral", lat: -29.16, lng: -51.17 },
  { barreira: "Barreira Pelotas", abordagens: 19880, irregularidades: 67, efetividade: 0.34, tendencia: "down", lat: -31.77, lng: -52.34 },
  { barreira: "Barreira Porto Alegre", abordagens: 28400, irregularidades: 89, efetividade: 0.31, tendencia: "neutral", lat: -30.03, lng: -51.23 },
  { barreira: "Barreira Lajeado", abordagens: 8920, irregularidades: 21, efetividade: 0.24, tendencia: "down", lat: -29.46, lng: -51.96 },
];

export const sazonalidadeData = [
  { mes: "Jan", bovinos: 1820, suinos: 680, aves: 420, ovinos: 180 },
  { mes: "Fev", bovinos: 1650, suinos: 710, aves: 390, ovinos: 165 },
  { mes: "Mar", bovinos: 2100, suinos: 760, aves: 510, ovinos: 220 },
  { mes: "Abr", bovinos: 2380, suinos: 790, aves: 580, ovinos: 260 },
  { mes: "Mai", bovinos: 2650, suinos: 820, aves: 540, ovinos: 290 },
  { mes: "Jun", bovinos: 3100, suinos: 870, aves: 460, ovinos: 240 },
  { mes: "Jul", bovinos: 3420, suinos: 910, aves: 430, ovinos: 210 },
  { mes: "Ago", bovinos: 3280, suinos: 880, aves: 510, ovinos: 195 },
  { mes: "Set", bovinos: 2890, suinos: 840, aves: 620, ovinos: 175 },
  { mes: "Out", bovinos: 2560, suinos: 810, aves: 780, ovinos: 160 },
  { mes: "Nov", bovinos: 2210, suinos: 770, aves: 650, ovinos: 145 },
  { mes: "Dez", bovinos: 1940, suinos: 720, aves: 510, ovinos: 135 },
];

export const anomaliasData = [
  { tipo: "Aumento atípico", descricao: "Aumento de 185% no volume de GTAs (últimos 30 dias)", municipio: "São Francisco de Assis", variacao: "+185%", severity: "alta" },
  { tipo: "Rota incomum", descricao: "Rota não utilizada nos últimos 12 meses", municipio: "Jaguarão → Passo Fundo", variacao: "Novo fluxo", severity: "media" },
  { tipo: "Espécie fora do padrão", descricao: "Movimentação de suínos acima da média histórica", municipio: "Iraí", variacao: "+142%", severity: "alta" },
  { tipo: "Origem atípica", descricao: "Aumento de origem de GTAs fora do RS", municipio: "Cacequi", variacao: "+96%", severity: "media" },
  { tipo: "Destino atípico", descricao: "Aumento de destino interestadual", municipio: "Lavras do Sul", variacao: "+78%", severity: "baixa" },
];

// Rio Grande do Sul municipalities approximate data for heatmap
export const municipiosHeatmap = [
  // Northwest - Alta densidade
  { id: "santa-rosa", nome: "Santa Rosa", x: 140, y: 100, intensity: 5, animais: 620000 },
  { id: "tres-passos", nome: "Três Passos", x: 160, y: 115, intensity: 4, animais: 480000 },
  { id: "sao-luiz-gonzaga", nome: "São Luiz Gonzaga", x: 200, y: 120, intensity: 4, animais: 510000 },
  { id: "santo-angelo", nome: "Santo Ângelo", x: 175, y: 130, intensity: 5, animais: 680000 },
  { id: "santa-maria", nome: "Santa Maria", x: 230, y: 195, intensity: 5, animais: 890000 },
  { id: "cruz-alta", nome: "Cruz Alta", x: 215, y: 150, intensity: 4, animais: 560000 },
  { id: "ijui", nome: "Ijuí", x: 190, y: 145, intensity: 4, animais: 520000 },

  // Northeast
  { id: "erechim", nome: "Erechim", x: 230, y: 95, intensity: 4, animais: 470000 },
  { id: "passo-fundo", nome: "Passo Fundo", x: 255, y: 120, intensity: 5, animais: 720000 },
  { id: "caxias-do-sul", nome: "Caxias do Sul", x: 310, y: 145, intensity: 3, animais: 340000 },
  { id: "bento-goncalves", nome: "Bento Gonçalves", x: 295, y: 160, intensity: 3, animais: 310000 },

  // Center
  { id: "cachoeira-do-sul", nome: "Cachoeira do Sul", x: 265, y: 200, intensity: 4, animais: 530000 },
  { id: "lajeado", nome: "Lajeado", x: 285, y: 175, intensity: 3, animais: 380000 },
  { id: "santa-cruz-do-sul", nome: "Santa Cruz do Sul", x: 280, y: 190, intensity: 3, animais: 360000 },

  // West border (high intensity)
  { id: "uruguaiana", nome: "Uruguaiana", x: 120, y: 235, intensity: 6, animais: 1860000 },
  { id: "sao-borja", nome: "São Borja", x: 145, y: 185, intensity: 5, animais: 810000 },
  { id: "alegrete", nome: "Alegrete", x: 160, y: 225, intensity: 6, animais: 1420000 },
  { id: "rosario-do-sul", nome: "Rosário do Sul", x: 195, y: 255, intensity: 5, animais: 780000 },
  { id: "sao-gabriel", nome: "São Gabriel", x: 215, y: 240, intensity: 5, animais: 730000 },

  // South
  { id: "santana-livramento", nome: "Santana do Livramento", x: 165, y: 285, intensity: 6, animais: 1380000 },
  { id: "dom-pedrito", nome: "Dom Pedrito", x: 200, y: 295, intensity: 5, animais: 690000 },
  { id: "bage", nome: "Bagé", x: 235, y: 305, intensity: 5, animais: 640000 },
  { id: "quarai", nome: "Quaraí", x: 145, y: 310, intensity: 5, animais: 580000 },
  { id: "jaguarao", nome: "Jaguarão", x: 245, y: 335, intensity: 4, animais: 430000 },

  // Southeast
  { id: "pelotas", nome: "Pelotas", x: 280, y: 330, intensity: 4, animais: 490000 },
  { id: "rio-grande", nome: "Rio Grande", x: 295, y: 355, intensity: 3, animais: 280000 },
  { id: "cangucu", nome: "Canguçu", x: 265, y: 315, intensity: 4, animais: 450000 },

  // Porto Alegre metro
  { id: "porto-alegre", nome: "Porto Alegre", x: 315, y: 240, intensity: 3, animais: 320000 },
  { id: "novo-hamburgo", nome: "Novo Hamburgo", x: 320, y: 225, intensity: 2, animais: 210000 },

  // Coast
  { id: "osorio", nome: "Osório", x: 335, y: 210, intensity: 2, animais: 190000 },
  { id: "torres", nome: "Torres", x: 355, y: 185, intensity: 2, animais: 170000 },

  // Extra
  { id: "frederico-westphalen", nome: "Frederico Westphalen", x: 200, y: 110, intensity: 3, animais: 350000 },
  { id: "tapes", nome: "Tapes", x: 310, y: 265, intensity: 3, animais: 330000 },
  { id: "camaqua", nome: "Camaquã", x: 295, y: 280, intensity: 3, animais: 300000 },
];
