# Assignment Cover Generator

It is 11:40 p.m. The assignment is done, the deadline is midnight, and the portal wants a cover page. You open Word, hunt for last semester's template, fight with the logo's position, and watch the minutes disappear.

This tool exists to give you those 1-2 crucial minutes back. Choose your university, type your details, download a clean A4 PDF, and attach it.

## How it was built

It started with one question: what is the least a student should have to do? The answer was three steps: pick a logo, fill in a few fields, download. Everything else was cut.

**The page first.** The cover is a real A4 sheet (210 x 297 mm) with the logo centered near the top and the details stacked beneath it. The on-screen preview is that same sheet, scaled to fit your screen, so what you see is what you print.

**Then the logos.** Universities are plain PNG files in `public/logos/` plus one line each in `lib/universities.ts`. Adding a university never touches the interface code.

**Then the PDF.** The first idea was to screenshot the preview, but screenshots blur and break on different screens. Instead the PDF is drawn directly with jsPDF, so the text stays sharp and the page is exactly A4 on every device. Early testing showed the field labels drifting off-center in the PDF, so they are now positioned letter by letter to match the preview.

**Then privacy.** There is no server, database or account. Your name and ID are processed in your browser and never uploaded.

Required fields are name, student ID, section and course code. Course title, faculty name and assignment title are optional, and empty ones leave no gap on the page.

---

Next.js (App Router) + TypeScript + Tailwind. Everything runs in the browser; no database, API or env vars.

## Run locally
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Add or replace a logo
1. Put the PNG in `public/logos/` (e.g. `bubt.png`).
2. Open `lib/universities.ts` and add one line:
   `{ id: "bubt", name: "Bangladesh University of Business and Technology", file: "bubt.png" },`
3. Commit and push. To replace a logo, overwrite the file with the same name.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com choose Add New > Project, import the repo.
3. Framework is detected as Next.js. Leave defaults and click Deploy.

## Static vs browser
Static: the pages and `public/logos/*`. Browser: form state, live preview and PDF generation (jsPDF). Student data never leaves the device.

## Limitations
Form data is not saved across refreshes. The PDF uses built-in Times/Helvetica fonts. Print opens the PDF in a new tab for the browser's print dialog.
