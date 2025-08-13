# AI Portfolio Generator

A modern, full-stack web application that automatically generates professional portfolios from uploaded resumes using AI-powered parsing and profession-specific templates.

## Features

- 🤖 **AI-Powered Resume Parsing**: Extracts structured data from PDF resumes using OpenAI GPT-4
- 🎨 **Profession-Specific Templates**: Customized designs for different engineering fields and professions
- 🔐 **Secure Authentication**: Google OAuth and email-based authentication with NextAuth.js
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 💾 **Portfolio Management**: Save, edit, preview, and download portfolios
- 🎯 **Smart Profession Detection**: Automatically detects profession from resume content
- 📄 **Code Export**: Download complete HTML/CSS/JS files for hosting anywhere
- 🔄 **Real-time Preview**: Live preview of generated portfolios

## Supported Professions

### Engineering Fields
- Software Engineer
- Computer Engineer
- Civil Engineer
- Electrical Engineer
- Electronics & Telecommunication Engineer
- Mechanical Engineer
- Chemical Engineer
- Aerospace Engineer
- Biomedical Engineer
- Environmental Engineer
- Industrial Engineer
- Petroleum Engineer
- Mining Engineer
- Materials Engineer
- Nuclear Engineer
- Agricultural Engineer
- Marine Engineer

### Other Professions
- Designer (UI/UX, Graphic)
- Marketing Professional
- Healthcare Professional
- Educator/Academic

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: Supabase
- **Authentication**: NextAuth.js with Google OAuth
- **AI**: OpenAI GPT-4 for resume parsing
- **PDF Processing**: pdf2json for PDF parsing
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS with custom animations

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key
- Google OAuth credentials (optional, for Google sign-in)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dutta2005/PortfolioAI.git
   cd portfolio-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your-supabase-connection-string"
   DIRECT_URL="your-supabase-direct-connection-string"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # OpenAI (Required for resume parsing)
   OPENAI_API_KEY="your-openai-api-key"

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Database Setup

#### PostgreSQL (Recommended for production)
1. Install PostgreSQL
2. Create a datbase in Supabase
3. Add the connection string to your `.env` file as `DATABASE_URL` and `DIRECT_URL`

#### SQLite (Development only)
1. Use: `DATABASE_URL="file:./dev.db"`
2. The database file will be created automatically

### OpenAI API Key
1. Sign up at [OpenAI](https://platform.openai.com/)
2. Create an API key
3. Add it to your `.env` file as `OPENAI_API_KEY`

### Google OAuth Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add client ID and secret to `.env`

## Usage

1. **Sign Up/Sign In**
   - Use email authentication or Google OAuth
   - Create your account

2. **Upload Resume**
   - Upload a PDF resume
   - The AI will automatically parse and extract information

3. **Review & Edit**
   - Review the extracted information
   - Edit any details as needed
   - The system will auto-detect your profession

4. **Generate Portfolio**
   - Click "Generate Portfolio" to create your professional website
   - The system uses profession-specific templates

5. **Preview & Download**
   - Preview your portfolio in a new window
   - Download the complete HTML/CSS/JS files
   - Host anywhere you like

## Troubleshooting

### Common Issues

#### 1. Google OAuth Error: "getaddrinfo ENOTFOUND accounts.google.com"
**Cause**: DNS resolution or network connectivity issues

**Solutions**:
- Check your internet connection
- Try using a different DNS server (8.8.8.8, 1.1.1.1)
- Disable VPN if using one
- Check firewall settings
- Use email authentication instead of Google OAuth

#### 2. OpenAI API Errors
**Cause**: Invalid API key or quota exceeded

**Solutions**:
- Verify your OpenAI API key is correct
- Check your OpenAI account billing and usage
- Ensure you have sufficient credits

#### 3. Database Connection Issues
**Cause**: Incorrect database URL or database not running

**Solutions**:
- Verify `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Check database credentials
- For development, try SQLite: `DATABASE_URL="file:./dev.db"`

#### 4. PDF Upload/Parsing Issues
**Cause**: Unsupported PDF format or corrupted file

**Solutions**:
- Ensure PDF is text-based (not scanned image)
- Try a different PDF
- Check file size (should be under 10MB)

#### 5. Build Errors
**Cause**: TypeScript or dependency issues

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Environment-Specific Issues

#### Windows
- Use PowerShell or Command Prompt as administrator
- Ensure Node.js is properly installed
- Check Windows Defender/antivirus settings

#### Network Restrictions
- If behind corporate firewall, contact IT for OpenAI API access
- Use email authentication instead of Google OAuth
- Consider using a different network

## Development

### Project Structure
```
portfolio-generator/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Main dashboard
│   │   └── preview/        # Portfolio preview
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   │   ├── ai-portfolio-generator.ts
│   │   ├── template-portfolio-generator.ts
│   │   ├── resume-parser.ts
│   │   └── code-generator.ts
│   └── styles/            # Global styles
├── prisma/                # Database schema
├── public/               # Static assets
└── .env                  # Environment variables
```

### Key Components
- **ResumeUploader**: Handles PDF upload and parsing
- **PortfolioEditor**: Visual editor for portfolio data
- **PortfolioPreview**: Live preview of generated portfolios
- **TemplateGenerator**: Creates profession-specific portfolios

### API Routes
- `/api/upload-resume`: Handles resume upload and parsing
- `/api/generate-portfolio`: Generates portfolio from data
- `/api/portfolios`: CRUD operations for portfolios
- `/api/auth/*`: NextAuth.js authentication endpoints

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Use `npm run build` and deploy `out/` folder
- **Railway**: Connect GitHub and add environment variables
- **Heroku**: Use Node.js buildpack

### Database for Production
- **Vercel**: Use Vercel Postgres
- **Railway**: Use Railway PostgreSQL
- **Supabase**: Use Supabase PostgreSQL
- **PlanetScale**: Use PlanetScale MySQL (update schema accordingly)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m "Add feature"`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter issues:

1. Check this README for troubleshooting steps
2. Search existing GitHub issues
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)

## Roadmap

- [ ] Support for more file formats (DOCX, TXT)
- [ ] Multiple portfolio themes per profession
- [ ] Integration with job boards
- [ ] Portfolio analytics
- [ ] Team collaboration features
- [ ] Custom domain support
- [ ] SEO optimization tools

---

**Made with ❤️ using Next.js, OpenAI, and modern web technologies**