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
      <form onSubmit={absenden} className="mt-6">
        <label htmlFor="eingabe" className="mb-2 block text-sm font-medium text-slate-700">
          Dein Text
        </label>
        <textarea
          id="eingabe"
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          rows={10}
          placeholder="Text hier einfügen"
          className="w-full rounded-lg border border-slate-300 bg-white p-3 leading-relaxed text-slate-800 outline-none focus:border-slate-500"
        />
        <button
          type="submit"
          disabled={laedt || eingabe.trim() === ""}
          className="mt-3 rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Prompt ausführen
        </button>
      </form>

      {fehler && (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {fehler}
        </p>
      )}

      {ergebnis && <Ergebnis text={ergebnis} />}
    </>
  );
}
