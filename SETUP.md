# Portfolio Generator Setup Guide

## Prerequisites

1. Node.js 18+ installed
2. A Supabase account (or any PostgreSQL database)
3. OpenAI API key (for resume parsing)
4. Google OAuth credentials (optional)

## Environment Setup

1. Update your `.env` file with actual values:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-actual-secret-key-here

# Database - Replace [YOUR-PASSWORD] with your actual Supabase password
DATABASE_URL="postgresql://postgres.fhrlyhfincnkpbuqivzq:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.fhrlyhfincnkpbuqivzq:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

# OAuth providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI API for resume parsing
OPENAI_API_KEY=your-openai-api-key
```

## Database Setup

1. Replace `[YOUR-PASSWORD]` in the `.env` file with your actual Supabase password
2. Run database migrations:
```bash
npx prisma db push
```

## Installation & Running

1. Install dependencies (already done):
```bash
npm install
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Start the development server:
```bash
npm run dev
```

## Features

### ✅ Implemented Features

- **Authentication**: NextAuth with email/password and Google OAuth
- **Resume Upload**: Drag & drop PDF/DOCX files
- **AI Resume Parsing**: Extract structured data using OpenAI
- **Portfolio Editor**: Visual editor for all portfolio sections
- **Live Preview**: Real-time portfolio preview
- **Code Generation**: Generate HTML/CSS/JS files
- **Database**: PostgreSQL with Prisma ORM
- **Responsive Design**: Works on all devices

### 🎯 Key Components

1. **ResumeUploader**: Handles file upload and AI processing
2. **PortfolioEditor**: Visual editor with tabs for different sections
3. **PortfolioTemplate**: Beautiful, responsive portfolio template
4. **Code Generator**: Creates downloadable HTML/CSS/JS files

### 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   ├── auth/signin/         # Authentication pages
│   ├── dashboard/           # Main dashboard
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── ResumeUploader.tsx  # File upload component
│   ├── PortfolioEditor.tsx # Visual editor
│   └── PortfolioTemplate.tsx # Portfolio template
└── lib/
    ├── auth.ts             # NextAuth configuration
    ├── prisma.ts           # Database client
    ├── resume-parser.ts    # AI resume parsing
    └── code-generator.ts   # HTML/CSS/JS generation
```

## Usage Flow

1. **Sign In**: Users authenticate via email or Google
2. **Upload Resume**: Drag & drop PDF/DOCX resume
3. **AI Processing**: Extract structured data from resume
4. **Edit Portfolio**: Use visual editor to customize
5. **Preview**: See live preview of portfolio
6. **Download**: Get complete HTML/CSS/JS code

## API Endpoints

- `POST /api/upload-resume` - Process uploaded resume
- `GET /api/portfolios` - Get user's portfolios
- `GET /api/portfolio/[id]` - Get specific portfolio
- `PUT /api/portfolio/[id]` - Update portfolio
- `GET /api/portfolio/[id]/download` - Download code files

## Deployment

1. Deploy to Vercel, Netlify, or any Node.js hosting
2. Set environment variables in your hosting platform
3. Ensure database is accessible from your hosting platform

## Troubleshooting

### Database Connection Issues
- Verify your Supabase password is correct
- Check if your IP is whitelisted in Supabase
- Ensure the database URL format is correct

### OpenAI API Issues
- Verify your OpenAI API key is valid
- Check if you have sufficient credits
- Ensure the API key has the correct permissions

### File Upload Issues
- Check file size limits (default: 10MB)
- Verify supported file types (PDF, DOCX)
- Ensure proper MIME type detection