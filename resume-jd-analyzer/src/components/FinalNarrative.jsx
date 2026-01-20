export default function FinalNarrative({ text }) {
  return (
    <section className="final-summary">
      <h2>🎯 Overall AI Assessment</h2>
      <p>{text || "Your analysis is complete. Review the sections above for detailed feedback."}</p>
    </section>
  );
}
