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
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">
        Zurück zur Übersicht
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{prompt.titel}</h1>
      <p className="mt-2 text-slate-600">{prompt.beschreibung}</p>

      <details className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-medium text-slate-700">
          Anweisung ansehen, die an das Modell geht
        </summary>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {prompt.text}
        </p>
      </details>

      <PromptFormular promptId={prompt.id} />
    </main>
  );
}
