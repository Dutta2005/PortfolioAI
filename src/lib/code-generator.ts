import { ParsedResumeData } from './resume-parser'
import { generateTemplatePortfolio } from './template-portfolio-generator'

export interface CodeFile {
  name: string
  content: string
  language: string
}

export function generatePortfolioCode(data: ParsedResumeData): CodeFile[] {
  const files: CodeFile[] = []

  // Generate template-based portfolio
  const templatePortfolio = generateTemplatePortfolio(data)

  // Generate HTML file
  files.push({
    name: 'index.html',
    content: templatePortfolio.html,
    language: 'html'
  })

  // Generate CSS file
  files.push({
    name: 'styles.css',
    content: templatePortfolio.css,
    language: 'css'
  })

  // Generate JavaScript file
  files.push({
    name: 'script.js',
    content: templatePortfolio.javascript,
    language: 'javascript'
  })

  // Generate package.json for easy setup
  files.push({
    name: 'package.json',
    content: generatePackageJson(data.personalInfo.name),
    language: 'json'
  })

  // Generate README
  files.push({
    name: 'README.md',
    content: generateReadme(data.personalInfo.name, data.profession?.category || 'Professional'),
    language: 'markdown'
  })

  return files
}

function generateHTML(data: ParsedResumeData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name} - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Header Section -->
    <header class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">${data.personalInfo.name}</h1>
                <p class="hero-subtitle">${data.summary}</p>
                <div class="contact-info">
                    ${data.personalInfo.email ? `<div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${data.personalInfo.email}</span>
                    </div>` : ''}
                    ${data.personalInfo.phone ? `<div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${data.personalInfo.phone}</span>
                    </div>` : ''}
                    ${data.personalInfo.location ? `<div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${data.personalInfo.location}</span>
                    </div>` : ''}
                    ${data.personalInfo.linkedin ? `<div class="contact-item">
                        <i class="fab fa-linkedin"></i>
                        <a href="${data.personalInfo.linkedin}" target="_blank">LinkedIn</a>
                    </div>` : ''}
                    ${data.personalInfo.github ? `<div class="contact-item">
                        <i class="fab fa-github"></i>
                        <a href="${data.personalInfo.github}" target="_blank">GitHub</a>
                    </div>` : ''}
                </div>
            </div>
        </div>
    </header>

    <main class="container">
        ${data.experience.length > 0 ? `
        <!-- Experience Section -->
        <section class="section">
            <h2 class="section-title">Experience</h2>
            <div class="experience-list">
                ${data.experience.map(exp => `
                <div class="experience-item">
                    <div class="experience-header">
                        <div>
                            <h3 class="experience-title">${exp.position}</h3>
                            <p class="experience-company">${exp.company}</p>
                        </div>
                        <span class="experience-duration">${exp.duration}</span>
                    </div>
                    <p class="experience-description">${exp.description}</p>
                    ${exp.achievements.length > 0 ? `
                    <ul class="experience-achievements">
                        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                    ` : ''}
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${data.projects.length > 0 ? `
        <!-- Projects Section -->
        <section class="section">
            <h2 class="section-title">Projects</h2>
            <div class="projects-grid">
                ${data.projects.map(project => `
                <div class="project-card">
                    <div class="project-header">
                        <h3 class="project-title">${project.name}</h3>
                        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>` : ''}
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        <!-- Skills Section -->
        <section class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
                ${data.skills.technical.length > 0 ? `
                <div class="skills-category">
                    <h3 class="skills-category-title">Technical Skills</h3>
                    <div class="skills-list">
                        ${data.skills.technical.map(skill => `<span class="skill-tag technical">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                ${data.skills.soft.length > 0 ? `
                <div class="skills-category">
                    <h3 class="skills-category-title">Soft Skills</h3>
                    <div class="skills-list">
                        ${data.skills.soft.map(skill => `<span class="skill-tag soft">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </section>

        ${data.education.length > 0 ? `
        <!-- Education Section -->
        <section class="section">
            <h2 class="section-title">Education</h2>
            <div class="education-list">
                ${data.education.map(edu => `
                <div class="education-item">
                    <div class="education-header">
                        <div>
                            <h3 class="education-degree">${edu.degree} in ${edu.field}</h3>
                            <p class="education-institution">${edu.institution}</p>
                        </div>
                        <div class="education-details">
                            <span class="education-year">${edu.year}</span>
                            ${edu.gpa ? `<p class="education-gpa">GPA: ${edu.gpa}</p>` : ''}
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${data.certifications.length > 0 ? `
        <!-- Certifications Section -->
        <section class="section">
            <h2 class="section-title">Certifications</h2>
            <div class="certifications-grid">
                ${data.certifications.map(cert => `
                <div class="certification-card">
                    <h3 class="certification-name">${cert.name}</h3>
                    <p class="certification-issuer">${cert.issuer}</p>
                    <p class="certification-date">${cert.date}</p>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}
    </main>

    <script src="script.js"></script>
</body>
</html>`
}

function generateCSS(template: string): string {
  return `/* Modern Portfolio Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 80px 0;
    text-align: center;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    font-size: 0.9rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.contact-item a {
    color: white;
    text-decoration: none;
}

.contact-item a:hover {
    text-decoration: underline;
}

/* Section Styles */
.section {
    margin: 4rem 0;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #2d3748;
    text-align: center;
}

/* Experience Styles */
.experience-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.experience-item {
    background: #f7fafc;
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.experience-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
}

.experience-company {
    font-size: 1.1rem;
    color: #667eea;
    font-weight: 500;
}

.experience-duration {
    color: #718096;
    font-size: 0.9rem;
}

.experience-description {
    color: #4a5568;
    margin-bottom: 1rem;
}

.experience-achievements {
    list-style: none;
    padding-left: 0;
}

.experience-achievements li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    color: #4a5568;
}

.experience-achievements li::before {
    content: '•';
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
}

/* Projects Styles */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.project-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
}

.project-link {
    color: #667eea;
    text-decoration: none;
}

.project-description {
    color: #4a5568;
    margin-bottom: 1.5rem;
}

.project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background: #e6fffa;
    color: #234e52;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

/* Skills Styles */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.skills-category-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2d3748;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.skill-tag {
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 500;
}

.skill-tag.technical {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
}

.skill-tag.soft {
    background: #f7fafc;
    color: #2d3748;
    border: 1px solid #e2e8f0;
}

/* Education Styles */
.education-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.education-item {
    background: #f7fafc;
    padding: 2rem;
    border-radius: 12px;
}

.education-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.education-degree {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
}

.education-institution {
    color: #667eea;
    font-weight: 500;
}

.education-details {
    text-align: right;
}

.education-year {
    color: #718096;
}

.education-gpa {
    font-size: 0.9rem;
    color: #718096;
}

/* Certifications Styles */
.certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.certification-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
}

.certification-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
}

.certification-issuer {
    color: #667eea;
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.certification-date {
    color: #718096;
    font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .contact-info {
        flex-direction: column;
        gap: 1rem;
    }
    
    .experience-header,
    .education-header {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .project-header {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .education-details {
        text-align: left;
    }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.section {
    animation: fadeInUp 0.6s ease-out;
}`
}

function generateJS(): string {
  return `// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click to copy email functionality
    const emailElements = document.querySelectorAll('.contact-item:has(.fa-envelope) span');
    emailElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.title = 'Click to copy email';
        
        element.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            });
        });
    });

    console.log('Portfolio loaded successfully!');
});`
}

function generatePackageJson(name: string): string {
  return JSON.stringify({
    name: `${name.toLowerCase().replace(/\s+/g, '-')}-portfolio`,
    version: "1.0.0",
    description: `Portfolio website for ${name}`,
    main: "index.html",
    scripts: {
      start: "python -m http.server 8000",
      serve: "npx serve ."
    },
    keywords: ["portfolio", "website", "personal"],
    author: name,
    license: "MIT"
  }, null, 2)
}

function generateReadme(name: string, profession: string): string {
  return `# ${name}'s Portfolio

A modern, responsive portfolio website showcasing professional experience, projects, and skills in ${profession}.

## Features

- AI-generated design tailored for ${profession}
- Responsive design that works on all devices
- Modern animations and smooth transitions
- Interactive elements and hover effects
- Profession-specific styling and layout
- Clean, professional presentation
- Easy to customize and maintain

## Getting Started

### Option 1: Simple HTTP Server (Python)
\`\`\`bash
python -m http.server 8000
\`\`\`
Then open http://localhost:8000 in your browser.

### Option 2: Using Node.js serve
\`\`\`bash
npm install -g serve
serve .
\`\`\`

### Option 3: Live Server (VS Code Extension)
If you're using VS Code, install the "Live Server" extension and right-click on index.html to select "Open with Live Server".

## Customization

- **Colors**: Edit the CSS variables in \`styles.css\` to change the color scheme
- **Content**: Update the HTML content in \`index.html\`
- **Fonts**: Change the font family in the CSS file
- **Layout**: Modify the grid layouts and spacing as needed

## File Structure

- \`index.html\` - Main HTML file with your portfolio content
- \`styles.css\` - All styling and responsive design
- \`script.js\` - Interactive features and animations
- \`package.json\` - Project configuration
- \`README.md\` - This file

## Browser Support

This portfolio works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT License - feel free to use this template for your own portfolio!
`
}