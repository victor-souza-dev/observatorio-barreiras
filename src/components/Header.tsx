import { useState, type ChangeEvent } from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
  filters: {
    periodo: string;
    especie: string;
    regiao: string;
    municipio: string;
  };
  onFiltersChange: (filters: { periodo: string; especie: string; regiao: string; municipio: string }) => void;
  defaultFilters: { periodo: string; especie: string; regiao: string; municipio: string };
}

export default function Header({ title, subtitle, filters, onFiltersChange, defaultFilters }: HeaderProps) {
  const parsePeriodo = (p: string) => {
    const parts = p.split("–");
    return { start: parts[0] || "01/01/2025", end: parts[1] || "31/12/2025" };
  };
  const { start: periodoStart, end: periodoEnd } = parsePeriodo(filters.periodo);

  const toISO = (d: string) => {
    const [dd, mm, yyyy] = d.split("/");
    return `${yyyy}-${mm}-${dd}`;
  };
  const fromISO = (iso: string) => {
    const [yyyy, mm, dd] = iso.split("-");
    return `${dd}/${mm}/${yyyy}`;
  };

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, periodo: `${fromISO(e.target.value)}–${periodoEnd}` });
  };
  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, periodo: `${periodoStart}–${fromISO(e.target.value)}` });
  };

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8dc",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: "#14211a",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 12, color: "#6b7268", margin: 0, marginTop: 1 }}>{subtitle}</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        {/* Período */}
        <div>
          <div style={{ fontSize: 10, color: "#9aaa93", fontWeight: 500, marginBottom: 2, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Período
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#f6f8f4",
              border: "1px solid #d6dbd2",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 12,
              color: "#1a1f1b",
              fontFamily: "DM Mono, monospace",
              whiteSpace: "nowrap",
            }}
          >
            <input
              type="date"
              value={toISO(periodoStart)}
              onChange={handleStartChange}
              style={{
                border: "none",
                background: "transparent",
                fontFamily: "DM Mono, monospace",
                fontSize: 12,
                color: "#1a1f1b",
                cursor: "pointer",
                padding: 0,
                width: 110,
              }}
            />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7268" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
            <input
              type="date"
              value={toISO(periodoEnd)}
              onChange={handleEndChange}
              style={{
                border: "none",
                background: "transparent",
                fontFamily: "DM Mono, monospace",
                fontSize: 12,
                color: "#1a1f1b",
                cursor: "pointer",
                padding: 0,
                width: 110,
              }}
            />
          </div>
        </div>

        <FilterSelect
          label="Espécie"
          value={filters.especie}
          options={["Todos", "Bovinos", "Suínos", "Aves", "Ovinos/Caprinos", "Equídeos"]}
          onChange={(v) => onFiltersChange({ ...filters, especie: v })}
        />
        <FilterSelect
          label="Regional"
          value={filters.regiao}
          options={["Todos", "Noroeste", "Nordeste", "Centro", "Metade Sul", "Serra Gaúcha", "Litoral"]}
          onChange={(v) => onFiltersChange({ ...filters, regiao: v })}
        />
        <FilterSelect
          label="Município"
          value={filters.municipio}
          options={["Todos", "Porto Alegre", "Caxias do Sul", "Pelotas", "Santa Maria", "Uruguaiana"]}
          onChange={(v) => onFiltersChange({ ...filters, municipio: v })}
        />

        <button
          onClick={() => onFiltersChange(defaultFilters)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "#2d5a1b",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            marginTop: 16,
            whiteSpace: "nowrap",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Limpar filtros
        </button>
      </div>
    </header>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div style={{ fontSize: 10, color: "#9aaa93", fontWeight: 500, marginBottom: 2, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "#f6f8f4",
          border: "1px solid #d6dbd2",
          borderRadius: 6,
          padding: "5px 28px 5px 10px",
          fontSize: 12,
          color: "#1a1f1b",
          cursor: "pointer",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7268' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 8px center",
          minWidth: 90,
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
