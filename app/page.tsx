import Link from "next/link";
import { prompts, promptDesTages, findePrompt } from "@/data/prompts";

// Startseite: oben der hervorgehobene Prompt, darunter die vollständige Liste.
//
// Was hier noch fehlt: ein Suchfeld über der Liste. Sobald mehr als zehn
// Prompts darin stehen, wird das Suchen mühsam.

export default function Startseite() {
  const empfehlung = findePrompt(promptDesTages);
  const uebrige = prompts.filter((p) => p.id !== promptDesTages);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-28 pt-16">
      <header className="relative">
        <div className="relative mx-auto w-52">
          <div className="sonne w-52" />
          <div className="sonne-schlitze" />
        </div>

        <h1 className="neon-titel mt-8 text-center text-6xl font-black uppercase italic leading-[0.86] tracking-[-0.02em] sm:text-7xl">
          Prompt
          <br />
          Bibliothek
        </h1>

        <div className="horizont mt-8" />

        <div className="mt-7 flex flex-wrap items-baseline justify-between gap-4">
          <p className="max-w-md text-[15px] leading-relaxed text-gedaempft">
            Einen Prompt auswählen, den eigenen Text einfügen, ausführen. Die Anweisung
            steht jeweils dabei, damit ihr seht, was das Modell bekommt.
          </p>
          <p className="neon-cyan text-xs font-bold uppercase tracking-[0.24em]">
            {prompts.length} Prompts
          </p>
        </div>
      </header>

      {empfehlung && (
        <section className="mt-14">
          <h2 className="neon-cyan text-xs font-bold uppercase tracking-[0.26em]">
            Prompt des Tages
          </h2>
          <Link
            href={`/prompt/${empfehlung.id}`}
            className="glas group mt-4 block rounded-2xl px-8 py-7"
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-3xl font-black uppercase italic leading-tight tracking-[-0.02em] text-hell">
                {empfehlung.titel}
              </h3>
              <span className="mt-2 shrink-0 text-2xl text-cyan transition group-hover:translate-x-1">
                →
              </span>
            </div>
            <p className="mt-2 text-neonpink">{empfehlung.beschreibung}</p>
            <p className="mt-6 border-l-2 border-cyan/50 pl-5 text-sm leading-relaxed text-gedaempft">
              {empfehlung.text}
            </p>
          </Link>
        </section>
      )}

      <section className="mt-14">
        <h2 className="neon-cyan text-xs font-bold uppercase tracking-[0.26em]">
          Alle Prompts
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {uebrige.map((prompt) => (
            <li key={prompt.id}>
              <Link
                href={`/prompt/${prompt.id}`}
                className="glas group flex h-full flex-col rounded-2xl px-6 py-6"
              >
                <h3 className="text-lg font-black uppercase italic leading-snug tracking-[-0.01em] text-hell">
                  {prompt.titel}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gedaempft">
                  {prompt.beschreibung}
                </p>
                <span className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-cyan">
                  Öffnen
                  <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 border-t border-neonpink/15 pt-6 text-sm text-gedaempft/70">
        Läuft über EUrouter. Der Schlüssel steht in eurer{" "}
        <code className="font-mono text-xs text-cyan">.env.local</code>.
      </footer>
    </main>
  );
}
