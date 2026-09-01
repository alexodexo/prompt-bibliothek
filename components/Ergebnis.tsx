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
      <div className="eyebrow-schmal w-16" />
      <h2 className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-aqua">
        Ergebnis
      </h2>
      <p className="mt-4 whitespace-pre-wrap border border-linie bg-white p-6 text-[15px] leading-relaxed text-tinte/85">
        {text}
      </p>
    </section>
  );
}
