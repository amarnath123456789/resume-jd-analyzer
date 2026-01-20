# Resume – Job Description Analyzer

A production-ready web application that analyzes how well your resume matches a specific job description using intelligent gap analysis and personalized recommendations.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python backend API (see backend repository)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local

# 3. Update API endpoint in .env.local
# VITE_API_URL=http://localhost:8000

# 4. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## ✨ Features

- **Smart Resume Analysis**: AI-powered matching against job descriptions
- **Skill Gap Analysis**: Identify missing and weak areas
- **Personalized Recommendations**: Actionable improvement suggestions
- **Modern UI**: Beautiful dark theme with responsive design
- **Production Ready**: Error handling, validation, and optimization
- **Fast Performance**: Built with React and Vite

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ResumeInput.jsx
│   ├── JobDescriptionInput.jsx
│   ├── ResultSummary.jsx
│   ├── StrongMatches.jsx
│   ├── MissingSkills.jsx
│   ├── WeakEvidence.jsx
│   ├── ImprovementPlan.jsx
│   ├── FinalNarrative.jsx
│   ├── AnalyzeButton.jsx
│   └── LoadingState.jsx
├── App.jsx              # Main application
├── api.js               # API client
├── main.jsx             # Entry point
├── styles.css           # Global styles
└── index.css            # Base styles
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Environment Variables

Create `.env.local` with:
```env
VITE_API_URL=http://localhost:8000
VITE_ENV=development
```

## 📚 API Integration

The app communicates with a backend API. See [DEPLOYMENT.md](./DEPLOYMENT.md) for API specifications.

## 🎨 Design System

**Colors:**
- Primary Dark: `#303841`
- Secondary Dark: `#3A4750`
- Accent Gold: `#F6C90E`
- Light: `#EEEEEE`

**Responsive Breakpoints:**
- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🔧 Configuration

### Build for Production

```bash
npm run build
# Output: dist/ directory ready for deployment
```

### Deployment Options

1. **Vercel** (recommended)
   ```bash
   vercel
   ```

2. **Docker**
   ```bash
   docker build -t resume-analyzer .
   docker run -p 3000:3000 resume-analyzer
   ```

3. **Traditional Hosting**
   - Upload `dist/` folder
   - Configure server for SPA routing

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🐛 Troubleshooting

**Blank white page?**
- Check browser console (F12)
- Verify API URL in `.env.local`
- Clear browser cache

**API connection errors?**
- Ensure backend is running at `VITE_API_URL`
- Check CORS is enabled on backend
- Verify network connectivity

**File upload issues?**
- Ensure files are PDFs
- Check file size (recommended < 10MB)
- Verify backend supports multipart uploads

## 📖 Additional Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment guide and API specs
- **[React Documentation](https://react.dev)** - React concepts and patterns
- **[Vite Documentation](https://vitejs.dev)** - Build and optimization details

## 🤝 Contributing

We welcome contributions! Please:
1. Follow the code structure
2. Test your changes
3. Run `npm run lint` before committing
4. Submit pull requests with clear descriptions

## 📄 License

MIT License - See LICENSE file for details

---

**Tech Stack:** React 19 • Vite • Axios • Modern CSS

**Version:** 1.0.0 (Production Ready)
