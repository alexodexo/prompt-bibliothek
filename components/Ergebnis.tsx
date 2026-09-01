// Zeigt die Antwort des Modells an.
//
// Was hier noch fehlt: ein Knopf, mit dem man den Text in die Zwischenablage
// legt. Im Moment muss man ihn mit der Maus markieren.

type Props = {
  text: string;
};

export default function Ergebnis({ text }: Props) {
  return (
    <section className="mt-9">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-tuerkis">
          Ergebnis
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-tuerkis/50 to-transparent" />
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_14px_36px_-26px_rgba(18,205,192,0.9)] ring-1 ring-tuerkis/20">
        <div className="h-1.5 w-full bg-gradient-to-r from-tuerkis to-himmel" />
        <p className="whitespace-pre-wrap px-6 py-5 text-[15px] leading-relaxed text-tief/85">
          {text}
        </p>
      </div>
    </section>
  );
}
