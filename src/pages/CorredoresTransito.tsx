import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { corredoresData } from "../data/mockData";
import type { Filters } from "../App";

function SankeyDiagram() {
  const nodes = [
    // Origins (left)
    { id: "URU", label: "Uruguaiana", x: 40, y: 25, side: "left", volume: 1860000 },
    { id: "SL", label: "Santana do Livramento", x: 40, y: 75, side: "left", volume: 1420000 },
    { id: "ALE", label: "Alegrete", x: 40, y: 130, side: "left", volume: 1180000 },
    { id: "BAG", label: "Bagé", x: 40, y: 180, side: "left", volume: 980000 },
    { id: "CRZ", label: "Cruz Alta", x: 40, y: 225, side: "left", volume: 820000 },
    { id: "CAC", label: "Cachoeira do Sul", x: 40, y: 268, side: "left", volume: 710000 },
    { id: "ERE", label: "Erechim", x: 40, y: 308, side: "left", volume: 650000 },
    { id: "IJU", label: "Ijuí", x: 40, y: 346, side: "left", volume: 610000 },
  ];

  const destinations = [
    { id: "DALE", label: "Alegrete", x: 330, y: 30, volume: 1860000 },
    { id: "DURU", label: "Uruguaiana", x: 330, y: 80, volume: 1420000 },
    { id: "DSM", label: "Santa Maria", x: 330, y: 135, volume: 1890000 },
    { id: "DPEL", label: "Pelotas", x: 330, y: 188, volume: 980000 },
    { id: "DPF", label: "Passo Fundo", x: 330, y: 238, volume: 1470000 },
    { id: "DSSR", label: "Santa Rosa", x: 330, y: 290, volume: 610000 },
  ];

  const maxVolume = 1860000;
  const flows = [
    { from: "URU", to: "DALE", volume: 1860000, especie: "Bovinos" },
    { from: "SL", to: "DURU", volume: 1420000, especie: "Bovinos" },
    { from: "ALE", to: "DSM", volume: 1180000, especie: "Bovinos" },
    { from: "BAG", to: "DPEL", volume: 980000, especie: "Bovinos" },
    { from: "CRZ", to: "DPF", volume: 820000, especie: "Bovinos" },
    { from: "CAC", to: "DSM", volume: 710000, especie: "Suínos" },
    { from: "ERE", to: "DPF", volume: 650000, especie: "Suínos" },
    { from: "IJU", to: "DSSR", volume: 610000, especie: "Aves" },
  ];

  const specieColor = (e: string) => e === "Bovinos" ? "#2d5a1b" : e === "Suínos" ? "#e07b20" : "#7a9472";

  return (
    <svg viewBox="0 0 400 390" style={{ width: "100%", height: "100%" }}>
      {/* Draw flows */}
      {flows.map((f, i) => {
        const fromNode = nodes.find((n) => n.id === f.from)!;
        const toNode = destinations.find((d) => d.id === f.to)!;
        const strokeW = Math.max(2, (f.volume / maxVolume) * 22);
        const color = specieColor(f.especie);
        const x1 = 115, y1 = fromNode.y, x2 = 295, y2 = toNode.y;
        const cp1x = (x1 + x2) / 2, cp2x = (x1 + x2) / 2;
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeW}
            strokeOpacity="0.25"
          />
        );
      })}

      {/* Origin nodes */}
      {nodes.map((n) => {
        const h = Math.max(8, (n.volume / maxVolume) * 35);
        return (
          <g key={n.id}>
            <rect x={40} y={n.y - h / 2} width={75} height={h} rx={3} fill="#2d5a1b" opacity={0.8} />
            <text x={122} y={n.y + 0.5} fontSize={9} fill="#6b7268" dominantBaseline="middle" fontFamily="DM Sans, sans-serif">
              {n.label.length > 18 ? n.label.slice(0, 16) + "…" : n.label}
            </text>
          </g>
        );
      })}

      {/* Destination nodes */}
      {destinations.map((d) => {
        const h = Math.max(8, (d.volume / maxVolume) * 35);
        return (
          <g key={d.id}>
            <rect x={295} y={d.y - h / 2} width={75} height={h} rx={3} fill="#7a4f24" opacity={0.8} />
            <text x={288} y={d.y + 0.5} fontSize={9} fill="#6b7268" dominantBaseline="middle" textAnchor="end" fontFamily="DM Sans, sans-serif">
              {d.label}
            </text>
          </g>
        );
      })}

      {/* Labels */}
      <text x={77} y={10} textAnchor="middle" fontSize={10} fill="#9aaa93" fontWeight="600" fontFamily="DM Sans, sans-serif">Origem</text>
      <text x={333} y={10} textAnchor="middle" fontSize={10} fill="#9aaa93" fontWeight="600" fontFamily="DM Sans, sans-serif">Destino</text>

      {/* Legend */}
      <g transform="translate(140, 360)">
        {[{ c: "#2d5a1b", l: "Bovinos" }, { c: "#e07b20", l: "Suínos" }, { c: "#7a9472", l: "Aves" }].map((item, i) => (
          <g key={i} transform={`translate(${i * 70}, 0)`}>
            <rect x={0} y={0} width={14} height={8} rx={2} fill={item.c} opacity={0.7} />
            <text x={18} y={7} fontSize={9} fill="#6b7268" fontFamily="DM Sans, sans-serif">{item.l}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function CorredoresTransito({ filters }: { filters: Filters }) {
  const [selectedEspecie, setSelectedEspecie] = useState("Todos");
  const [selectedCorredor, setSelectedCorredor] = useState<typeof corredoresData[0] | null>(null);

  // Usar o filtro de espécie do Header como valor inicial
  const activeEspecie = filters.especie !== "Todos" ? filters.especie : selectedEspecie;

  const filtered = activeEspecie === "Todos"
    ? corredoresData
    : corredoresData.filter((c) => c.especie === activeEspecie);

  const chartData = filtered.slice(0, 8).map((c) => ({
    name: `${c.origem.slice(0, 3)}→${c.destino.slice(0, 3)}`,
    volume: Math.round(c.volume / 1000),
    especie: c.especie,
  }));

  const cobColor = (cob: string) =>
    cob === "Sim" ? "#dcfce7" : cob === "Parcial" ? "#fef9c3" : "#fee2e2";
  const cobTextColor = (cob: string) =>
    cob === "Sim" ? "#166534" : cob === "Parcial" ? "#854d0e" : "#b91c1c";

  return (
    <div style={{ padding: "16px 20px", height: "100%", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>

      <div>
        <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 20, color: "#14211a", margin: 0 }}>
          Quais rotas concentram o maior fluxo?
        </h2>
        <p style={{ fontSize: 12, color: "#6b7268", margin: "3px 0 0" }}>
          Corredores de Trânsito Animal — análise de fluxo origem-destino por espécie
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#6b7268", fontWeight: 500 }}>Filtrar por espécie:</span>
        {["Todos", "Bovinos", "Suínos", "Aves", "Ovinos"].map((e) => (
          <button
            key={e}
            onClick={() => setSelectedEspecie(e)}
            style={{
              fontSize: 11, padding: "4px 12px", borderRadius: 99,
              border: `1px solid ${selectedEspecie === e ? "#2d5a1b" : "#d6dbd2"}`,
              background: selectedEspecie === e ? "#2d5a1b" : "white",
              color: selectedEspecie === e ? "white" : "#6b7268",
              cursor: "pointer", fontWeight: selectedEspecie === e ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, flex: 1, minHeight: 0 }}>

        {/* Sankey */}
        <div className="section-card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="section-card-header">
            <div style={{ fontSize: 13, fontWeight: 600, color: "#14211a" }}>Diagrama de Fluxo Origem → Destino</div>
            <div style={{ fontSize: 11, color: "#9aaa93", marginTop: 1 }}>Espessura proporcional ao volume anual de animais</div>
          </div>
          <div style={{ flex: 1, padding: 12, minHeight: 320 }}>
            <SankeyDiagram />
          </div>
        </div>

        {/* Right: chart + table */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Bar chart */}
          <div className="section-card" style={{ padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#14211a", marginBottom: 10 }}>Volume por Corredor (mil animais)</div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={chartData} margin={{ top: 0, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2ee" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#9aaa93" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9aaa93", fontFamily: "DM Mono, monospace" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#14211a", border: "none", borderRadius: 6, fontSize: 11 }}
                  labelStyle={{ color: "#a0c4aa" }}
                  formatter={(v: number) => [`${v}k animais`]}
                />
                <Bar dataKey="volume" radius={[3, 3, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.especie === "Bovinos" ? "#2d5a1b" : entry.especie === "Suínos" ? "#e07b20" : "#7a9472"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          <div className="section-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="section-card-header">
              <div style={{ fontSize: 12, fontWeight: 600, color: "#14211a" }}>Ranking de Corredores</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#f6f8f4" }}>
                    <th style={{ padding: "7px 10px", textAlign: "left", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Corredor</th>
                    <th style={{ padding: "7px 8px", textAlign: "center", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Espécie</th>
                    <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Volume Anual</th>
                    <th style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Var. vs. 2024</th>
                    <th style={{ padding: "7px 10px", textAlign: "center", fontWeight: 600, fontSize: 10, color: "#6b7268" }}>Barreira</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr
                      key={i}
                      className="table-row-hover"
                      onClick={() => setSelectedCorredor(c)}
                      style={{ borderTop: "1px solid #f0f2ee", cursor: "pointer", background: selectedCorredor === c ? "#f6f8f4" : undefined }}
                    >
                      <td style={{ padding: "7px 10px", color: "#14211a" }}>
                        <span style={{ fontWeight: 500 }}>{c.origem}</span>
                        <span style={{ color: "#c8d0c0", margin: "0 4px" }}>→</span>
                        <span style={{ fontWeight: 500 }}>{c.destino}</span>
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "center" }}>
                        <span style={{ fontSize: 12 }}>
                          {c.especie === "Bovinos" ? "🐄" : c.especie === "Suínos" ? "🐷" : "🐔"}
                        </span>
                        <span style={{ fontSize: 10, color: "#9aaa93", marginLeft: 3 }}>{c.especie}</span>
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "right", fontFamily: "DM Mono, monospace", color: "#1a1f1b" }}>
                        {(c.volume / 1000000).toFixed(2).replace(".", ",")} Mi
                      </td>
                      <td style={{ padding: "7px 8px", textAlign: "right" }}>
                        <span className={c.variacao > 0 ? "trend-up" : "trend-down"}>
                          {c.variacao > 0 ? "▲" : "▼"} {Math.abs(c.variacao)}%
                        </span>
                      </td>
                      <td style={{ padding: "7px 10px", textAlign: "center" }}>
                        <span style={{
                          background: cobColor(c.cobertura), color: cobTextColor(c.cobertura),
                          padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 600,
                        }}>
                          {c.cobertura}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detalhe do Corredor */}
      {selectedCorredor && (
        <div className="section-card" style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#14211a" }}>
              {selectedCorredor.origem} → {selectedCorredor.destino}
            </div>
            <button onClick={() => setSelectedCorredor(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9aaa93", fontSize: 18 }}>×</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {[
              { label: "Espécie Predominante", value: selectedCorredor.especie },
              { label: "Volume Anual", value: `${(selectedCorredor.volume / 1000000).toFixed(2).replace(".", ",")} Mi` },
              { label: "Variação vs. 2024", value: `${selectedCorredor.variacao > 0 ? "+" : ""}${selectedCorredor.variacao}%` },
              { label: "Cobertura de Barreira", value: selectedCorredor.cobertura },
              { label: "% do Total RS", value: `${(selectedCorredor.volume / 18720000 * 100).toFixed(1)}%` },
            ].map((s) => (
              <div key={s.label} style={{ background: "#f6f8f4", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: "#9aaa93", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "DM Sans, sans-serif", color: "#14211a" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
