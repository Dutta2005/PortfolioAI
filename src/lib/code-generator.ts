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

  // Generate standalone HTML file (with embedded CSS and JS)
  files.push({
    name: 'portfolio-standalone.html',
    content: generateStandaloneHTML(templatePortfolio, data),
    language: 'html'
  })

  // Generate separate files for development
  files.push({
    name: 'index.html',
    content: templatePortfolio.html,
    language: 'html'
  })

  files.push({
    name: 'styles.css',
    content: templatePortfolio.css,
    language: 'css'
  })

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

function generateStandaloneHTML(templatePortfolio: any, data: ParsedResumeData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personalInfo.name} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${templatePortfolio.css}
  </style>
</head>
<body>
  ${templatePortfolio.html.replace(/<\/?html[^>]*>|<\/?head[^>]*>|<\/?body[^>]*>|<title[^>]*>[\s\S]*?<\/title>|<style[^>]*>[\s\S]*?<\/style>|<script[^>]*>[\s\S]*?<\/script>/gi, '')}
  
  <script>
    ${templatePortfolio.javascript}
  </script>
</body>
</html>`;
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