import { useState } from "react";

export default function JobDescriptionInput({ setJdFile }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (file) => {
    if (file.size > 5 * 1024 * 1024) {
  alert("File size must be under 5MB");
  return;
}

    if (file) {
      if (file.type === "application/pdf") {
        setJdFile(file);
        setFileName(file.name);
      } else {
        alert("Please upload a PDF file");
        setFileName("");
      }
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="card">
      <h3>💼 Job Description</h3>
      <p className="hint">Upload the job description as a PDF file or drag and drop</p>
      
      <div
        className={`file-drop-zone ${dragActive ? "drag-over" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="jd-input"
          accept=".pdf"
          onChange={handleChange}
        />
        <label htmlFor="jd-input" style={{ cursor: "pointer", margin: 0 }}>
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>📂</div>
          <div style={{ color: "var(--color-light)", marginBottom: "5px" }}>
            {fileName ? `✓ ${fileName}` : "Drop job description here"}
          </div>
          <div style={{ fontSize: "12px", color: "#888" }}>
            or click to select a PDF
          </div>
        </label>
      </div>
    </div>
  );
}
