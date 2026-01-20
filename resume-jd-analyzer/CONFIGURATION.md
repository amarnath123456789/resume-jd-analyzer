# Configuration Guide

## Environment Setup

### Development Environment

1. **Create `.env.local`** from `.env.example`:
```bash
cp .env.example .env.local
```

2. **Configure API Endpoint**:
```env
VITE_API_URL=http://localhost:8000
VITE_ENV=development
```

3. **Start Development Server**:
```bash
npm run dev
```

### Production Environment

1. **Build the Application**:
```bash
npm run build
```

2. **Configure Production API**:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_ENV=production
```

3. **Deploy to Hosting**:
- Vercel: Push to connected Git repository
- Docker: Build and run container
- Traditional: Upload `dist/` folder

## API Configuration

The application expects a backend API with the following endpoint:

### Base URL
```
{VITE_API_URL}/analyze
```

### Request Format
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Timeout**: 60 seconds

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| resume_pdf | File | Yes | Resume PDF file |
| jd_pdf | File | Yes | Job description PDF file |
| experience_level | String | Yes | "junior" \| "mid" \| "senior" |
| role_type | String | Yes | "backend" \| "frontend" \| "fullstack" \| "ml" \| "data" \| "devops" |
| industry | String | Yes | "saas" \| "fintech" \| "ecommerce" \| "healthcare" \| "enterprise" \| "startup" |
| resume_source | String | Yes | "academic" \| "professional" \| "portfolio" |

### Response Format

```json
{
  "overall_match": 75,
  "recommendation": "Strong match for this role",
  "strong_matches": [
    {
      "skill": "Python",
      "evidence": "5 years of production experience with Django and FastAPI"
    }
  ],
  "missing_skills": [
    {
      "skill": "Kubernetes",
      "importance": "High",
      "reason": "Required for container orchestration at this company"
    }
  ],
  "weak_evidence": [
    {
      "skill": "Docker",
      "issue": "Mentioned but lacks specific project examples"
    }
  ],
  "improvement_plan": [
    {
      "action": "Add 2-3 Kubernetes project examples to resume"
    }
  ],
  "final_summary": "Overall assessment and summary of the analysis"
}
```

## Server Configuration

### CORS Setup (Backend)

Your backend API must allow CORS requests from your frontend domain:

```python
# FastAPI example
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://yourdomain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### HTTPS (Production)

Always use HTTPS in production:
```env
VITE_API_URL=https://api.yourdomain.com
```

## Application Settings

### File Upload Limits

The application has the following limits:

- **File Type**: PDF only
- **Recommended Max Size**: 10MB
- **Request Timeout**: 60 seconds

### UI Configuration

Colors can be customized in `src/styles.css`:

```css
:root {
  --color-dark: #303841;
  --color-medium: #3A4750;
  --color-accent: #F6C90E;
  --color-light: #EEEEEE;
  --color-success: #4CAF50;
  --color-danger: #FF6B6B;
  --color-warning: #FFC107;
  --color-info: #2196F3;
}
```

### Build Configuration

Modify `vite.config.js` for:
- **Port**: Change `server.port`
- **Output Directory**: Change `build.outDir`
- **Minification**: Adjust `build.minify`
- **Source Maps**: Toggle `build.sourcemap`

## Deployment Configurations

### Vercel

1. Connect GitHub repository
2. Set environment variable:
   - `VITE_API_URL` = Your API endpoint
3. Deploy automatically on push

### Docker

Create `Dockerfile`:
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
docker run -p 3000:3000 \
  -e VITE_API_URL=https://api.yourdomain.com \
  resume-analyzer
```

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/resume-analyzer/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### AWS S3 + CloudFront

1. Build: `npm run build`
2. Upload `dist/` to S3 bucket
3. Configure CloudFront distribution
4. Set environment variables in CI/CD

## Error Handling

The application handles:

| Error | User Message | Action |
|-------|-------------|--------|
| Missing resume | "Resume file is required" | Show file input error |
| Missing JD | "Job description file is required" | Show file input error |
| Wrong file type | "Please upload a PDF file" | Alert user |
| API unreachable | "Cannot connect to API server..." | Show error message |
| Request timeout | "Request timeout. Please try uploading smaller files." | Suggest action |
| Server error | "Server error. Please try again later." | Retry option |
| Invalid response | "Invalid response from server" | Show error message |

## Troubleshooting

### Blank Page
- Check browser console (F12)
- Verify JavaScript is enabled
- Clear browser cache

### API Connection Error
- Ensure backend is running
- Check `VITE_API_URL` in `.env.local`
- Verify CORS is enabled
- Check network connectivity

### File Upload Fails
- Verify file is PDF
- Check file size (< 10MB recommended)
- Try with smaller file
- Check backend logs

### Performance Issues
- Enable compression on server
- Use CDN for static assets
- Check network tab in DevTools
- Optimize PDF file sizes

## Monitoring

### Key Metrics to Track
- Page load time
- API response time
- File upload success rate
- Error occurrence rate
- User satisfaction scores

### Logging
- Frontend errors (DevTools Console)
- API logs (Backend logs)
- Server logs (Nginx/Apache)
- Error tracking (Sentry/LogRocket)

## Security Checklist

- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] File type validation enabled
- [ ] Input sanitization on backend
- [ ] Rate limiting configured
- [ ] Environment variables secured
- [ ] No sensitive data in frontend code
- [ ] Security headers configured
- [ ] Regular dependency updates

## Support & Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Axios Documentation](https://axios-http.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Last Updated**: January 2026  
**Version**: 1.0.0
