import { ParsedResumeData } from './resume-parser';

export interface GeneratedPortfolio {
  html: string;
  css: string;
  javascript: string;
}

function inferProfessionFromData(data: ParsedResumeData): string {
  // Try to infer profession from job titles
  const positions = data.experience.map(exp => exp.position.toLowerCase());
  const education = data.education.map(edu => edu.field.toLowerCase());
  const skills = [...data.skills.technical, ...data.skills.soft].map(skill => skill.toLowerCase());
  
  const allText = [...positions, ...education, ...skills].join(' ');
  
  // Software/Tech Engineering
  if (allText.includes('software') || allText.includes('developer') || allText.includes('programmer') || (allText.includes('engineer') && (allText.includes('web') || allText.includes('frontend') || allText.includes('backend') || allText.includes('full stack') || allText.includes('fullstack')))) {
    return 'Software Engineer';
  }
  
  // Civil Engineering
  if (allText.includes('civil') && allText.includes('engineer')) {
    return 'Civil Engineer';
  }
  
  // Electrical Engineering
  if ((allText.includes('electrical') || allText.includes('electric')) && allText.includes('engineer')) {
    return 'Electrical Engineer';
  }
  
  // Electronics and Telecommunication Engineering
  if ((allText.includes('electronics') || allText.includes('telecommunication') || allText.includes('telecom') || allText.includes('ece') || allText.includes('etc')) && allText.includes('engineer')) {
    return 'Electronics Engineer';
  }
  
  // Mechanical Engineering
  if (allText.includes('mechanical') && allText.includes('engineer')) {
    return 'Mechanical Engineer';
  }
  
  // Chemical Engineering
  if (allText.includes('chemical') && allText.includes('engineer')) {
    return 'Chemical Engineer';
  }
  
  // Aerospace Engineering
  if ((allText.includes('aerospace') || allText.includes('aeronautical') || allText.includes('aviation')) && allText.includes('engineer')) {
    return 'Aerospace Engineer';
  }
  
  // Biomedical Engineering
  if ((allText.includes('biomedical') || allText.includes('bioengineering') || allText.includes('bio')) && allText.includes('engineer')) {
    return 'Biomedical Engineer';
  }
  
  // Environmental Engineering
  if (allText.includes('environmental') && allText.includes('engineer')) {
    return 'Environmental Engineer';
  }
  
  // Industrial Engineering
  if (allText.includes('industrial') && allText.includes('engineer')) {
    return 'Industrial Engineer';
  }
  
  // Computer Engineering
  if (allText.includes('computer') && allText.includes('engineer')) {
    return 'Computer Engineer';
  }
  
  // Petroleum Engineering
  if ((allText.includes('petroleum') || allText.includes('oil') || allText.includes('gas')) && allText.includes('engineer')) {
    return 'Petroleum Engineer';
  }
  
  // Mining Engineering
  if (allText.includes('mining') && allText.includes('engineer')) {
    return 'Mining Engineer';
  }
  
  // Materials Engineering
  if ((allText.includes('materials') || allText.includes('metallurgical') || allText.includes('metallurgy')) && allText.includes('engineer')) {
    return 'Materials Engineer';
  }
  
  // Nuclear Engineering
  if (allText.includes('nuclear') && allText.includes('engineer')) {
    return 'Nuclear Engineer';
  }
  
  // Agricultural Engineering
  if ((allText.includes('agricultural') || allText.includes('agriculture')) && allText.includes('engineer')) {
    return 'Agricultural Engineer';
  }
  
  // Marine Engineering
  if ((allText.includes('marine') || allText.includes('naval') || allText.includes('ocean')) && allText.includes('engineer')) {
    return 'Marine Engineer';
  }
  
  // Generic Engineering (if engineer is mentioned but no specific field)
  if (allText.includes('engineer') && !allText.includes('train')) {
    return 'Engineer';
  }
  
  // Design fields
  if (allText.includes('design') || allText.includes('graphic') || allText.includes('ui') || allText.includes('ux')) {
    return 'Designer';
  }
  
  // Business/Marketing
  if (allText.includes('marketing') || allText.includes('sales') || allText.includes('business')) {
    return 'Marketing Professional';
  }
  
  // Healthcare
  if (allText.includes('doctor') || allText.includes('medical') || allText.includes('nurse') || allText.includes('healthcare')) {
    return 'Healthcare Professional';
  }
  
  // Education
  if (allText.includes('teacher') || allText.includes('professor') || allText.includes('education') || allText.includes('academic')) {
    return 'Educator';
  }
  
  return 'Professional';
}

export function generateTemplatePortfolio(data: ParsedResumeData): GeneratedPortfolio {
  // Determine profession from data or infer from experience/education
  const profession = data.profession?.category || 
                    inferProfessionFromData(data) || 
                    'Professional';
  
  console.log('Generating template-based portfolio for profession:', profession);
  
  const config = getProfessionConfig(profession);
  
  const html = generateHTML(data, config);
  const css = generateCSS(config);
  const javascript = generateJavaScript();
  
  return { html, css, javascript };
}

function getProfessionConfig(profession: string) {
  const configs = {
    // Software/Tech
    'Software Engineer': {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      accentColor: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
      theme: 'tech'
    },
    'Computer Engineer': {
      primaryColor: '#1d4ed8',
      secondaryColor: '#1e3a8a',
      accentColor: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'tech'
    },
    
    // Civil Engineering
    'Civil Engineer': {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      bgGradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Electrical Engineering
    'Electrical Engineer': {
      primaryColor: '#dc2626',
      secondaryColor: '#b91c1c',
      accentColor: '#ef4444',
      bgGradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Electronics Engineering
    'Electronics Engineer': {
      primaryColor: '#7c2d12',
      secondaryColor: '#92400e',
      accentColor: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Mechanical Engineering
    'Mechanical Engineer': {
      primaryColor: '#4b5563',
      secondaryColor: '#374151',
      accentColor: '#6b7280',
      bgGradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Chemical Engineering
    'Chemical Engineer': {
      primaryColor: '#7c3aed',
      secondaryColor: '#6d28d9',
      accentColor: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Aerospace Engineering
    'Aerospace Engineer': {
      primaryColor: '#1e40af',
      secondaryColor: '#1e3a8a',
      accentColor: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Biomedical Engineering
    'Biomedical Engineer': {
      primaryColor: '#0891b2',
      secondaryColor: '#0e7490',
      accentColor: '#06b6d4',
      bgGradient: 'linear-gradient(135deg, #164e63 0%, #0c4a6e 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Environmental Engineering
    'Environmental Engineer': {
      primaryColor: '#16a34a',
      secondaryColor: '#15803d',
      accentColor: '#22c55e',
      bgGradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Industrial Engineering
    'Industrial Engineer': {
      primaryColor: '#ea580c',
      secondaryColor: '#dc2626',
      accentColor: '#f97316',
      bgGradient: 'linear-gradient(135deg, #7c2d12 0%, #451a03 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Petroleum Engineering
    'Petroleum Engineer': {
      primaryColor: '#a16207',
      secondaryColor: '#92400e',
      accentColor: '#d97706',
      bgGradient: 'linear-gradient(135deg, #451a03 0%, #1c1917 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Mining Engineering
    'Mining Engineer': {
      primaryColor: '#78716c',
      secondaryColor: '#57534e',
      accentColor: '#a8a29e',
      bgGradient: 'linear-gradient(135deg, #292524 0%, #1c1917 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Materials Engineering
    'Materials Engineer': {
      primaryColor: '#6366f1',
      secondaryColor: '#4f46e5',
      accentColor: '#818cf8',
      bgGradient: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Nuclear Engineering
    'Nuclear Engineer': {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      bgGradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Agricultural Engineering
    'Agricultural Engineer': {
      primaryColor: '#65a30d',
      secondaryColor: '#4d7c0f',
      accentColor: '#84cc16',
      bgGradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Marine Engineering
    'Marine Engineer': {
      primaryColor: '#0284c7',
      secondaryColor: '#0369a1',
      accentColor: '#0ea5e9',
      bgGradient: 'linear-gradient(135deg, #164e63 0%, #0c4a6e 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Generic Engineer
    'Engineer': {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      bgGradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'engineering'
    },
    
    // Other Professions
    'Designer': {
      primaryColor: '#7c3aed',
      secondaryColor: '#6d28d9',
      accentColor: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
      fontFamily: "'Poppins', 'Inter', sans-serif",
      theme: 'creative'
    },
    'Marketing Professional': {
      primaryColor: '#ea580c',
      secondaryColor: '#dc2626',
      accentColor: '#f97316',
      bgGradient: 'linear-gradient(135deg, #7c2d12 0%, #451a03 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'business'
    },
    'Healthcare Professional': {
      primaryColor: '#0891b2',
      secondaryColor: '#0e7490',
      accentColor: '#06b6d4',
      bgGradient: 'linear-gradient(135deg, #164e63 0%, #0c4a6e 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'medical'
    },
    'Educator': {
      primaryColor: '#7c2d12',
      secondaryColor: '#92400e',
      accentColor: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      fontFamily: "'Inter', 'Roboto', sans-serif",
      theme: 'academic'
    }
  };
  
  return configs[profession as keyof typeof configs] || configs['Engineer'];
}

function generateHTML(data: ParsedResumeData, config: any): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personalInfo.name} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css"> 
  <style id="portfolio-styles"></style>
</head>
<body>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">${data.personalInfo.name}</div>
      <ul class="nav-menu">
        <li><a href="#about">About</a></li>
        ${data.experience.length > 0 ? '<li><a href="#experience">Experience</a></li>' : ''}
        ${data.projects.length > 0 ? '<li><a href="#projects">Projects</a></li>' : ''}
        <li><a href="#skills">Skills</a></li>
        ${data.education.length > 0 ? '<li><a href="#education">Education</a></li>' : ''}
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <section id="about" class="hero">
    <div class="hero-content">
      <h1 class="hero-title">${data.personalInfo.name}</h1>
      <h2 class="hero-subtitle">${data.profession?.category || 'Professional'}</h2>
      <p class="hero-description">${data.summary}</p>
      <div class="hero-links">
        ${data.personalInfo.email ? `<a href="mailto:${data.personalInfo.email}" class="hero-link">Email</a>` : ''}
        ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" target="_blank" class="hero-link">LinkedIn</a>` : ''}
        ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" target="_blank" class="hero-link">GitHub</a>` : ''}
      </div>
    </div>
  </section>

  <div class="main-content">

  <section id="experience" class="section" ${data.experience.length === 0 ? 'style="display: none;"' : ''}>
    <div class="container">
      <h2 class="section-title">Experience</h2>
      <div class="experience-list">
        ${data.experience.map(exp => `
        <div class="experience-item">
          <div class="experience-header">
            <h3 class="experience-title">${exp.position}</h3>
            <span class="experience-company">${exp.company}</span>
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
    </div>
  </section>

  <section id="projects" class="section" ${data.projects.length === 0 ? 'style="display: none;"' : ''}>
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">
        ${data.projects.map(project => `
        <div class="project-card">
          <h3 class="project-title">${project.name}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="skills" class="section">
    <div class="container">
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid">
        ${data.skills.technical.length > 0 ? `
        <div class="skills-category">
          <h3 class="skills-category-title">Technical Skills</h3>
          <div class="skills-list">
            ${data.skills.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
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
    </div>
  </section>

  <section id="education" class="section" ${data.education.length === 0 ? 'style="display: none;"' : ''}>
    <div class="container">
      <h2 class="section-title">Education</h2>
      <div class="education-list">
        ${data.education.map(edu => `
        <div class="education-item">
          <h3 class="education-degree">${edu.degree} in ${edu.field}</h3>
          <span class="education-institution">${edu.institution}</span>
          <span class="education-year">${edu.year}</span>
          ${edu.gpa ? `<span class="education-gpa">GPA: ${edu.gpa}</span>` : ''}
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container">
      <h2 class="section-title">Contact</h2>
      <div class="contact-info">
        ${data.personalInfo.email ? `<div class="contact-item">
          <span class="contact-label">Email:</span>
          <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a>
        </div>` : ''}
        ${data.personalInfo.phone ? `<div class="contact-item">
          <span class="contact-label">Phone:</span>
          <a href="tel:${data.personalInfo.phone}">${data.personalInfo.phone}</a>
        </div>` : ''}
        ${data.personalInfo.location ? `<div class="contact-item">
          <span class="contact-label">Location:</span>
          <span>${data.personalInfo.location}</span>
        </div>` : ''}
      </div>
    </div>
  </section>

  </div> <!-- End main-content -->
  
  <script src="script.js"></script>
  <script id="portfolio-script"></script>
</body>
</html>`;
}

function generateCSS(config: any): string {
  return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: ${config.fontFamily};
  background: ${config.bgGradient};
  color: #e2e8f0;
  line-height: 1.6;
  padding-top: 0;
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.main-content {
  position: relative;
  z-index: 2;
  background: ${config.bgGradient};
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  height: 80px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: ${config.primaryColor};
  transition: color 0.3s ease;
}

.nav-logo:hover {
  color: ${config.accentColor};
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu a {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: ${config.primaryColor};
  transition: width 0.3s ease;
}

.nav-menu a:hover {
  color: ${config.primaryColor};
}

.nav-menu a:hover::after {
  width: 100%;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  padding-top: 100px;
  box-sizing: border-box;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, ${config.primaryColor}20 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, ${config.accentColor}20 0%, transparent 50%);
  z-index: -1;
}

.hero-content {
  max-width: 800px;
  z-index: 1;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: ${config.accentColor};
  margin-bottom: 2rem;
  font-weight: 600;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #cbd5e1;
  line-height: 1.8;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.hero-link {
  padding: 0.75rem 2rem;
  background: ${config.primaryColor};
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${config.primaryColor}40;
}

.hero-link:hover {
  background: ${config.secondaryColor};
  transform: translateY(-2px);
  box-shadow: 0 8px 25px ${config.primaryColor}60;
}

/* Sections */
.section {
  padding: 5rem 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  scroll-margin-top: 100px;
  position: relative;
  z-index: 1;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Ensure sections don't overlap with hero */
.section:first-of-type {
  margin-top: 0;
  padding-top: 6rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${config.primaryColor};
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, ${config.primaryColor}, ${config.accentColor});
  border-radius: 2px;
}

/* Experience */
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.experience-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1rem;
  border-left: 4px solid ${config.primaryColor};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.experience-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.experience-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.experience-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #f1f5f9;
}

.experience-company {
  color: ${config.accentColor};
  font-weight: 600;
  font-size: 1.1rem;
}

.experience-duration {
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
}

.experience-description {
  margin-bottom: 1rem;
  color: #cbd5e1;
  line-height: 1.7;
}

.experience-achievements {
  list-style: none;
  padding-left: 0;
}

.experience-achievements li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #cbd5e1;
}

.experience-achievements li::before {
  content: '▸';
  position: fixed;
  left: 0;
  color: ${config.primaryColor};
  font-weight: bold;
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: ${config.primaryColor}50;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${config.primaryColor};
}

.project-description {
  margin-bottom: 1.5rem;
  color: #cbd5e1;
  line-height: 1.6;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: ${config.primaryColor};
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: ${config.accentColor};
  transform: scale(1.05);
}

.project-link {
  color: ${config.accentColor};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.project-link:hover {
  color: ${config.primaryColor};
  text-decoration: underline;
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skills-category {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.skills-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.skills-category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${config.primaryColor};
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background: ${config.primaryColor};
  color: white;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: ${config.accentColor};
  transform: scale(1.05);
}

.skill-tag.soft {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.skill-tag.soft:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Education */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.education-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.education-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.education-degree {
  font-size: 1.5rem;
  font-weight: 600;
  color: #f1f5f9;
}

.education-institution {
  color: ${config.accentColor};
  font-weight: 600;
  font-size: 1.1rem;
}

.education-year, .education-gpa {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Contact */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.contact-label {
  font-weight: 600;
  color: ${config.primaryColor};
  min-width: 80px;
}

.contact-item a {
  color: #e2e8f0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: ${config.accentColor};
}

/* Animations */
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

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .nav-menu {
    display: none;
  }
  
  .navbar {
    height: 70px;
    padding: 0.75rem 0;
  }
  
  .hero {
    padding-top: 80px;
    min-height: calc(100vh - 10px);
  }
  
  .experience-header {
    flex-direction: column;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .section {
    padding: 4rem 0 3rem 0;
    scroll-margin-top: 80px;
  }
  
  .section:first-of-type {
    padding-top: 5rem;
  }
}`;
}

function generateJavaScript(): string {
  return `// Smooth scrolling for navigation links with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    console.log('Clicked link:', targetId, 'Target found:', !!target);
    
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight || 80;
      let targetPosition;
      
      // Special handling for the about section (hero)
      if (targetId === '#about') {
        targetPosition = 0;
      } else {
        // Get the actual position of the target element
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        targetPosition = rect.top + scrollTop - navbarHeight - 20;
      }
      
      console.log('Scrolling to position:', targetPosition);
      
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });
    } else {
      console.error('Target not found for:', targetId);
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Add stagger animation to cards
const animateCards = (selector, delay = 100) => {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card, index) => {
    card.style.animationDelay = \`\${index * delay}ms\`;
    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
  });
};

// Animate cards when they come into view
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('experience-list')) {
        animateCards('.experience-item', 150);
      } else if (entry.target.classList.contains('projects-grid')) {
        animateCards('.project-card', 200);
      } else if (entry.target.classList.contains('skills-grid')) {
        animateCards('.skills-category', 100);
      }
    }
  });
}, observerOptions);

// Observe card containers
document.querySelectorAll('.experience-list, .projects-grid, .skills-grid').forEach(container => {
  cardObserver.observe(container);
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '2px solid';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      heroTitle.style.borderRight = 'none';
    }
  };
  
  setTimeout(typeWriter, 1000);
}

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
  }
});

// Add smooth hover effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(2deg)';
  });
  
  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
  });
});

// Debug: Log all sections found
const sections = document.querySelectorAll('section[id]');
console.log('Sections found:', Array.from(sections).map(s => s.id));

console.log('Portfolio loaded successfully with enhanced animations!');`
}