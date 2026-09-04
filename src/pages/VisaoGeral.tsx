import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip,
  ResponsiveContainer, Legend
} from "recharts";
import {
  kpiData, municipiosTransitoData, corredoresData, barreiraData,
  sazonalidadeData, anomaliasData
} from "../data/mockData";
import type { Filters } from "../App";

function KpiCard({ label, value, delta, icon }: { label: string; value: string; delta?: number; icon: JSX.Element }) {
  const hasDelta = delta !== undefined && delta !== 0;
  return (
    <div className="kpi-card" style={{ minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div style={{ fontSize: 11, color: "#6b7268", fontWeight: 500, marginBottom: 4, letterSpacing: "0.02em" }}>{label}</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#14211a", lineHeight: 1 }}>{value}</div>
          {hasDelta && (
            <div className={delta > 0 ? "trend-up" : "trend-down"} style={{ marginTop: 4 }}>
              {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}% vs. mesmo período 2024
            </div>
          )}
          {delta === 0 && <div className="trend-neutral" style={{ marginTop: 4 }}>no período selecionado</div>}
        </div>
        <div style={{ color: "#9aaa93", flexShrink: 0, marginTop: 2 }}>{icon}</div>
      </div>
    </div>
  );
}

const GtaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="16" x2="12" y2="16"/>
  </svg>
);
const AnimalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const FluxoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);
const GlobalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const BarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="9" y2="15"/><line x1="12" y1="6" x2="12" y2="15"/><line x1="15" y1="11" x2="15" y2="15"/>
  </svg>
);

export default function VisaoGeral({ onNavigate, filters }: { onNavigate: (page: string) => void; filters: Filters }) {
  const [showBarreiras, setShowBarreiras] = useState(true);

  // Filtrar dados com base nos filtros selecionados
  const filteredCorredores = corredoresData.filter((c) => {
    if (filters.especie !== "Todos" && c.especie !== filters.especie) return false;
    return true;
  });

  const filteredMunicipios = municipiosTransitoData.filter((m) => {
    if (filters.municipio !== "Todos" && m.municipio !== filters.municipio) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "16px 20px", height: "100%", overflowY: "auto" }}>

      {/* KPI Row */}
      <div style={{ display: "flex", gap: 10 }}>
        <KpiCard label={kpiData.gtasEmitidas.label} value={kpiData.gtasEmitidas.value} delta={kpiData.gtasEmitidas.delta} icon={<GtaIcon />} />
        <KpiCard label={kpiData.animaisMovimentados.label} value={kpiData.animaisMovimentados.value} delta={kpiData.animaisMovimentados.delta} icon={<AnimalIcon />} />
        <KpiCard label={kpiData.municipiosOrigem.label} value={kpiData.municipiosOrigem.value} delta={kpiData.municipiosOrigem.delta} icon={<MapPinIcon />} />
        <KpiCard label={kpiData.municipiosDestino.label} value={kpiData.municipiosDestino.value} delta={kpiData.municipiosDestino.delta} icon={<MapPinIcon />} />
        <KpiCard label={kpiData.fluxoInterestadual.label} value={kpiData.fluxoInterestadual.value} delta={kpiData.fluxoInterestadual.delta} icon={<FluxoIcon />} />
        <KpiCard label={kpiData.fluxoInternacional.label} value={kpiData.fluxoInternacional.value} delta={kpiData.fluxoInternacional.delta} icon={<GlobalIcon />} />
        <KpiCard label={kpiData.barreiraAtivas.label} value={kpiData.barreiraAtivas.value} delta={kpiData.barreiraAtivas.delta} icon={<BarIcon />} />
      </div>

      {/* Row 1: Map + Corredores + Barreiras */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 14 }}>

        {/* 1. Mapa */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#7a9472", fontWeight: 600, marginBottom: 1 }}>1. Mapa de Exposição Sanitária</div>
              <div style={{ fontSize: 11, color: "#9aaa93" }}>Volume de animais movimentados por município</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <label style={{ fontSize: 11, color: "#6b7268", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <span style={{ fontSize: 10 }}>Exibir barreiras</span>
                <div
                  onClick={() => setShowBarreiras(!showBarreiras)}
                  style={{
                    width: 28, height: 16, borderRadius: 99, background: showBarreiras ? "#2d5a1b" : "#c8d0c0",
                    position: "relative", cursor: "pointer", transition: "background 0.2s",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 2, left: showBarreiras ? 14 : 2, width: 12, height: 12,
                    borderRadius: 99, background: "white", transition: "left 0.2s",
                  }} />
                </div>
              </label>
            </div>
          </div>
          <div style={{ flex: 1, padding: "8px 12px 12px", minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src="/mapa-exposicao.png"
              alt="Mapa de Exposição Sanitária - Volume de animais movimentados por município"
              style={{ width: "100%", objectFit: "contain", borderRadius: 6, cursor: "pointer", maxHeight: "100%" }}
              onClick={() => onNavigate("mapa-exposicao")}
            />
          </div>
          {/* Legend */}
          <div style={{ padding: "0 14px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "#9aaa93" }}>Animais Movimentados</span>
            {[
              { label: "Até 10 mil", color: "#fde8c8" },
              { label: "10–50 mil", color: "#f8c87a" },
              { label: "50–100 mil", color: "#f5a635" },
              { label: "100–500 mil", color: "#e07b20" },
              { label: "+500 mil", color: "#8b1a0a" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color, border: "1px solid rgba(0,0,0,0.1)" }} />
                <span style={{ fontSize: 9, color: "#9aaa93" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Corredores */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#7a9472", fontWeight: 600, marginBottom: 1 }}>2. Corredores de Trânsito Animal</div>
              <div style={{ fontSize: 11, color: "#9aaa93" }}>Principais corredores por volume movimentado</div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#f6f8f4" }}>
                  <th style={{ padding: "7px 14px", textAlign: "left", fontWeight: 600, fontSize: 10, color: "#6b7268", letterSpacing: "0.04em" }}>#</th>
                  <th style={{ padding: "7px 8px", textAlign: "left", fontWeight: 600, fontSize: 10, color: "#6b7268", letterSpacing: "0.04em" }}>Corredor</th>
                  <th style={{ padding: "7px 8px", textAlign: "center", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Espécie</th>
                  <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Animais</th>
                  <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>% Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredCorredores.slice(0, 8).map((c, i) => {
                  const pct = (c.volume / 18720000 * 100).toFixed(1);
                  return (
                    <tr key={i} className="table-row-hover" style={{ borderTop: "1px solid #f0f2ee", cursor: "pointer" }}>
                      <td style={{ padding: "7px 14px", color: "#9aaa93", fontFamily: "DM Mono, monospace", fontSize: 11 }}>{i + 1}</td>
                      <td style={{ padding: "7px 8px", color: "#1a1f1b" }}>
                        <span style={{ fontWeight: 500 }}>{c.origem}</span>
                        <span style={{ color: "#9aaa93", margin: "0 4px" }}>→</span>
                        <span style={{ fontWeight: 500 }}>{c.destino}</span>
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "center", fontSize: 14 }}>
                        {c.especie === "Bovinos" ? "🐄" : c.especie === "Suínos" ? "🐷" : "🐔"}
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "right", fontFamily: "DM Mono, monospace", fontSize: 11, color: "#1a1f1b" }}>
                        {(c.volume / 1000000).toFixed(2).replace(".", ",")} Mi
                      </td>
                      <td style={{ padding: "7px 14px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                          <div style={{ width: 36, height: 6, background: "#e8ede4", borderRadius: 99 }}>
                            <div style={{ width: `${Math.min(100, parseFloat(pct) * 7)}%`, height: "100%", background: "#2d5a1b", borderRadius: 99 }} />
                          </div>
                          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#6b7268" }}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "10px 14px", borderTop: "1px solid #f0f2ee" }}>
            <button
              onClick={() => onNavigate("corredores-transito")}
              style={{ fontSize: 12, color: "#2d5a1b", background: "none", border: "1px solid #2d5a1b", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontWeight: 500 }}
            >
              Ver todos os corredores
            </button>
          </div>
        </div>

        {/* 3. Índice de Efetividade */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header">
            <div style={{ fontSize: 12, color: "#7a9472", fontWeight: 600, marginBottom: 1 }}>3. Índice de Efetividade das Barreiras</div>
            <div style={{ fontSize: 11, color: "#9aaa93" }}>Ranking por taxa de irregularidades</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#f6f8f4" }}>
                  <th style={{ padding: "7px 10px", textAlign: "left", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>#</th>
                  <th style={{ padding: "7px 8px", textAlign: "left", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Barreira</th>
                  <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Fiscaliz.</th>
                  <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Irreg.</th>
                  <th style={{ padding: "7px 10px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Taxa</th>
                </tr>
              </thead>
              <tbody>
                {barreiraData.slice(0, 8).map((b, i) => {
                  const efColor = b.efetividade >= 1.5 ? "#b91c1c" : b.efetividade >= 1.0 ? "#854d0e" : "#166534";
                  const efBg = b.efetividade >= 1.5 ? "#fee2e2" : b.efetividade >= 1.0 ? "#fef9c3" : "#dcfce7";
                  return (
                    <tr key={i} className="table-row-hover" style={{ borderTop: "1px solid #f0f2ee", cursor: "pointer" }}>
                      <td style={{ padding: "7px 10px", color: "#9aaa93", fontFamily: "DM Mono, monospace", fontSize: 11 }}>{i + 1}</td>
                      <td style={{ padding: "7px 8px", color: "#1a1f1b", fontSize: 11, fontWeight: 500 }}>
                        {b.barreira.replace("Barreira ", "")}
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "right", fontFamily: "DM Mono, monospace", fontSize: 11, color: "#6b7268" }}>
                        {b.abordagens.toLocaleString("pt-BR")}
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "right", fontFamily: "DM Mono, monospace", fontSize: 11, color: "#6b7268" }}>
                        {b.irregularidades}
                      </td>
                      <td style={{ padding: "7px 10px", textAlign: "right" }}>
                        <span style={{ background: efBg, color: efColor, padding: "2px 7px", borderRadius: 99, fontSize: 11, fontFamily: "DM Mono, monospace", fontWeight: 600 }}>
                          {b.efetividade.toFixed(2).replace(".", ",")}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "10px 14px", borderTop: "1px solid #f0f2ee" }}>
            <button
              onClick={() => onNavigate("efetividade-barreiras")}
              style={{ fontSize: 12, color: "#2d5a1b", background: "none", border: "1px solid #2d5a1b", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontWeight: 500 }}
            >
              Ver todas as barreiras
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Municípios prioritários + Sazonalidade + Anomalias */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>

        {/* 4. Municípios */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header">
            <div style={{ fontSize: 12, color: "#7a9472", fontWeight: 600, marginBottom: 1 }}>4. Municípios com Maior Trânsito e Menor Cobertura</div>
            <div style={{ fontSize: 11, color: "#9aaa93" }}>Municípios com alto volume de GTAs e maior distância até a barreira mais próxima</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#f6f8f4" }}>
                  <th style={{ padding: "6px 14px", textAlign: "left", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>#</th>
                  <th style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Município</th>
                  <th style={{ padding: "6px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Animais</th>
                  <th style={{ padding: "6px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Dist. km</th>
                  <th style={{ padding: "6px 10px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Situação</th>
                </tr>
              </thead>
              <tbody>
                {filteredMunicipios.map((m, i) => (
                  <tr key={i} className="table-row-hover" style={{ borderTop: "1px solid #f0f2ee" }}>
                    <td style={{ padding: "6px 14px", color: "#9aaa93", fontFamily: "DM Mono, monospace", fontSize: 11 }}>{i + 1}</td>
                    <td style={{ padding: "6px 8px", color: "#1a1f1b", fontWeight: 500, fontSize: 11 }}>{m.municipio}</td>
                    <td style={{ padding: "6px 8px", textAlign: "right", fontFamily: "DM Mono, monospace", fontSize: 11, color: "#6b7268" }}>
                      {(m.animais / 1000).toFixed(0)}k
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "right", fontFamily: "DM Mono, monospace", fontSize: 11, color: "#6b7268" }}>
                      {m.distancia} km
                    </td>
                    <td style={{ padding: "6px 10px", textAlign: "right" }}>
                      <span className={m.prioridade === "Alta" ? "badge-alta" : m.prioridade === "Média" ? "badge-media" : "badge-baixa"}>
                        {m.prioridade} Prioridade
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Sazonalidade */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header">
            <div style={{ fontSize: 12, color: "#7a9472", fontWeight: 600, marginBottom: 1 }}>5. Sazonalidade do Risco</div>
            <div style={{ fontSize: 11, color: "#9aaa93" }}>Volume de animais movimentados por mês (todos os fluxos)</div>
          </div>
          <div style={{ flex: 1, padding: "10px 14px" }}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sazonalidadeData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2ee" />
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#9aaa93" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9aaa93", fontFamily: "DM Mono, monospace" }} axisLine={false} tickLine={false} />
                <RechartTooltip
                  contentStyle={{ background: "#14211a", border: "none", borderRadius: 6, fontSize: 11, color: "white" }}
                  labelStyle={{ color: "#a0c4aa" }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="bovinos" stroke="#2d5a1b" strokeWidth={2} dot={false} name="Bovinos" />
                <Line type="monotone" dataKey="suinos" stroke="#e07b20" strokeWidth={2} dot={false} name="Suínos" />
                <Line type="monotone" dataKey="aves" stroke="#7a9472" strokeWidth={2} dot={false} name="Aves" />
                <Line type="monotone" dataKey="ovinos" stroke="#9b7a4e" strokeWidth={2} dot={false} name="Ovinos/Caprinos" />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { periodo: "Mar–Mai", texto: "Aumento de ovinos", color: "#9b7a4e" },
                { periodo: "Jun–Ago", texto: "Pico de bovinos", color: "#2d5a1b" },
                { periodo: "Set–Out", texto: "Aumento de aves", color: "#7a9472" },
              ].map((p) => (
                <div key={p.periodo} style={{ display: "flex", alignItems: "flex-start", gap: 6, flex: 1, minWidth: 80 }}>
                  <div style={{ width: 3, height: 28, background: p.color, borderRadius: 99, flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: p.color }}>{p.periodo}</div>
                    <div style={{ fontSize: 10, color: "#6b7268", lineHeight: 1.3 }}>{p.texto}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Radar de Anomalias */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#7a9472", fontWeight: 600, marginBottom: 1 }}>6. Radar de Anomalias</div>
              <div style={{ fontSize: 11, color: "#9aaa93" }}>Movimentações atípicas identificadas</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: 99, background: "#dc2626", boxShadow: "0 0 6px #dc262690" }} />
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
            {anomaliasData.map((a, i) => (
              <div
                key={i}
                className="table-row-hover"
                style={{ padding: "8px 14px", borderBottom: "1px solid #f0f2ee", display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                  background: a.severity === "alta" ? "#fee2e2" : a.severity === "media" ? "#fef9c3" : "#dcfce7",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.severity === "alta" ? "#b91c1c" : a.severity === "media" ? "#854d0e" : "#166534"} strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#14211a" }}>{a.tipo}</span>
                    <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", fontWeight: 700, color: a.variacao.startsWith("+") ? "#b91c1c" : "#2d5a1b" }}>
                      {a.variacao}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7268", lineHeight: 1.3, marginTop: 1 }}>{a.descricao}</div>
                  <div style={{ fontSize: 10, color: "#9aaa93", marginTop: 2 }}>{a.municipio}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 14px", borderTop: "1px solid #f0f2ee" }}>
            <button
              onClick={() => onNavigate("radar-anomalias")}
              style={{ fontSize: 12, color: "#2d5a1b", background: "none", border: "1px solid #2d5a1b", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontWeight: 500 }}
            >
              Ver todas as anomalias
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: 4, flexShrink: 0 }} />
    </div>
  );
}
