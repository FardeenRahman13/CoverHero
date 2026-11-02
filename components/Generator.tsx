"use client";
import { useState } from "react";
import { universities, logoSrc } from "@/lib/universities";
import { buildPdf, fileName, type CoverData } from "@/lib/pdf";
import Cover from "./Cover";

const empty: CoverData = { name: "", id: "", section: "", course: "", faculty: "", code: "", title: "" };
const fields: { k: keyof CoverData; label: string; ph: string; req?: boolean }[] = [
  { k: "name", label: "Student name", ph: "Ayesha Rahman", req: true },
  { k: "id", label: "Student ID", ph: "23101234", req: true },
  { k: "section", label: "Section", ph: "07", req: true },
  { k: "code", label: "Course code", ph: "CSE110", req: true },
  { k: "course", label: "Course title", ph: "Introduction to Programming" },
  { k: "faculty", label: "Faculty name", ph: "Dr. Karim Hossain" },
  { k: "title", label: "Assignment title", ph: "Assignment 2: Sorting algorithms" },
];
export default function Generator() {
  const [d, setD] = useState<CoverData>(empty);
  const [uni, setUni] = useState<string | null>(null);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const u = universities.find((x) => x.id === uni);

  const validate = () => {
    const e: Record<string, string> = {};
    fields.forEach((f) => { if (f.req && !d[f.k].trim()) e[f.k] = `Enter the ${f.label.toLowerCase()}.`; });
    if (!u) e.logo = "Choose a university first.";
    setErrs(e); return Object.keys(e).length === 0;
  };
  const run = async (print: boolean) => {
    setMsg(""); if (!validate()) return;
    setBusy(true);
    try {
      const doc = await buildPdf(d, logoSrc(u!));
      if (print) { const w = window.open(doc.output("bloburl") as unknown as string, "_blank"); if (!w) setMsg("Pop-up blocked. Allow pop-ups, or download the PDF instead."); }
      else doc.save(fileName(d.name));
    } catch (e) { setMsg(e instanceof Error ? e.message : "PDF generation failed. Try again."); }
    setBusy(false);
  };
  const input = "w-full border border-neutral-300 bg-white px-3 py-2.5 text-[15px] focus:border-black focus:outline-none focus:ring-1 focus:ring-black placeholder:text-neutral-400";

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="space-y-10">
        <fieldset>
          <legend className="font-serif text-2xl">1. University</legend>
          {errs.logo && <p role="alert" className="mt-2 text-sm text-red-700">{errs.logo}</p>}
          <div role="radiogroup" aria-label="University logo" className="mt-4 grid grid-cols-2 gap-px bg-neutral-300 border border-neutral-300 sm:grid-cols-3">
            {universities.map((x) => (
              <button key={x.id} type="button" role="radio" aria-checked={uni === x.id} aria-label={x.name} onClick={() => setUni(x.id)}
                className={`group relative bg-white p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-black ${uni === x.id ? "ring-2 ring-inset ring-black" : "hover:bg-neutral-50"}`}>
                <div className="h-24 w-full">{/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoSrc(x)} alt="" className={`h-full w-full object-contain transition ${uni === x.id ? "" : "grayscale group-hover:grayscale-0"}`} /></div>
                <span className="mt-3 block text-xs leading-snug">{x.name}</span>
                {uni === x.id && <span className="absolute right-2 top-2 bg-black px-1.5 py-0.5 text-[10px] text-white">Selected</span>}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <h3 className="font-serif text-2xl">2. Details</h3>
          <div className="mt-4 grid gap-5">
            {fields.map((f) => (
              <div key={f.k}>
                <label htmlFor={f.k} className="mb-1.5 block text-sm">{f.label}{f.req ? <span className="text-neutral-500"> (required)</span> : <span className="text-neutral-500"> (optional)</span>}</label>
                <input id={f.k} className={input} placeholder={f.ph} maxLength={120} value={d[f.k]} aria-invalid={!!errs[f.k]} aria-describedby={errs[f.k] ? f.k + "-e" : undefined}
                  onChange={(e) => { setD({ ...d, [f.k]: e.target.value }); if (errs[f.k]) setErrs({ ...errs, [f.k]: "" }); }} />
                {errs[f.k] && <p id={f.k + "-e"} role="alert" className="mt-1 text-sm text-red-700">{errs[f.k]}</p>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-serif text-2xl">3. Export</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => run(false)} disabled={busy} className="bg-black px-6 py-3 text-sm text-white transition hover:bg-neutral-700 disabled:opacity-50">{busy ? "Preparing PDF…" : "Download PDF"}</button>
            <button onClick={() => run(true)} disabled={busy} className="border border-black px-6 py-3 text-sm transition hover:bg-black hover:text-white disabled:opacity-50">Print</button>
            <button onClick={() => { setD(empty); setUni(null); setErrs({}); setMsg(""); }} className="px-4 py-3 text-sm underline underline-offset-4 hover:text-neutral-500">Reset</button>
          </div>
          {msg && <p role="alert" className="mt-3 text-sm text-red-700">{msg}</p>}
          <p className="mt-3 text-sm text-neutral-500">Your details stay in your browser. Nothing is uploaded.</p>
        </div>
      </div>
      <div className="lg:sticky lg:top-6 lg:self-start">
        <p className="mb-3 text-sm text-neutral-500">Live preview · A4 portrait</p>
        <Cover data={d} logo={u ? logoSrc(u) : undefined} logoName={u?.name} />
      </div>
    </div>
  );
}
