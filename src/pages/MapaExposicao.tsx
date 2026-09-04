import { useState } from "react";
import { municipiosTransitoData } from "../data/mockData";
import type { Filters } from "../App";

function KpiCard({ label, value, delta }: { label: string; value: string; delta?: number }) {
  const hasDelta = delta !== undefined && delta !== 0;
  return (
    <div className="kpi-card">
      <div style={{ fontSize: 10, color: "#6b7268", fontWeight: 500, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#14211a" }}>{value}</div>
      {hasDelta && (
        <div className={delta! > 0 ? "trend-up" : "trend-down"} style={{ marginTop: 4 }}>
          {delta! > 0 ? "▲" : "▼"} {Math.abs(delta!)}% vs. 2024
        </div>
      )}
    </div>
  );
}

export default function MapaExposicao({ filters }: { filters: Filters }) {
  const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null);

  // Filtrar municípios com base no filtro selecionado
  const filteredMunicipios = municipiosTransitoData.filter((m) => {
    if (filters.municipio !== "Todos" && m.municipio !== filters.municipio) return false;
    return true;
  });

  return (
    <div style={{ padding: "16px 20px", height: "100%", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>

      {/* Title */}
      <div>
        <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 20, color: "#14211a", margin: 0 }}>
          Onde está o risco sanitário?
        </h2>
        <p style={{ fontSize: 12, color: "#6b7268", margin: "3px 0 0" }}>
          Mapa de Exposição Sanitária — volume de trânsito animal por município do Rio Grande do Sul
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: "flex", gap: 10 }}>
        <KpiCard label="GTAs Emitidas" value="2,45 Mi" delta={-3.2} />
        <KpiCard label="Animais Movimentados" value="18,72 Mi" delta={6.8} />
        <KpiCard label="Municípios de Origem" value="482" delta={2.1} />
        <KpiCard label="Municípios de Destino" value="479" delta={1.8} />
        <KpiCard label="% Fluxo Interestadual" value="7,4%" delta={5.6} />
        <KpiCard label="% Fluxo Internacional" value="0,87%" delta={8.3} />
      </div>

      {/* Main content */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, flex: 1, minHeight: 0 }}>

        {/* Map */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#14211a" }}>Volume de trânsito animal por município</div>
                <div style={{ fontSize: 11, color: "#9aaa93", marginTop: 1 }}>Tamanho e cor do círculo proporcionais ao número de animais movimentados</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["Bovinos", "Suínos", "Aves", "Todos"].map((e) => (
                  <button key={e} style={{
                    fontSize: 11, padding: "3px 10px", borderRadius: 99, border: "1px solid #d6dbd2",
                    background: e === "Todos" ? "#2d5a1b" : "white",
                    color: e === "Todos" ? "white" : "#6b7268", cursor: "pointer", fontWeight: 500,
                  }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, padding: 12, minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src="https://agenciadenoticias.ibge.gov.br/images/agenciadenoticias/geociencias/2021_11/mapa_89_750px_1.jpg"
              alt="Mapa de Exposição Sanitária - Volume de trânsito animal por município"
              style={{ width: "100%", objectFit: "contain", borderRadius: 8, maxHeight: "100%" }}
            />
          </div>
          <div style={{ padding: "0 14px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: "#9aaa93", fontWeight: 600 }}>Intensidade:</span>
            {[
              { color: "#fde8c8", label: "Baixo" },
              { color: "#f8c87a", label: "" },
              { color: "#f5a635", label: "" },
              { color: "#e07b20", label: "" },
              { color: "#c44d0f", label: "" },
              { color: "#8b1a0a", label: "Alto" },
            ].map((l, i) => (
              <div key={i} style={{ width: 20, height: 10, background: l.color, borderRadius: 2 }} title={l.label} />
            ))}
            <span style={{ fontSize: 10, color: "#9aaa93" }}>• Clique em um município para detalhes</span>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Detail panel */}
          {selectedMunicipio ? (
            <div className="section-card" style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#14211a" }}>{selectedMunicipio}</div>
                <button onClick={() => setSelectedMunicipio(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9aaa93", fontSize: 18 }}>×</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                {[
                  { label: "Animais Movimentados", value: "312.450" },
                  { label: "GTAs Emitidas", value: "1.847" },
                  { label: "Distância à barreira", value: "126 km" },
                  { label: "Prioridade", value: "Alta" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#f6f8f4", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#9aaa93", marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#14211a" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: "#6b7268", lineHeight: 1.5, padding: "10px 12px", background: "#fff8f0", borderRadius: 6, border: "1px solid #fde8c8" }}>
                <strong style={{ color: "#b45309" }}>⚠ Sem barreira no raio de 100km.</strong> Este município apresenta alto volume de trânsito sem cobertura proporcional de fiscalização.
              </div>
            </div>
          ) : (
            <div className="section-card" style={{ padding: 16, background: "#f6f8f4", border: "2px dashed #d6dbd2" }}>
              <div style={{ textAlign: "center", color: "#9aaa93", fontSize: 12, padding: "20px 0" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d6dbd2" strokeWidth="1.5" style={{ margin: "0 auto 8px", display: "block" }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <div style={{ fontWeight: 500, marginBottom: 2 }}>Nenhum município selecionado</div>
                <div>Clique em um município no mapa para ver detalhes</div>
              </div>
            </div>
          )}

          {/* Ranking */}
          <div className="section-card" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div className="section-card-header">
              <div style={{ fontSize: 12, fontWeight: 600, color: "#14211a" }}>10 Municípios com Maior Trânsito sem Fiscalização Proporcional</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {filteredMunicipios.map((m, i) => (
                <div
                  key={i}
                  className="table-row-hover"
                  onClick={() => setSelectedMunicipio(m.municipio)}
                  style={{ padding: "8px 14px", borderBottom: "1px solid #f0f2ee", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
                >
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#9aaa93", width: 16, textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#14211a" }}>{m.municipio}</div>
                    <div style={{ fontSize: 10, color: "#9aaa93" }}>
                      {m.animais.toLocaleString("pt-BR")} animais · {m.distancia} km da barreira
                    </div>
                  </div>
                  <span className={m.prioridade === "Alta" ? "badge-alta" : m.prioridade === "Média" ? "badge-media" : "badge-baixa"}>
                    {m.prioridade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
