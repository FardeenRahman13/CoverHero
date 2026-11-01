import Generator from "@/components/Generator";
import Cover from "@/components/Cover";
import { universities, logoSrc } from "@/lib/universities";

const demo = { name: "Ayesha Rahman", id: "23101234", section: "07", course: "Introduction to Programming", faculty: "Dr. Karim Hossain", code: "CSE110", title: "" };
const steps = [["Choose your university", "Pick your logo from the gallery."], ["Enter your details", "Name, ID, section, course and faculty."], ["Download your cover", "A print-ready A4 PDF, in one click."]];
export default function Home() {
  return (
    <>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-serif text-xl tracking-tight">Cover.</a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#how" className="hover:text-neutral-500">How it works</a>
          <a href="#create" className="bg-black px-4 py-2 text-white transition hover:bg-neutral-700">Create a cover</a>
        </nav>
      </header>
      <main id="top">
        <section className="mx-auto grid max-w-7xl items-center gap-12 border-t border-neutral-200 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">The front page your assignment deserves.</h1>
            <p className="mt-6 max-w-md text-lg text-neutral-600">Pick your university, type your details, and download a clean A4 cover page. It takes under a minute.</p>
            <a href="#create" className="mt-8 inline-block bg-black px-7 py-3.5 text-sm text-white transition hover:bg-neutral-700">Create a cover</a>
          </div>
          <div className="mx-auto w-full max-w-[300px] rotate-[2deg] shadow-[0_0_0_1px_#e5e5e5]" aria-hidden>
            <Cover data={demo} logo={logoSrc(universities[0])} logoName={universities[0].name} />
          </div>
        </section>
        <section id="how" className="border-t border-neutral-200">
          <div className="mx-auto grid max-w-7xl gap-px px-6 py-16 md:grid-cols-3 md:gap-12">
            {steps.map(([t, s], i) => (
              <div key={t}><span className="font-serif text-3xl text-neutral-400">{i + 1}</span><h2 className="mt-2 font-serif text-2xl">{t}</h2><p className="mt-2 text-neutral-600">{s}</p></div>
            ))}
          </div>
        </section>
        <section id="create" className="border-t border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-16"><h2 className="mb-10 font-serif text-4xl tracking-tight">Create your cover</h2><Generator /></div>
        </section>
      </main>
      <footer className="border-t border-neutral-200 px-6 py-8 text-center text-sm text-neutral-500">Everything runs in your browser. No accounts, no uploads.</footer>
    </>
  );
}
