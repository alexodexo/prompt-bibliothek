import Link from "next/link";
import { prompts, promptDesTages, findePrompt } from "@/data/prompts";

// Startseite: oben der hervorgehobene Prompt, darunter die vollständige Liste.
//
// Was hier noch fehlt: ein Suchfeld über der Liste. Sobald mehr als zehn
// Prompts darin stehen, wird das Suchen mühsam.

const KANTE: Record<string, string> = {
  pink: "from-pink to-koralle",
  koralle: "from-koralle to-sonne",
  sonne: "from-sonne to-koralle",
  tuerkis: "from-tuerkis to-himmel",
  himmel: "from-himmel to-tuerkis",
};

export default function Startseite() {
  const empfehlung = findePrompt(promptDesTages);
  const uebrige = prompts.filter((p) => p.id !== promptDesTages);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-16">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-koralle">
          Sammlung für die tägliche Arbeit
        </p>
        <h1 className="sonnenuntergang mt-3 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
          Prompt&#8203;-Bibliothek
        </h1>
        <div className="streifen mt-5 w-40" />
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-tief/70">
          Einen Prompt auswählen, den eigenen Text einfügen, ausführen. Die Anweisung
          steht jeweils dabei, damit ihr seht, was das Modell wirklich bekommt.
        </p>
        <p className="mt-4 text-sm font-semibold text-tief/45">
          {prompts.length} Prompts in der Sammlung
        </p>
      </header>

      {empfehlung && (
        <section className="mt-14">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tief/45">
            Prompt des Tages
          </h2>
          <Link
            href={`/prompt/${empfehlung.id}`}
            className="group block overflow-hidden rounded-3xl bg-gradient-to-br from-pink via-koralle to-sonne p-[3px] shadow-[0_22px_50px_-24px_rgba(255,46,147,0.75)] transition hover:shadow-[0_28px_60px_-22px_rgba(255,46,147,0.85)]"
          >
            <div className="rounded-[21px] bg-white/95 px-7 py-6 backdrop-blur">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight">{empfehlung.titel}</h3>
                  <p className="mt-1.5 text-tief/65">{empfehlung.beschreibung}</p>
                </div>
                <span className="mt-1 shrink-0 text-2xl transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-5 border-l-4 border-koralle/40 pl-4 text-sm leading-relaxed text-tief/55">
                {empfehlung.text}
              </p>
            </div>
          </Link>
        </section>
      )}

      <section className="mt-14">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-tief/45">
          Alle Prompts
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {uebrige.map((prompt) => (
            <li key={prompt.id}>
              <Link
                href={`/prompt/${prompt.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-22px_rgba(22,35,63,0.55)] ring-1 ring-tief/5"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${KANTE[prompt.farbe]}`} />
                <div className="flex flex-1 flex-col px-6 py-5">
                  <h3 className="text-lg font-bold leading-snug tracking-tight">
                    {prompt.titel}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-tief/60">
                    {prompt.beschreibung}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-koralle transition group-hover:translate-x-0.5">
                    Öffnen →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 border-t border-tief/10 pt-6 text-sm text-tief/45">
        Läuft über EUrouter. Der Schlüssel steht in eurer <code className="rounded bg-tief/5 px-1.5 py-0.5 font-mono text-xs">.env.local</code>.
      </footer>
    </main>
  );
}
