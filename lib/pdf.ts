import { jsPDF } from "jspdf";
export type CoverData = { name: string; id: string; section: string; course: string; faculty: string; code: string; title: string };

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error("The university logo could not be loaded."));
    i.src = src;
  });
}

export async function buildPdf(d: CoverData, src: string) {
  if (document.fonts) await document.fonts.ready;
  const img = await loadImage(src);
  const c = document.createElement("canvas");
  const k = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
  c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  // Logo: fit inside an 80x50 mm box, centred, top at 38 mm
  const r = Math.min(80 / c.width, 50 / c.height);
  const w = c.width * r, h = c.height * r;
  doc.addImage(c.toDataURL("image/png"), "PNG", 105 - w / 2, 38 + (50 - h) / 2, w, h);
  doc.setTextColor(0);
  let y = 125;
  const center = (t: string[], lh: number) => { t.forEach((l, i) => doc.text(l, 105, y + i * lh, { align: "center" })); y += t.length * lh; };
  if (d.title.trim()) {
    doc.setFont("times", "bold").setFontSize(18);
    center(doc.splitTextToSize(d.title.trim(), 150), 8); y += 8;
  }
  const course = [d.code.trim(), d.course.trim()].filter(Boolean).join(" · ");
  const rows: [string, string][] = [["Course", course], ["Student name", d.name], ["Student ID", d.id], ["Section", d.section], ["Faculty", d.faculty]];
  for (const [label, value] of rows) {
    if (!value.trim()) continue;
    doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(90);
    const chars = label.toUpperCase().split(""), gap = 0.423; // 0.15em at 8pt, matches the preview
    const total = chars.reduce((a, ch) => a + doc.getTextWidth(ch), 0) + gap * (chars.length - 1);
    let x = 105 - total / 2;
    for (const ch of chars) { doc.text(ch, x, y); x += doc.getTextWidth(ch) + gap; }
    y += 5.5;
    doc.setFont("times", "normal").setFontSize(13).setTextColor(0);
    center(doc.splitTextToSize(value.trim(), 150), 6); y += 8;
  }
  return doc;
}
export const fileName = (n: string) => `Assignment_Cover_${(n.trim().replace(/[^\w]+/g, "_").replace(/^_|_$/g, "") || "Student")}.pdf`;
