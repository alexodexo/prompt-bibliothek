// Zeigt die Antwort des Modells an.
//
// Was hier noch fehlt: ein Knopf, mit dem man den Text in die Zwischenablage
// legt. Im Moment muss man ihn mit der Maus markieren.

type Props = {
  text: string;
};

export default function Ergebnis({ text }: Props) {
  return (
    <section className="mt-10">
      <div className="horizont" />
      <h2 className="neon-cyan mt-5 text-xs font-bold uppercase tracking-[0.24em]">
        Ergebnis
      </h2>
      <p className="mt-4 whitespace-pre-wrap rounded-xl border border-cyan/30 bg-nacht/50 p-6 text-[15px] leading-relaxed text-hell/90">
        {text}
      </p>
    </section>
  );
}
