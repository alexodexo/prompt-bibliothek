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
    <main className="mx-auto w-full max-w-3xl px-6 pb-28 pt-12">
      <Link
        href="/"
        className="text-xs font-bold uppercase tracking-[0.22em] text-gedaempft transition hover:text-cyan"
      >
        ← Alle Prompts
      </Link>

      <article className="glas glas-cyan mt-6 rounded-2xl px-8 py-9 sm:px-10">
        <h1 className="neon-titel text-4xl font-black uppercase italic leading-[0.92] tracking-[-0.025em] sm:text-5xl">
          {prompt.titel}
        </h1>
        <p className="mt-3 text-lg text-neonpink">{prompt.beschreibung}</p>

        <div className="horizont mt-8" />

        <div className="mt-7">
          <p className="neon-cyan text-xs font-bold uppercase tracking-[0.24em]">
            Diese Anweisung geht an das Modell
          </p>
          <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-hell/85">
            {prompt.text}
          </p>
        </div>

        <PromptFormular promptId={prompt.id} />
      </article>
    </main>
  );
}
