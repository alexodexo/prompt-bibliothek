"use client";

// Eingabefeld und Absendeknopf für einen Prompt.

import { useState } from "react";
import Ergebnis from "./Ergebnis";

type Props = {
  promptId: string;
};

export default function PromptFormular({ promptId }: Props) {
  const [eingabe, setEingabe] = useState("");
  const [ergebnis, setErgebnis] = useState<string | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);
  const [laedt, setLaedt] = useState(false);

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    setLaedt(true);
    setFehler(null);
    setErgebnis(null);

    try {
      const antwort = await fetch("/api/ausfuehren", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId, eingabe }),
      });
      const daten = await antwort.json();

      if (!antwort.ok) {
        setFehler(daten.fehler ?? "Unbekannter Fehler.");
      } else {
        setErgebnis(daten.ergebnis);
      }
    } catch {
      setFehler("Die Anfrage konnte nicht gesendet werden.");
    } finally {
      setLaedt(false);
    }
  }

  return (
    <>
      <form onSubmit={absenden} className="mt-9">
        <label
          htmlFor="eingabe"
          className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-cyan"
        >
          Dein Text
        </label>
        <textarea
          id="eingabe"
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          rows={9}
          placeholder="Text hier einfügen"
          className="w-full resize-y rounded-xl border border-neonpink/25 bg-nacht/60 p-4 text-[15px] leading-relaxed text-hell outline-none transition placeholder:text-gedaempft/50 focus:border-cyan focus:shadow-[0_0_0_3px_rgba(34,230,245,0.18)]"
        />
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={laedt || eingabe.trim() === ""}
            className="rounded-full bg-gradient-to-r from-magenta via-neonpink to-violett px-9 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_0_28px_-4px_rgba(255,46,139,0.85)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-none disabled:bg-hell/10 disabled:text-gedaempft/60 disabled:shadow-none"
          >
            {laedt ? "läuft" : "Prompt ausführen"}
          </button>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-gedaempft/70">
            {eingabe.trim() === "" ? "Erst Text einfügen" : `${eingabe.length} Zeichen`}
          </span>
        </div>
      </form>

      {laedt && (
        <p className="mt-8 flex items-center gap-3 rounded-xl border border-cyan/30 bg-cyan/10 px-5 py-4 text-[15px] leading-relaxed text-cyan">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan/30 border-t-cyan" />
          Das Modell antwortet …
        </p>
      )}

      {fehler && (
        <p className="mt-8 rounded-xl border border-magenta/50 bg-magenta/10 px-5 py-4 text-[15px] leading-relaxed text-neonpink">
          {fehler}
        </p>
      )}

      {ergebnis && <Ergebnis text={ergebnis} />}
    </>
  );
}
