"use client";

// Zeigt die Antwort des Modells an.

import { useState } from "react";

type Props = {
  text: string;
};

export default function Ergebnis({ text }: Props) {
  const [kopiert, setKopiert] = useState(false);

  async function kopieren() {
    try {
      await navigator.clipboard.writeText(text);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch {
      setKopiert(false);
    }
  }

  return (
    <section className="mt-10">
      <div className="horizont" />
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="neon-cyan text-xs font-bold uppercase tracking-[0.24em]">
          Ergebnis
        </h2>
        <button
          type="button"
          onClick={kopieren}
          className="rounded-full border border-cyan/40 bg-nacht/60 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan transition hover:border-cyan hover:brightness-110"
        >
          {kopiert ? "kopiert" : "kopieren"}
        </button>
      </div>
      <p className="mt-4 whitespace-pre-wrap rounded-xl border border-cyan/30 bg-nacht/50 p-6 text-[15px] leading-relaxed text-hell/90">
        {text}
      </p>
    </section>
  );
}
