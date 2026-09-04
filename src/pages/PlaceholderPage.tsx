export default function PlaceholderPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ padding: "16px 20px", height: "100%", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
      <div>
        <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 20, color: "#14211a", margin: 0 }}>{title}</h2>
        <p style={{ fontSize: 12, color: "#6b7268", margin: "3px 0 0" }}>{subtitle}</p>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderRadius: 10,
          border: "2px dashed #d6dbd2",
          flexDirection: "column",
          gap: 12,
          color: "#9aaa93",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d6dbd2" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Módulo em desenvolvimento</div>
        <div style={{ fontSize: 12 }}>Este painel estará disponível em breve</div>
      </div>
    </div>
  );
}
