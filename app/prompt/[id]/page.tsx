import Link from "next/link";
import { notFound } from "next/navigation";
import { findePrompt, prompts } from "@/data/prompts";
import PromptFormular from "@/components/PromptFormular";

export function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

const BAND: Record<string, string> = {
  pink: "from-pink to-koralle",
  koralle: "from-koralle to-sonne",
  sonne: "from-sonne to-koralle",
  tuerkis: "from-tuerkis to-himmel",
  himmel: "from-himmel to-tuerkis",
};

export default async function PromptSeite({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prompt = findePrompt(id);

  if (!prompt) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-tief/50 transition hover:text-koralle"
      >
        ← Alle Prompts
      </Link>

      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-[0_16px_44px_-28px_rgba(22,35,63,0.65)] ring-1 ring-tief/5">
        <div className={`h-2 w-full bg-gradient-to-r ${BAND[prompt.farbe]}`} />
        <div className="px-7 py-7 sm:px-9">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {prompt.titel}
          </h1>
          <p className="mt-2 text-lg text-tief/65">{prompt.beschreibung}</p>

          <div className="mt-7 rounded-2xl bg-sand/80 p-5 ring-1 ring-koralle/15">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-koralle">
              Diese Anweisung geht an das Modell
            </p>
            <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-tief/80">
              {prompt.text}
            </p>
          </div>

          <PromptFormular promptId={prompt.id} />
        </div>
      </div>
    </main>
  );
}
