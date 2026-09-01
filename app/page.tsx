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
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-20">
      <header>
        <div className="eyebrow w-24" />
        <h1 className="mt-7 text-6xl font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-7xl">
          Prompt
          <br />
          Bibliothek
        </h1>
        <div className="regal mt-8 flex flex-wrap items-baseline justify-between gap-4 pt-4">
          <p className="max-w-md text-[15px] leading-relaxed text-tinte/65">
            Einen Prompt auswählen, den eigenen Text einfügen, ausführen. Die Anweisung
            steht jeweils dabei, damit ihr seht, was das Modell bekommt.
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua">
            {prompts.length} Prompts
          </p>
        </div>
      </header>

      {empfehlung && (
        <section className="mt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-aqua">
            Prompt des Tages
          </h2>
          <Link
            href={`/prompt/${empfehlung.id}`}
            className="group mt-4 block border border-linie bg-white transition hover:border-aqua"
          >
            <div className="eyebrow-schmal" />
            <div className="px-8 py-7">
              <div className="flex items-start justify-between gap-6">
                <h3 className="text-3xl font-black uppercase leading-tight tracking-[-0.02em]">
                  {empfehlung.titel}
                </h3>
                <span className="mt-2 shrink-0 text-xl text-aqua transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-2 text-tinte/60">{empfehlung.beschreibung}</p>
              <p className="regal mt-6 pt-5 text-sm leading-relaxed text-tinte/55">
                {empfehlung.text}
              </p>
            </div>
          </Link>
        </section>
      )}

      <section className="mt-16">
        <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-aqua">
          Alle Prompts
        </h2>
        <ul className="mt-4 grid gap-px border border-linie bg-linie sm:grid-cols-2">
          {uebrige.map((prompt) => (
            <li key={prompt.id} className="bg-white">
              <Link
                href={`/prompt/${prompt.id}`}
                className="group flex h-full flex-col px-7 py-6 transition hover:bg-aqua/[0.04]"
              >
                <h3 className="text-lg font-black uppercase leading-snug tracking-[-0.01em]">
                  {prompt.titel}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-tinte/60">
                  {prompt.beschreibung}
                </p>
                <span className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-aqua">
                  Öffnen
                  <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
          {uebrige.length % 2 === 1 && (
            <li className="hidden bg-white sm:block" aria-hidden="true" />
          )}
        </ul>
      </section>

      <footer className="regal mt-16 pt-6 text-sm text-tinte/45">
        Läuft über EUrouter. Der Schlüssel steht in eurer{" "}
        <code className="font-mono text-xs text-tinte/70">.env.local</code>.
      </footer>
    </main>
  );
}
