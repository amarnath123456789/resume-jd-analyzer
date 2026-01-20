export default function ImprovementPlan({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="result-card info">
        <h3>🎯 Improvement Plan</h3>
        <p style={{ color: "#AAAAAA" }}>No improvements needed.</p>
      </div>
    );
  }

  return (
    <section className="result-card info">
      <h3>🎯 Improvement Plan ({items.length} actions)</h3>
      <p style={{ color: "#CCCCCC", marginTop: 0, fontSize: "14px" }}>
        Here's what you can do to strengthen your application
      </p>
      {items.map((item, idx) => (
        <div key={idx} className="improvement-item">
          <div className="improvement-action">{item.action || item}</div>
          {item.linked_skill && (
            <div className="improvement-meta">Linked Skill: <strong>{item.linked_skill}</strong></div>
          )}
          <div>
            {item.estimated_effort && (
              <span className={`effort-badge ${item.estimated_effort.toLowerCase()}`}>
                {item.estimated_effort} effort
              </span>
            )}
            {item.resume_impact && (
              <span className={`impact-badge ${item.resume_impact.toLowerCase()}`}>
                {item.resume_impact} impact
              </span>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
