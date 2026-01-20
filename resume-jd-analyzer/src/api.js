import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 second timeout for file uploads
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 400) {
      throw new Error(error.response.data?.detail || "Invalid request. Please check your files.");
    } else if (error.response?.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try uploading smaller files.");
    } else if (!error.response) {
      throw new Error(
        `Cannot connect to API server. Make sure the backend is running at ${API_URL}`
      );
    }
    throw error;
  }
);

export async function analyzeResume({
  resumeFile,
  jdFile,
  experienceLevel,
  roleType,
  industry,
  resumeSource,
}) {
  if (!resumeFile) {
    throw new Error("Resume file is required");
  }
  if (!jdFile) {
    throw new Error("Job description file is required");
  }

  const formData = new FormData();
  formData.append("resume_pdf", resumeFile);
  formData.append("jd_pdf", jdFile);
  formData.append("experience_level", experienceLevel || "junior");
  formData.append("role_type", roleType || "backend");
  formData.append("industry", industry || "saas");
  formData.append("resume_source", resumeSource || "professional");

  try {
    const response = await apiClient.post("/analyze", formData);
    
    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error) {
    if (error.message) {
      throw error;
    }
    throw new Error("Failed to analyze resume. Please try again.");
  }
}

export function isAPIAvailable() {
  return !!API_URL;
}

export function getAPIUrl() {
  return API_URL;
}
