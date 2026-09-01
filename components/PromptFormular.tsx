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
      <form onSubmit={absenden} className="regal mt-8 pt-6">
        <label
          htmlFor="eingabe"
          className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-tinte/45"
        >
          Dein Text
        </label>
        <textarea
          id="eingabe"
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          rows={9}
          placeholder="Text hier einfügen"
          className="w-full resize-y border border-linie bg-stuck/50 p-4 text-[15px] leading-relaxed text-tinte outline-none transition placeholder:text-tinte/30 focus:border-aqua focus:bg-white"
        />
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={laedt || eingabe.trim() === ""}
            className="bg-tinte px-9 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-aqua disabled:cursor-not-allowed disabled:bg-linie disabled:text-tinte/35"
          >
            Prompt ausführen
          </button>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-tinte/35">
            {eingabe.trim() === "" ? "Erst Text einfügen" : `${eingabe.length} Zeichen`}
          </span>
        </div>
      </form>

      {fehler && (
        <p className="mt-8 border-l-4 border-tinte bg-stuck px-5 py-4 text-[15px] leading-relaxed text-tinte/80">
          {fehler}
        </p>
      )}

      {ergebnis && <Ergebnis text={ergebnis} />}
    </>
  );
}
