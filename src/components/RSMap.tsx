import { useState } from "react";
import { municipiosHeatmap } from "../data/mockData";

interface Tooltip {
  x: number;
  y: number;
  municipio: string;
  animais: number;
}

interface RSMapProps {
  onMunicipioClick?: (municipio: string) => void;
  showBarreiras?: boolean;
}

// Color scale for intensity 1-6
function intensityColor(level: number): string {
  const colors = ["", "#fde8c8", "#f8c87a", "#f5a635", "#e07b20", "#c44d0f", "#8b1a0a"];
  return colors[Math.min(level, 6)] || "#fde8c8";
}

// Simplified RS state outline path
const RS_OUTLINE = "M 80 65 L 130 40 L 180 38 L 240 42 L 280 50 L 330 55 L 365 68 L 380 90 L 370 120 L 375 150 L 365 175 L 370 200 L 360 225 L 355 255 L 340 280 L 320 300 L 305 330 L 290 355 L 275 370 L 255 380 L 230 375 L 210 360 L 190 355 L 170 345 L 148 355 L 125 350 L 108 335 L 95 315 L 80 300 L 65 280 L 55 255 L 52 230 L 58 200 L 55 175 L 60 148 L 55 118 L 58 95 Z";

// Barreiras positions
const BARREIRAS = [
  { nome: "Quaraí", x: 118, y: 308 },
  { nome: "São Borja", x: 148, y: 190 },
  { nome: "Alegrete", x: 163, y: 228 },
  { nome: "Bagé", x: 232, y: 308 },
  { nome: "Pelotas", x: 280, y: 332 },
  { nome: "Osório", x: 338, y: 212 },
  { nome: "Vacaria", x: 340, y: 136 },
  { nome: "Palmeira das Missões", x: 198, y: 112 },
  { nome: "Iraí", x: 172, y: 92 },
  { nome: "Caxias do Sul", x: 308, y: 148 },
  { nome: "Porto Alegre", x: 315, y: 242 },
  { nome: "Lajeado", x: 285, y: 178 },
];

export default function RSMap({ onMunicipioClick, showBarreiras = true }: RSMapProps) {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const formatNum = (n: number) =>
    n >= 1000000
      ? (n / 1000000).toFixed(2).replace(".", ",") + " Mi"
      : n >= 1000
      ? Math.round(n / 1000) + " mil"
      : String(n);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        viewBox="0 0 430 400"
        style={{ width: "100%", height: "100%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect x="0" y="0" width="430" height="400" fill="#e8eef8" rx="4" />

        {/* State outline */}
        <path d={RS_OUTLINE} fill="#f5f5ee" stroke="#c8d0c0" strokeWidth="1.5" />

        {/* Municipality circles */}
        {municipiosHeatmap.map((m) => (
          <g key={m.id}>
            <circle
              cx={m.x}
              cy={m.y}
              r={Math.max(12, Math.min(24, 8 + m.intensity * 3))}
              fill={intensityColor(m.intensity)}
              fillOpacity={0.82}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              style={{ cursor: "pointer", transition: "r 0.15s ease" }}
              onMouseEnter={(e) => {
                const svgEl = (e.target as SVGCircleElement).closest("svg") as SVGSVGElement;
                const rect = svgEl.getBoundingClientRect();
                const scale = rect.width / 430;
                setTooltip({
                  x: m.x * scale + rect.left,
                  y: m.y * scale + rect.top,
                  municipio: m.nome,
                  animais: m.animais,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => onMunicipioClick?.(m.nome)}
            />
          </g>
        ))}

        {/* Barrier markers */}
        {showBarreiras &&
          BARREIRAS.map((b) => (
            <g key={b.nome} transform={`translate(${b.x},${b.y})`}>
              <circle r="7" fill="#14211a" fillOpacity="0.85" stroke="white" strokeWidth="1.2" />
              <text
                x="0"
                y="0.4"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="7"
                fill="white"
                fontFamily="DM Mono, monospace"
                fontWeight="500"
              >
                B
              </text>
            </g>
          ))}

        {/* Neighbor labels */}
        {[
          { label: "Paraguai", x: 85, y: 56, color: "#7a9090" },
          { label: "Argentina", x: 52, y: 228, color: "#7a9090" },
          { label: "Uruguai", x: 130, y: 380, color: "#7a9090" },
          { label: "Santa Catarina", x: 320, y: 44, color: "#7a9090" },
          { label: "Oceano Atlântico", x: 390, y: 290, color: "#6080a0" },
        ].map((n) => (
          <text
            key={n.label}
            x={n.x}
            y={n.y}
            fontSize="8"
            fill={n.color}
            fontFamily="DM Sans, sans-serif"
            fontStyle="italic"
            textAnchor="middle"
          >
            {n.label}
          </text>
        ))}

        {/* Zoom controls */}
        <g transform="translate(400, 310)">
          <rect x="0" y="0" width="20" height="20" rx="4" fill="white" stroke="#d6dbd2" />
          <text x="10" y="14" textAnchor="middle" fontSize="14" fill="#6b7268" fontWeight="300">+</text>
          <rect x="0" y="24" width="20" height="20" rx="4" fill="white" stroke="#d6dbd2" />
          <text x="10" y="38" textAnchor="middle" fontSize="14" fill="#6b7268" fontWeight="300">−</text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 12,
            top: tooltip.y - 36,
            background: "#14211a",
            color: "white",
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 12,
            pointerEvents: "none",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 2 }}>{tooltip.municipio}</div>
          <div style={{ color: "#a0c4aa", fontFamily: "DM Mono, monospace" }}>
            {formatNum(tooltip.animais)} animais
          </div>
        </div>
      )}
    </div>
  );
}
