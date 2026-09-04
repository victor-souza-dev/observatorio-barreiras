type Page =
  | "visao-geral"
  | "mapa-exposicao"
  | "corredores-transito"
  | "efetividade-barreiras"
  | "cobertura-territorial"
  | "sazonalidade-risco"
  | "radar-anomalias"
  | "detalhamento";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: JSX.Element }[] = [
  {
    id: "visao-geral",
    label: "Visão Geral",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "mapa-exposicao",
    label: "Mapa de Exposição",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    id: "corredores-transito",
    label: "Corredores de Trânsito",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 6l6 6-6 6M21 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    id: "efetividade-barreiras",
    label: "Efetividade das Barreiras",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "cobertura-territorial",
    label: "Cobertura Territorial",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "sazonalidade-risco",
    label: "Sazonalidade do Risco",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "radar-anomalias",
    label: "Radar de Anomalias",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    id: "detalhamento",
    label: "Detalhamento",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside
      style={{
        width: 220,
        minWidth: 220,
        background: "#14211a",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRight: "1px solid #1e3128",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid #1e3128" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: "#2d5a1b",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <div style={{ color: "#ffffff", fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>
              SEAPI
            </div>
            <div style={{ color: "#7a9472", fontSize: 9, lineHeight: 1.3, letterSpacing: "0.03em" }}>
              Secretaria da Agricultura, Pecuária,<br />Produção Sustentável e Irrigação
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#1e3128",
            borderRadius: 6,
            padding: "8px 10px",
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a9e6e" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <div style={{ color: "#a0c4aa", fontSize: 11, fontWeight: 600 }}>Observatório Barreiras RS</div>
            <div style={{ color: "#5a7562", fontSize: 10, marginTop: 1 }}>Inteligência para decisões estratégicas</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <div style={{ fontSize: 10, color: "#4a6050", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 6px 6px" }}>
          Módulos
        </div>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-nav-item${activePage === item.id ? " active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}

        <div style={{ height: 1, background: "#1e3128", margin: "10px 6px" }} />
        <div
          className="sidebar-nav-item"
          style={{ color: "#4a6050" }}
          onClick={() => {}}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>Sobre o Painel</span>
        </div>
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 14px", borderTop: "1px solid #1e3128" }}>
        <div style={{ fontSize: 10, color: "#4a6050", lineHeight: 1.5 }}>
          <div style={{ color: "#5a7562", marginBottom: 3 }}>Última atualização</div>
          <div style={{ color: "#7a9472", fontFamily: "DM Mono, monospace", fontSize: 10 }}>30/05/2025 08:30</div>
          <div style={{ color: "#4a6050", marginTop: 6, fontSize: 9, lineHeight: 1.4 }}>
            Fonte: GTA, Sentinela, SIGSIE,<br />Cognos e bases SEAPI
          </div>
          <div style={{ color: "#3a5040", marginTop: 3, fontSize: 9 }}>*Dados preliminares</div>
        </div>
      </div>
    </aside>
  );
}
