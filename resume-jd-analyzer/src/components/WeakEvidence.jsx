export default function WeakEvidence({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="result-card warning">
        <h3>⚠️ Weak Evidence</h3>
        <p style={{ color: "#AAAAAA" }}>No weakly supported skills found.</p>
      </div>
    );
  }

  return (
    <section className="result-card warning">
      <h3>⚠️ Weak Evidence ({items.length})</h3>
      <p style={{ color: "#CCCCCC", marginTop: 0, fontSize: "14px" }}>
        These skills are mentioned but lack strong supporting evidence
      </p>
      {items.map((item, idx) => (
        <div key={idx} className="weak-evidence-item">
          <div className="weak-skill-name">{item.skill}</div>
          <div className="weak-skill-issue">{item.issue || item.reason}</div>
          {item.suggested_fix && (
            <div className="weak-skill-fix">💡 {item.suggested_fix}</div>
          )}
        </div>
      ))}
    </section>
  );
}
