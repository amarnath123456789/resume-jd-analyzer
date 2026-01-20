# Resume – Job Description Analyzer

A modern, production-ready web application that analyzes how well your resume matches a specific job description using AI-powered insights.

## Features

✨ **Smart Analysis**
- Identify strong skill matches between your resume and job description
- Discover missing critical skills needed for the role
- Spot weak evidence areas where your resume needs reinforcement
- Get personalized improvement recommendations

🎨 **Modern UI/UX**
- Beautiful dark-themed interface with yellow accent colors
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Intuitive file upload with validation
- Real-time loading states

⚙️ **Production Ready**
- Comprehensive error handling
- API request validation
- File type validation
- Timeout protection for large uploads
- Environment-based configuration
- ESLint integration for code quality

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Python backend API running (see Backend Setup)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   cd resume-jd-analyzer
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and set your API endpoint:
   ```
   VITE_API_URL=http://localhost:8000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173` (or next available port)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── api.js                  # API client with error handling
├── main.jsx               # React entry point
├── styles.css             # Global styles with theme
├── index.css              # Base styles
├── components/
│   ├── ResumeInput.jsx           # Resume file upload
│   ├── JobDescriptionInput.jsx   # Job description file upload
│   ├── AnalyzeButton.jsx         # Analysis trigger button
│   ├── LoadingState.jsx          # Loading indicator
│   ├── ResultSummary.jsx         # Overall match summary
│   ├── StrongMatches.jsx         # Matching skills
│   ├── MissingSkills.jsx         # Required but missing skills
│   ├── WeakEvidence.jsx          # Poorly supported skills
│   ├── ImprovementPlan.jsx       # Action items
│   └── FinalNarrative.jsx        # AI summary
└── assets/                # Images, icons, etc.
```

## Configuration

### Environment Variables

Create a `.env.local` file from `.env.example`:

```env
# Backend API endpoint
VITE_API_URL=http://localhost:8000

# Environment mode
VITE_ENV=development
```

## API Integration

The frontend expects a backend API with the following endpoint:

### POST `/analyze`

**Request:**
- `resume_pdf` (file): Resume PDF file
- `jd_pdf` (file): Job description PDF file
- `experience_level` (string): "junior" | "mid" | "senior"
- `role_type` (string): "backend" | "frontend" | "fullstack" | "ml" | "data" | "devops"
- `industry` (string): "saas" | "fintech" | "ecommerce" | "healthcare" | "enterprise" | "startup"
- `resume_source` (string): "academic" | "professional" | "portfolio"

**Response:**
```json
{
  "overall_match": 75,
  "recommendation": "Strong match for this role",
  "strong_matches": [
    {"skill": "Python", "evidence": "5 years of production experience..."}
  ],
  "missing_skills": [
    {"skill": "Kubernetes", "importance": "High", "reason": "Required for..."}
  ],
  "weak_evidence": [
    {"skill": "Docker", "issue": "Mentioned but not detailed..."}
  ],
  "improvement_plan": [
    {"action": "Add Kubernetes certifications..."}
  ],
  "final_summary": "Overall assessment..."
}
```

## UI/UX Highlights

### Color Scheme
- **Primary Dark**: `#303841` - Main text and headers
- **Secondary Dark**: `#3A4750` - Accents and backgrounds
- **Accent Gold**: `#F6C90E` - Call-to-action and highlights
- **Light**: `#EEEEEE` - Light backgrounds and cards

### Responsive Breakpoints
- Desktop: 1024px and above
- Tablet: 768px - 1024px
- Mobile: Below 768px

## Development

### Code Quality

Run linter:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint -- --fix
```

### Component Guidelines

- Each component should be in its own file
- Use meaningful component names
- Keep components focused and reusable
- Add PropTypes or JSDoc for documentation

### Error Handling

The app handles:
- Missing or invalid files
- Network timeouts
- API errors
- Server errors
- File validation errors

Users receive clear, actionable error messages.

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:
- `VITE_API_URL`: Your backend API URL

### Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build and run:
```bash
docker build -t resume-analyzer .
docker run -p 3000:3000 -e VITE_API_URL=<api-url> resume-analyzer
```

### Traditional Hosting

1. Build the app: `npm run build`
2. Upload the `dist/` folder to your web server
3. Configure your server to serve `index.html` for all routes
4. Set `VITE_API_URL` environment variable

## Troubleshooting

### "Cannot connect to API server"
- Ensure your backend API is running
- Check `VITE_API_URL` in `.env.local`
- Verify CORS is enabled on your backend

### "Request timeout"
- Check file size (keep under 10MB)
- Ensure stable internet connection
- Verify backend is responsive

### Blank white page
- Check browser console for errors (F12)
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure JavaScript is enabled

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Performance

- Lazy loading for result components
- Optimized CSS with minimal specificity
- Efficient file handling
- Request timeout protection
- Production build optimizations

## Security

- Input validation on all forms
- File type validation (PDF only)
- Secure API communication
- No sensitive data stored locally
- CSP headers recommended

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
1. Check this README
2. Review the error message in the app
3. Check browser console (F12)
4. Create an issue with details

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with React, Vite, and modern web standards.
