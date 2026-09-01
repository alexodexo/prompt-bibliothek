// Zeigt die Antwort des Modells an.
//
// Was hier noch fehlt: ein Knopf, mit dem man den Text in die Zwischenablage
// legt. Im Moment muss man ihn mit der Maus markieren.

type Props = {
  text: string;
};

export default function Ergebnis({ text }: Props) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Ergebnis
      </h2>
      <div className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-white p-4 leading-relaxed text-slate-800">
        {text}
      </div>
    </section>
  );
}
