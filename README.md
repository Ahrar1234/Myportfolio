# Ahrar Ahmad - Portfolio Website

A modern, responsive portfolio website showcasing my skills, experience, and projects as a B.Tech CSE student and software engineer.

## 🌟 Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Smooth Animations**: Fade-in effects and smooth scrolling navigation
- **Interactive Contact Form**: Client-side validation and user feedback
- **Modern UI**: Built with Tailwind CSS for clean, professional appearance
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Deployment**: Docker + Nginx
- **CI/CD**: Jenkins Pipeline
- **Hosting**: Containerized deployment

## 📁 Project Structure

```
my-portfolio/
├── css/
│   └── style.css          # Custom styles and animations
├── js/
│   └── script.js          # Interactive functionality
├── index.html             # Main HTML file
├── Dockerfile             # Docker configuration
├── Jenkinsfile           # CI/CD pipeline
└── README.md             # Project documentation
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd my-portfolio
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t portfolio-website .
```

2. Run the container:
```bash
docker run -d --name portfolio-container -p 3000:8080 portfolio-website
```

3. Access the website at `http://localhost:3000`

### Jenkins CI/CD

The project includes a complete Jenkins pipeline that:
- Builds Docker images
- Runs tests
- Deploys to containers
- Verifies deployment
- Cleans up old images

## 📱 Sections

- **Home**: Hero section with introduction
- **About**: Professional summary and background
- **Skills**: Technical and soft skills categorized
- **Experience**: Professional work experience at Namifyx
- **Projects**: Featured projects and achievements
- **Education**: Academic background
- **Contact**: Contact form and information

## 🎨 Customization

### Theme Configuration
The website supports both light and dark themes. Theme preference is saved in localStorage and respects system preferences.

### Content Updates
Update personal information in `index.html`:
- Personal details in the hero section
- Skills in the skills section
- Experience and projects
- Contact information

### Styling
Custom styles are in `css/style.css`. The project uses Tailwind CSS for utility-first styling.

## 🔧 Development

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add navigation link
3. Update JavaScript for smooth scrolling
4. Add custom styles if needed

### Performance Optimization
- Images are optimized for web
- CSS and JS are minified for production
- Lazy loading for animations

## 📞 Contact

**Ahrar Ahmad**
- Email: ahharahmad108@gmail.com
- Phone: +91 8235155788
- Location: Greater Noida, India

## 📄 License

© 2025 Ahrar Ahmad. All rights reserved.
