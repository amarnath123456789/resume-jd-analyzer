export default function MissingSkills({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="result-card danger">
        <h3>📋 Missing Skills</h3>
        <p style={{ color: "#AAAAAA" }}>No missing critical skills identified.</p>
      </div>
    );
  }

  return (
    <section className="result-card danger">
      <h3>📋 Missing Skills ({items.length})</h3>
      <p style={{ color: "#CCCCCC", marginTop: 0, fontSize: "14px" }}>
        These skills are required but not found in your resume
      </p>
      {items.map((item, idx) => (
        <div key={idx} className="skill-item">
          <div className="skill-name">{item.skill}</div>
          <div className="skill-reason">{item.reason}</div>
          {item.importance && (
            <span className={`skill-importance ${item.importance.toLowerCase()}`}>
              {item.importance}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}
