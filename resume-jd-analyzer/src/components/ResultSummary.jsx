export default function ResultSummary({ result }) {
  const overallMatch = result?.overall_match_score || 0;
  const matchPercentage = typeof overallMatch === "number" ? overallMatch : parseInt(overallMatch) || 0;
  
  const getRecommendation = (percentage) => {
    if (percentage >= 80) return "🎯 Excellent Match - Apply Now!";
    if (percentage >= 60) return "✅ Good Match - Strong Candidate";
    if (percentage >= 40) return "⚠️ Fair Match - Address Key Gaps";
    return "❌ Weak Match - Consider Alternatives";
  };

  return (
    <div className="result-card info">
      <h2>📊 Analysis Summary</h2>
      
      <div className="summary-stats">
        <div className="stat-card">
          <p className="stat-value">{matchPercentage}%</p>
          <p className="stat-label">Overall Match</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{result?.strong_matches?.length || 0}</p>
          <p className="stat-label">Strong Matches</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{result?.missing_skills?.length || 0}</p>
          <p className="stat-label">Missing Skills</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{result?.weak_evidence?.length || 0}</p>
          <p className="stat-label">Weak Areas</p>
        </div>
      </div>

      <div className="recommendation-text">
        {getRecommendation(matchPercentage)}
      </div>
      <p style={{ color: "#CCCCCC", fontSize: "14px", lineHeight: "1.6" }}>
        Review the analysis below to understand your fit for this role.
      </p>
    </div>
  );
}
