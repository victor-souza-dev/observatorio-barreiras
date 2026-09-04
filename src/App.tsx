import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import VisaoGeral from "./pages/VisaoGeral";
import MapaExposicao from "./pages/MapaExposicao";
import CorredoresTransito from "./pages/CorredoresTransito";
import EfetividadeBarreiras from "./pages/EfetividadeBarreiras";
import PlaceholderPage from "./pages/PlaceholderPage";

type Page =
  | "visao-geral"
  | "mapa-exposicao"
  | "corredores-transito"
  | "efetividade-barreiras"
  | "cobertura-territorial"
  | "sazonalidade-risco"
  | "radar-anomalias"
  | "detalhamento";

const PAGE_META: Record<Page, { title: string; subtitle: string }> = {
  "visao-geral": {
    title: "Observatório de Inteligência das Barreiras",
    subtitle: "Risco, Cobertura e Efetividade da Fiscalização Agropecuária",
  },
  "mapa-exposicao": {
    title: "Mapa de Exposição Sanitária",
    subtitle: "Volume de trânsito animal por município — Rio Grande do Sul",
  },
  "corredores-transito": {
    title: "Corredores de Trânsito Animal",
    subtitle: "Análise de fluxo origem-destino por espécie e corredor",
  },
  "efetividade-barreiras": {
    title: "Índice de Efetividade das Barreiras",
    subtitle: "Relação entre volume de abordagens e taxa de irregularidades",
  },
  "cobertura-territorial": {
    title: "Cobertura Territorial",
    subtitle: "Distribuição geográfica da cobertura de fiscalização",
  },
  "sazonalidade-risco": {
    title: "Sazonalidade do Risco",
    subtitle: "Variação sazonal do volume de trânsito animal ao longo do ano",
  },
  "radar-anomalias": {
    title: "Radar de Anomalias",
    subtitle: "Movimentações atípicas e alertas automatizados",
  },
  detalhamento: {
    title: "Detalhamento",
    subtitle: "Consulta detalhada por barreira, município ou GTA",
  },
};

export type Filters = { periodo: string; especie: string; regiao: string; municipio: string };

const DEFAULT_FILTERS: Filters = { periodo: "01/01/2025–31/05/2025", especie: "Todos", regiao: "Todos", municipio: "Todos" };

export default function App() {
  const [activePage, setActivePage] = useState<Page>("visao-geral");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const meta = PAGE_META[activePage];

  const renderPage = () => {
    switch (activePage) {
      case "visao-geral":
        return <VisaoGeral onNavigate={(p) => setActivePage(p as Page)} filters={filters} />;
      case "mapa-exposicao":
        return <MapaExposicao filters={filters} />;
      case "corredores-transito":
        return <CorredoresTransito filters={filters} />;
      case "efetividade-barreiras":
        return <EfetividadeBarreiras filters={filters} />;
      default:
        return <PlaceholderPage title={meta.title} subtitle={meta.subtitle} />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden", fontFamily: "Source Sans 3, DM Sans, sans-serif" }}>
      <Sidebar activePage={activePage} onNavigate={(p) => setActivePage(p as Page)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          filters={filters}
          onFiltersChange={setFilters}
          defaultFilters={DEFAULT_FILTERS}
        />

        <main style={{ flex: 1, overflow: "hidden", background: "#f2f3f0" }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
