import { useState } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Label
} from "recharts";
import { barreiraData } from "../data/mockData";
import type { Filters } from "../App";

const CustomDot = (props: { cx?: number; cy?: number; payload?: typeof barreiraData[0]; highlight?: boolean }) => {
  const { cx = 0, cy = 0, payload, highlight } = props;
  const isHighlight = highlight || (payload && payload.abordagens < 10000 && payload.efetividade > 1.0);
  const r = isHighlight ? 9 : 7;
  const fill = isHighlight ? "#e07b20" : "#2d5a1b";
  return (
    <g>
      {isHighlight && <circle cx={cx} cy={cy} r={r + 4} fill={fill} fillOpacity={0.15} />}
      <circle cx={cx} cy={cy} r={r} fill={fill} fillOpacity={0.85} stroke="white" strokeWidth={1.5} style={{ cursor: "pointer" }} />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: typeof barreiraData[0] }[] }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#14211a", border: "none", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "white", maxWidth: 200 }}>
      <div style={{ fontWeight: 700, marginBottom: 4, color: "#a0c4aa" }}>{d.barreira}</div>
      <div>Abordagens: <span style={{ fontFamily: "DM Mono, monospace" }}>{d.abordagens.toLocaleString("pt-BR")}</span></div>
      <div>Irregularidades: <span style={{ fontFamily: "DM Mono, monospace" }}>{d.irregularidades}</span></div>
      <div>Efetividade: <span style={{ fontFamily: "DM Mono, monospace", color: "#f8c87a" }}>{d.efetividade.toFixed(2).replace(".", ",")}%</span></div>
    </div>
  );
};

export default function EfetividadeBarreiras({ filters }: { filters: Filters }) {
  const [selected, setSelected] = useState<typeof barreiraData[0] | null>(null);

  // Filtrar barreiras com base nos filtros (mantendo todos por enquanto, já que barreiras não têm filtro direto)
  const filteredBarreiras = barreiraData;

  const scatterData = filteredBarreiras.map((b) => ({
    ...b,
    x: b.abordagens,
    y: b.efetividade,
  }));

  const topBarreira = filteredBarreiras.reduce((a, b) => a.efetividade > b.efetividade ? a : b);
  const worstTrend = filteredBarreiras.filter((b) => b.tendencia === "down").sort((a, b) => b.efetividade - a.efetividade)[0];

  return (
    <div style={{ padding: "16px 20px", height: "100%", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>

      <div>
        <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 20, color: "#14211a", margin: 0 }}>
          Onde vale a pena reforçar efetivo?
        </h2>
        <p style={{ fontSize: 12, color: "#6b7268", margin: "3px 0 0" }}>
          Índice de Efetividade das Barreiras — relação entre volume de abordagens e taxa de irregularidades
        </p>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        <div className="kpi-card">
          <div style={{ fontSize: 10, color: "#6b7268", fontWeight: 500, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Barreira Mais Efetiva do Mês
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#2d5a1b" }}>{topBarreira.barreira}</div>
          <div style={{ fontSize: 12, color: "#9aaa93", marginTop: 2, fontFamily: "DM Mono, monospace" }}>{topBarreira.efetividade.toFixed(2).replace(".", ",")}% de irregularidades</div>
        </div>
        <div className="kpi-card">
          <div style={{ fontSize: 10, color: "#6b7268", fontWeight: 500, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Maior Queda de Efetividade
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#b91c1c" }}>{worstTrend?.barreira}</div>
          <div style={{ fontSize: 12, color: "#9aaa93", marginTop: 2, fontFamily: "DM Mono, monospace" }}>↓ tendência de queda</div>
        </div>
        <div className="kpi-card">
          <div style={{ fontSize: 10, color: "#6b7268", fontWeight: 500, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Candidatas a Reforço
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#e07b20" }}>
            {filteredBarreiras.filter((b) => b.abordagens < 10000 && b.efetividade > 1.0).length}
          </div>
          <div style={{ fontSize: 11, color: "#9aaa93", marginTop: 2 }}>Alta efetividade, baixo volume</div>
        </div>
        <div className="kpi-card">
          <div style={{ fontSize: 10, color: "#6b7268", fontWeight: 500, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Total de Irregularidades
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#14211a" }}>
            {filteredBarreiras.reduce((a, b) => a + b.irregularidades, 0).toLocaleString("pt-BR")}
          </div>
          <div style={{ fontSize: 11, color: "#9aaa93", marginTop: 2 }}>no período selecionado</div>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14, flex: 1, minHeight: 0 }}>

        {/* Scatter plot */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header">
            <div style={{ fontSize: 13, fontWeight: 600, color: "#14211a" }}>Mapa de Efetividade × Volume de Abordagens</div>
            <div style={{ fontSize: 11, color: "#9aaa93", marginTop: 1 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 99, background: "#e07b20", display: "inline-block" }} />
                Candidatas a reforço (alta efetividade, baixo volume)
              </span>
              <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 99, background: "#2d5a1b", display: "inline-block" }} />
                Demais barreiras
              </span>
            </div>
          </div>
          <div style={{ flex: 1, padding: "12px 14px", minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 8, right: 16, left: -8, bottom: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2ee" />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={[0, 32000]}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 10, fill: "#9aaa93", fontFamily: "DM Mono, monospace" }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: "Nº de Abordagens", position: "insideBottom", offset: -8, style: { fontSize: 10, fill: "#9aaa93" } }}
                />
                <YAxis
                  dataKey="y"
                  type="number"
                  domain={[0, 2.8]}
                  tickFormatter={(v) => `${v.toFixed(1)}%`}
                  tick={{ fontSize: 10, fill: "#9aaa93", fontFamily: "DM Mono, monospace" }}
                  axisLine={false}
                  tickLine={false}
                >
                  <Label value="% Irregularidades" angle={-90} position="insideLeft" offset={14} style={{ fontSize: 10, fill: "#9aaa93" }} />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={10000} stroke="#e07b20" strokeDasharray="4 4" strokeOpacity={0.5} />
                <ReferenceLine y={1.0} stroke="#e07b20" strokeDasharray="4 4" strokeOpacity={0.5} />
                <Scatter
                  data={scatterData}
                  shape={(props: { cx?: number; cy?: number; payload?: typeof barreiraData[0] }) => (
                    <CustomDot
                      {...props}
                      highlight={
                        props.payload
                          ? props.payload.abordagens < 10000 && props.payload.efetividade > 1.0
                          : false
                      }
                    />
                  )}
                  onClick={(data) => setSelected(data as typeof barreiraData[0])}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div style={{ padding: "0 14px 12px" }}>
            <div style={{ fontSize: 10, color: "#9aaa93", background: "#fff8f0", borderRadius: 6, padding: "6px 10px", border: "1px solid #fde8c8" }}>
              <strong style={{ color: "#b45309" }}>Quadrante estratégico:</strong> pontos acima da linha horizontal (1%) e à esquerda da vertical (10k) são candidatos prioritários a reforço de efetivo — alta detecção, baixa cobertura.
            </div>
          </div>
        </div>

        {/* Right: detail + table */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Selected detail */}
          {selected ? (
            <div className="section-card" style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#14211a" }}>{selected.barreira}</div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9aaa93", fontSize: 18 }}>×</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { label: "Abordagens", value: selected.abordagens.toLocaleString("pt-BR") },
                  { label: "Irregularidades", value: selected.irregularidades.toLocaleString("pt-BR") },
                  { label: "Taxa de Efetividade", value: `${selected.efetividade.toFixed(2).replace(".", ",")}%` },
                  { label: "Tendência", value: selected.tendencia === "up" ? "↑ Crescendo" : selected.tendencia === "down" ? "↓ Caindo" : "→ Estável" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#f6f8f4", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#9aaa93", marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#14211a" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              {selected.abordagens < 10000 && selected.efetividade > 1.0 && (
                <div style={{ marginTop: 10, fontSize: 11, color: "#b45309", background: "#fff8f0", borderRadius: 6, padding: "8px 12px", border: "1px solid #fde8c8" }}>
                  ⚑ Candidata prioritária a reforço de efetivo — alta efetividade com volume de abordagens abaixo da média.
                </div>
              )}
            </div>
          ) : (
            <div className="section-card" style={{ padding: 16, background: "#f6f8f4", border: "2px dashed #d6dbd2" }}>
              <div style={{ textAlign: "center", color: "#9aaa93", fontSize: 12, padding: "12px 0" }}>
                <div style={{ fontWeight: 500, marginBottom: 2 }}>Nenhuma barreira selecionada</div>
                <div>Clique em um ponto no gráfico para detalhes</div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="section-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="section-card-header">
              <div style={{ fontSize: 12, fontWeight: 600, color: "#14211a" }}>Detalhamento por Barreira</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#f6f8f4" }}>
                    <th style={{ padding: "7px 10px", textAlign: "left", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Barreira</th>
                    <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Abord.</th>
                    <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Irreg.</th>
                    <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>% Efet.</th>
                    <th style={{ padding: "7px 10px", textAlign: "center", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Tend.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBarreiras.map((b, i) => {
                    const isCandidate = b.abordagens < 10000 && b.efetividade > 1.0;
                    const efColor = b.efetividade >= 1.5 ? "#b91c1c" : b.efetividade >= 1.0 ? "#854d0e" : "#166534";
                    const efBg = b.efetividade >= 1.5 ? "#fee2e2" : b.efetividade >= 1.0 ? "#fef9c3" : "#dcfce7";
                    return (
                      <tr
                        key={i}
                        className="table-row-hover"
                        onClick={() => setSelected(b)}
                        style={{
                          borderTop: "1px solid #f0f2ee",
                          cursor: "pointer",
                          background: selected === b ? "#f6f8f4" : isCandidate ? "#fffbf5" : undefined,
                        }}
                      >
                        <td style={{ padding: "7px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            {isCandidate && <span style={{ color: "#e07b20", fontSize: 10 }}>⚑</span>}
                            <span style={{ fontWeight: 500, color: "#14211a" }}>{b.barreira.replace("Barreira ", "")}</span>
                          </div>
                        </td>
                        <td style={{ padding: "7px 8px", textAlign: "right", fontFamily: "DM Mono, monospace", color: "#6b7268" }}>
                          {b.abordagens.toLocaleString("pt-BR")}
                        </td>
                        <td style={{ padding: "7px 8px", textAlign: "right", fontFamily: "DM Mono, monospace", color: "#6b7268" }}>
                          {b.irregularidades}
                        </td>
                        <td style={{ padding: "7px 8px", textAlign: "right" }}>
                          <span style={{ background: efBg, color: efColor, padding: "1px 7px", borderRadius: 99, fontSize: 10, fontFamily: "DM Mono, monospace", fontWeight: 600 }}>
                            {b.efetividade.toFixed(2).replace(".", ",")}%
                          </span>
                        </td>
                        <td style={{ padding: "7px 10px", textAlign: "center", fontSize: 14 }}>
                          {b.tendencia === "up" ? (
                            <span style={{ color: "#16a34a" }}>↑</span>
                          ) : b.tendencia === "down" ? (
                            <span style={{ color: "#dc2626" }}>↓</span>
                          ) : (
                            <span style={{ color: "#6b7268" }}>→</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
