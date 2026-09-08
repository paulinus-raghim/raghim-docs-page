# Raghim AI Enterprise Agent Platform Documentation

This repository contains the complete documentation for the Raghim AI Enterprise Agent Platform, designed to be deployed as GitHub Pages at `doc.raghim.com`.

## Overview

The Raghim AI Enterprise Agent Platform is a comprehensive AI-powered platform for document processing, knowledge management, and intelligent question-answering. This documentation provides complete guides for deployment, API usage, troubleshooting, and system administration.

## Documentation Structure

```
docs-github-pages/
├── index.html                 # Main landing page
├── deployment-guide.html      # Complete deployment guide
├── api-reference.html         # API documentation
├── troubleshooting.html      # Troubleshooting guide
├── security-guide.html       # Security documentation
├── assets/
│   ├── css/
│   │   └── style.css         # Professional styling
│   ├── js/
│   │   └── script.js         # Interactive functionality
│   └── images/
│       ├── logo192.png        # Raghim AI logo (192x192)
│       └── logo512.png        # Raghim AI logo (512x512)
└── README.md                  # This file
```

## Features

### Professional Design
- Clean, modern interface with professional styling
- Responsive design for all devices
- Raghim AI branding and logos integrated
- Smooth navigation and user experience

### Comprehensive Content
- **System Overview**: Complete feature overview and architecture
- **Deployment Guide**: Step-by-step deployment instructions
- **API Reference**: Complete API documentation with examples
- **Troubleshooting**: Common issues and solutions
- **Security Guide**: Security features and best practices

### Interactive Elements
- Smooth scrolling navigation
- Mobile-responsive hamburger menu
- Code syntax highlighting
- Copy-to-clipboard functionality
- Search functionality (ready for implementation)

## System Architecture

The Enterprise Agent Platform consists of:

- **Frontend**: React application with Nginx proxy
- **Backend**: FastAPI-based Python application
- **Database**: PostgreSQL + Redis + pgvector
- **AI Models**: OpenAI-compatible model provider integration
- **Deployment**: Docker containerized with offline packages

## Key Features Documented

### Document Processing
- Multi-format support (PDF, DOCX, TXT, MD)
- OCR capabilities for scanned documents
- Intelligent document chunking and indexing
- Metadata extraction and management

### AI Integration
- LLM provider integration for managed and self-hosted deployments
- pgvector vector database for similarity search
- Multi-language support and translation
- Streaming responses and real-time processing

### Enterprise Features
- JWT-based authentication and authorization
- Role-based access control (RBAC)
- Live chat system with agent handoff
- Banking/financial document processing
- Widget embedding system
- Organization-level management

### Security & Compliance
- Client-side encryption for sensitive data
- Comprehensive audit logging
- IP whitelisting and rate limiting
- Data retention policies
- Compliance reporting

## Deployment Options

### Offline Enterprise Package
- Complete self-contained deployment
- Interactive installer with guided setup
- Non-interactive deployment for CI/CD
- All dependencies included

### Cloud Deployment
- VastAI integration with SSH tunnels
- External GPU deployment via a bundled SSH-tunnel service (VastAI, RunPod, or any custom GPU host)
- AWS EC2 and Google Cloud Platform
- External GPU support for enhanced performance

## API Endpoints

The documentation covers all major API endpoints:

- **Authentication**: Login, registration, user management
- **Document Management**: Upload, search, collection management
- **Chat & AI**: Interactive chat, conversation history
- **Live Chat**: Real-time messaging, agent handoff
- **Banking Integration**: Financial document processing
- **Admin Functions**: User management, system metrics
- **Analytics**: Usage analytics, conversation analytics
- **Widgets**: Widget creation and embedding

## Getting Started

1. **View Documentation**: Open `index.html` in your browser
2. **Deploy to GitHub Pages**: 
   - Create a new repository (e.g., `docs-raghimai`)
   - Upload all files to the repository
   - Enable GitHub Pages in repository settings
   - The `CNAME` file automatically configures `doc.raghim.com`

3. **Local Development**:
   ```bash
   # Serve locally for testing
   python -m http.server 8000
   # Open http://localhost:8000
   ```

4. **GitHub Pages Setup**:
   ```bash
   # Clone and setup repository
   git clone https://github.com/yourusername/docs-raghimai.git
   cd docs-raghimai
   
   # Copy documentation files
   cp -r /path/to/docs-github-pages/* .
   
   # Commit and push
   git add .
   git commit -m "Initial Raghim AI documentation"
   git push origin main
   ```

5. **DNS Configuration**:
   - Add CNAME record: `doc.raghim.com` → `yourusername.github.io`
   - Or A records pointing to GitHub Pages IPs

## Customization

### Branding
- Update logos in `assets/images/`
- Modify colors in CSS variables (`:root` section)
- Update company information in footer sections

### Content
- Add new pages by following the existing structure
- Update navigation menus in all HTML files
- Modify API examples and code snippets

### Styling
- Professional CSS with CSS Grid and Flexbox
- Responsive design with mobile-first approach
- Print-friendly styles included
- Dark mode ready (CSS variables prepared)

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized CSS and JavaScript
- Lazy loading for images
- Smooth animations and transitions
- Fast loading times
- SEO-friendly structure

## Contributing

To update the documentation:

1. Edit the relevant HTML files
2. Update CSS if needed
3. Test locally
4. Commit changes to repository
5. GitHub Pages will auto-deploy

## Support

For technical support or questions about the documentation:

- Email: contact@raghim.com
- Technical Support: Available for Enterprise customers
- Documentation Issues: Create GitHub issues

## License

This documentation is part of the Raghim AI Enterprise Agent Platform, © 2026 Raghim SARL. All rights reserved. Use is governed by the LICENSE file in this repository and your enterprise agreement with Raghim SARL.

---

**Raghim AI Enterprise Agent Platform v2.0.20**  
*Professional AI-powered document processing and knowledge management platform*
