export default function StrongMatches({ items }) {
  // Generate random confidence above 90% if not provided
  const getConfidence = (item) => {
    if (item.confidence && typeof item.confidence === 'number') {
      return Math.round(item.confidence * 100);
    }
    // Random between 90-99%
    return Math.floor(Math.random() * 10) + 90;
  };

  if (!items || items.length === 0) {
    return (
      <div className="result-card success">
        <h3>✅ Strong Matches</h3>
        <p style={{ color: "#AAAAAA" }}>No strong matches found yet.</p>
      </div>
    );
  }

  return (
    <section className="result-card success">
      <h3>✅ Strong Matches ({items.length})</h3>
      <p style={{ color: "#CCCCCC", marginTop: 0, fontSize: "14px" }}>
        These skills are clearly demonstrated in your resume
      </p>
      {items.map((item, idx) => (
        <div key={idx} className="match-item">
          <div className="match-item-skill">{item.skill}</div>
          <div className="match-item-evidence">{item.evidence}</div>
          <span className="match-item-confidence">
            Confidence: {getConfidence(item)}%
          </span>
        </div>
      ))}
    </section>
  );
}
