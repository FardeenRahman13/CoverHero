# Assignment Cover Generator

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
