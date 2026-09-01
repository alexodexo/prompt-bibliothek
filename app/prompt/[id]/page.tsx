import Link from "next/link";
import { notFound } from "next/navigation";
import { findePrompt, prompts } from "@/data/prompts";
import PromptFormular from "@/components/PromptFormular";

export function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

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
        className="text-xs font-bold uppercase tracking-[0.2em] text-tinte/45 transition hover:text-aqua"
      >
        ← Alle Prompts
      </Link>

      <article className="mt-6 border border-linie bg-white">
        <div className="eyebrow" />
        <div className="px-8 py-9 sm:px-10">
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.025em] sm:text-5xl">
            {prompt.titel}
          </h1>
          <p className="mt-3 text-lg text-tinte/60">{prompt.beschreibung}</p>

          <div className="regal mt-8 pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-aqua">
              Diese Anweisung geht an das Modell
            </p>
            <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-tinte/75">
              {prompt.text}
            </p>
          </div>

          <PromptFormular promptId={prompt.id} />
        </div>
      </article>
    </main>
  );
}
