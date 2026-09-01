import { findePrompt } from "@/data/prompts";

const EUROUTER_URL = "https://api.eurouter.ai/api/v1/chat/completions";
const MODELL = process.env.EUROUTER_MODELL ?? "mistral-large-3";

export async function POST(request: Request) {
  const schluessel = process.env.EUROUTER_API_KEY;

  if (!schluessel) {
    return Response.json(
      {
        fehler:
          "In der Datei .env.local fehlt der Eintrag EUROUTER_API_KEY. Lege die Datei an, trage deinen Schlüssel ein und starte den Entwicklungsserver neu.",
      },
      { status: 500 },
    );
  }

  let promptId: unknown;
  let eingabe: unknown;
  try {
    const koerper = await request.json();
    promptId = koerper.promptId;
    eingabe = koerper.eingabe;
  } catch {
    return Response.json({ fehler: "Die Anfrage war nicht lesbar." }, { status: 400 });
  }

  if (typeof promptId !== "string" || typeof eingabe !== "string" || eingabe.trim() === "") {
    return Response.json({ fehler: "Es fehlt ein Text zum Bearbeiten." }, { status: 400 });
  }

  const prompt = findePrompt(promptId);
  if (!prompt) {
    return Response.json({ fehler: `Den Prompt "${promptId}" gibt es nicht.` }, { status: 404 });
  }

  try {
    const antwort = await fetch(EUROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${schluessel}`,
      },
      body: JSON.stringify({
        model: MODELL,
        messages: [
          { role: "system", content: prompt.text },
          { role: "user", content: eingabe },
        ],
      }),
    });

    if (!antwort.ok) {
      const text = await antwort.text();
      if (antwort.status === 401 || antwort.status === 403) {
        return Response.json(
          { fehler: "Der Schlüssel wurde abgelehnt. Prüfe den Wert von EUROUTER_API_KEY in deiner .env.local." },
          { status: 502 },
        );
      }
      return Response.json(
        { fehler: `EUrouter hat mit Status ${antwort.status} geantwortet: ${text.slice(0, 300)}` },
        { status: 502 },
      );
    }

    const daten = await antwort.json();
    const ergebnis: string | undefined = daten?.choices?.[0]?.message?.content;

    if (!ergebnis) {
      return Response.json({ fehler: "Die Antwort enthielt keinen Text." }, { status: 502 });
    }

    return Response.json({ ergebnis });
  } catch (e) {
    const grund = e instanceof Error ? e.message : String(e);
    return Response.json(
      { fehler: `EUrouter war nicht erreichbar: ${grund}` },
      { status: 502 },
    );
  }
}
