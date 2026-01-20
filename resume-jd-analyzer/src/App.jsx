import { useState } from "react";
import { analyzeResume } from "./api";
import "./styles.css";

import ResumeInput from "./components/ResumeInput";
import JobDescriptionInput from "./components/JobDescriptionInput";
import LoadingState from "./components/LoadingState";
import ResultSummary from "./components/ResultSummary";
import StrongMatches from "./components/StrongMatches";
import MissingSkills from "./components/MissingSkills";
import WeakEvidence from "./components/WeakEvidence";
import ImprovementPlan from "./components/ImprovementPlan";
import FinalNarrative from "./components/FinalNarrative";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);

  const [experienceLevel, setExperienceLevel] = useState("junior");
  const [roleType, setRoleType] = useState("backend");
  const [industry, setIndustry] = useState("saas");
  const [resumeSource, setResumeSource] = useState("professional");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeResume({
        resumeFile,
        jdFile,
        experienceLevel,
        roleType,
        industry,
        resumeSource
      });
      setResult(data);
    } catch (err) {
  setError(err.message || "Analysis failed. Please try again.");
}

     finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading || !resumeFile || !jdFile;

  return (
    <div className="app-container">
      {/* HEADER */}
      <div className="header">
        <h1 className="title">Resume – Job Description Analyzer</h1>
        <p className="subtitle">
          Upload your resume and job description to receive a detailed gap analysis,
          skill matching insights, and personalized improvement recommendations.
        </p>
      </div>

      {/* INPUT SECTION */}
      <section className="input-section">
        {/* PDF INPUTS */}
        <div className="input-grid">
          <ResumeInput setResumeFile={setResumeFile} />
          <JobDescriptionInput setJdFile={setJdFile} />
        </div>

        {/* CONTEXT DROPDOWNS */}
        <div className="extras">
          <div className="dropdown-grid">
            <label>
              Experience Level
              <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
                <option value="junior">Junior (0–2 yrs)</option>
                <option value="mid">Mid (2–5 yrs)</option>
                <option value="senior">Senior (5+ yrs)</option>
              </select>
            </label>

            <label>
              Target Role
              <select value={roleType} onChange={(e) => setRoleType(e.target.value)}>
                <option value="backend">Backend Engineer</option>
                <option value="frontend">Frontend Engineer</option>
                <option value="fullstack">Full-Stack Engineer</option>
              </select>
            </label>

            <label>
              Industry
              <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="saas">General SaaS</option>
                <option value="fintech">Fintech</option>
                <option value="ecommerce">E-commerce</option>
                <option value="healthcare">Healthcare</option>
                <option value="enterprise">Enterprise / B2B</option>
                <option value="startup">Startup</option>
              </select>
            </label>

            <label>
              Resume Type
              <select value={resumeSource} onChange={(e) => setResumeSource(e.target.value)}>
                <option value="academic">Academic / Student</option>
                <option value="professional">Professional</option>
                <option value="portfolio">Portfolio / Projects</option>
              </select>
            </label>
          </div>
        </div>

        {/* ANALYZE BUTTON */}
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={isDisabled}
        >
          🔍 Analyze Resume
        </button>
      </section>

      {/* STATES */}
      {loading && <LoadingState />}
      {error && <p className="error">⚠️ {error}</p>}

      {/* RESULTS */}
      {result && (
        <div className="results">
          <ResultSummary result={result} />
          <StrongMatches items={result.strong_matches} />
          <MissingSkills items={result.missing_skills} />
          <WeakEvidence items={result.weak_evidence} />
          <ImprovementPlan items={result.improvement_plan} />
          <FinalNarrative text={result.final_summary} />
        </div>
      )}
    </div>
  );
}

export default App;
