"use client";
import { useEffect, useRef, useState } from "react";
import type { CoverData } from "@/lib/pdf";

const PX = 210 * 3.7795275591; // A4 width in CSS px
export default function Cover({ data, logo, logoName }: { data: CoverData; logo?: string; logoName?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(400);
  const [broken, setBroken] = useState(false);
  useEffect(() => { setBroken(false); }, [logo]);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth)); ro.observe(el); setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const rows: [string, string][] = [
    ["Course", [data.code.trim(), data.course.trim()].filter(Boolean).join(" · ")],
    ["Student name", data.name], ["Student ID", data.id], ["Section", data.section], ["Faculty", data.faculty],
  ];
  return (
    <div ref={wrap} className="w-full bg-white border border-neutral-300" style={{ aspectRatio: "210 / 297", overflow: "hidden", position: "relative" }}>
      <div style={{ width: "210mm", height: "297mm", transform: `scale(${w / PX})`, transformOrigin: "top left", position: "absolute", background: "#fff", color: "#000", fontFamily: "'Times New Roman', Times, serif" }}>
        <div style={{ position: "absolute", top: "38mm", left: "65mm", width: "80mm", height: "50mm", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {logo && !broken ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={logoName ?? "University logo"} onError={() => setBroken(true)} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          ) : (
            <div style={{ border: "0.3mm dashed #aaa", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10pt", color: "#777", textAlign: "center", fontFamily: "Helvetica, Arial, sans-serif" }}>
              {broken ? "Logo failed to load" : "Select a university logo"}
            </div>
          )}
        </div>
        <div style={{ position: "absolute", top: "125mm", left: "30mm", width: "150mm", textAlign: "center", overflowWrap: "anywhere" }}>
          {data.title.trim() && <div style={{ fontSize: "18pt", fontWeight: 700, lineHeight: "8mm", marginBottom: "8mm" }}>{data.title}</div>}
          {rows.map(([l, v]) => v.trim() && (
            <div key={l} style={{ marginBottom: "8mm" }}>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "8pt", letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a5a5a", lineHeight: "5.5mm" }}>{l}</div>
              <div style={{ fontSize: "13pt", lineHeight: "6mm" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
