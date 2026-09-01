"use client";

// Eingabefeld und Absendeknopf für einen Prompt.
//
// Was hier noch fehlt: eine Anzeige, solange das Modell antwortet. Der Zustand
// `laedt` ist vorhanden und schaltet den Knopf ab, aber man sieht nicht, dass
// im Hintergrund etwas passiert. Bei längeren Texten wirkt die Seite tot.

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
      <form onSubmit={absenden} className="mt-8">
        <label
          htmlFor="eingabe"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-tief/45"
        >
          Dein Text
        </label>
        <textarea
          id="eingabe"
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          rows={9}
          placeholder="Text hier einfügen"
          className="w-full resize-y rounded-2xl border-2 border-tief/10 bg-white p-4 text-[15px] leading-relaxed text-tief outline-none transition placeholder:text-tief/30 focus:border-koralle focus:ring-4 focus:ring-koralle/15"
        />
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={laedt || eingabe.trim() === ""}
            className="rounded-full bg-gradient-to-r from-pink to-koralle px-8 py-3 font-bold text-white shadow-[0_12px_28px_-12px_rgba(255,46,147,0.9)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-none disabled:bg-tief/15 disabled:text-tief/40 disabled:shadow-none"
          >
            Prompt ausführen
          </button>
          <span className="text-sm text-tief/40">
            {eingabe.trim() === "" ? "Erst Text einfügen" : `${eingabe.length} Zeichen`}
          </span>
        </div>
      </form>

      {fehler && (
        <p className="mt-7 rounded-2xl border-2 border-pink/25 bg-pink/5 p-5 leading-relaxed text-pink">
          {fehler}
        </p>
      )}

      {ergebnis && <Ergebnis text={ergebnis} />}
    </>
  );
}
