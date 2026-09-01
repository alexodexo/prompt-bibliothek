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
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Prompt-Bibliothek</h1>
      <p className="mt-2 text-slate-600">
        Gesammelte Prompts für die tägliche Arbeit. Auswählen, eigenen Text einfügen, ausführen.
      </p>

      {empfehlung && (
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Prompt des Tages
          </h2>
          <Link
            href={`/prompt/${empfehlung.id}`}
            className="block rounded-xl border-2 border-slate-900 bg-white p-5 transition hover:bg-slate-50"
          >
            <h3 className="text-lg font-semibold text-slate-900">{empfehlung.titel}</h3>
            <p className="mt-1 text-slate-600">{empfehlung.beschreibung}</p>
          </Link>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Alle Prompts
        </h2>
        <ul className="space-y-3">
          {uebrige.map((prompt) => (
            <li key={prompt.id}>
              <Link
                href={`/prompt/${prompt.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400"
              >
                <h3 className="font-semibold text-slate-900">{prompt.titel}</h3>
                <p className="mt-1 text-slate-600">{prompt.beschreibung}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
