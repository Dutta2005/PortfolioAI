import OpenAI from "openai";
import mammoth from "mammoth";
// @ts-ignore - pdf2json doesn't have proper types
import PDFParser from "pdf2json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ParsedResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  summary: string;
  profession: {
    category: string; // e.g., "Software Engineer", "Civil Engineer", "Designer", etc.
    specialization: string; // e.g., "Frontend Development", "Structural Engineering", "UI/UX Design"
    experience_level: string; // e.g., "Junior", "Mid-level", "Senior", "Lead"
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    year: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  portfolioStyle: {
    template: string; // e.g., "tech", "engineering", "creative", "business"
    colorScheme: string; // e.g., "blue-tech", "green-engineering", "purple-creative"
    layout: string; // e.g., "modern", "classic", "minimal", "showcase"
  };
}

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error('PDF parsing error:', errData);
      reject(new Error('Failed to parse PDF'));
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        let text = '';
        
        // Extract text from all pages
        if (pdfData.Pages) {
          pdfData.Pages.forEach((page: any) => {
            if (page.Texts) {
              page.Texts.forEach((textItem: any) => {
                if (textItem.R) {
                  textItem.R.forEach((textRun: any) => {
                    if (textRun.T) {
                      text += decodeURIComponent(textRun.T) + ' ';
                    }
                  });
                }
              });
              text += '\n';
            }
          });
        }
        
        console.log('PDF text extracted, length:', text.length);
        resolve(text.trim());
      } catch (error) {
        console.error('Error processing PDF data:', error);
        reject(new Error('Failed to process PDF data'));
      }
    });

    // Parse the PDF buffer
    pdfParser.parseBuffer(buffer);
  });
}

export async function extractTextFromFile(
  file: Buffer,
  mimeType: string
): Promise<string> {
  try {
    console.log('Processing file with MIME type:', mimeType);
    console.log('File buffer size:', file.length);
    
    if (mimeType === "application/pdf") {
      console.log('Processing PDF file...');
      try {
        const text = await extractTextFromPDF(file);
        console.log('PDF processed, text length:', text.length);
        
        // If we got very little text, it might be a scanned PDF
        if (text.length < 50) {
          console.log('PDF text extraction yielded minimal content, might be scanned');
          return `This appears to be a PDF resume. Please provide a brief description of your resume content, or try uploading a DOCX version. The system detected a PDF but could not extract readable text - this often happens with scanned documents or image-based PDFs.`;
        }
        
        return text;
      } catch (pdfError) {
        console.error('PDF parsing failed:', pdfError);
        return `PDF file detected but text extraction failed. This might be a scanned PDF or image-based document. Please try uploading a DOCX version or provide a brief description of your resume content.`;
      }
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      console.log('Processing DOCX file...');
      const result = await mammoth.extractRawText({ buffer: file });
      console.log('DOCX text extracted, length:', result.value.length);
      return result.value;
    } else {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }
  } catch (error) {
    console.error("Error extracting text from file:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error(`Failed to extract text from file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function parseResumeWithAI(
  resumeText: string
): Promise<ParsedResumeData> {
  try {
    console.log('Starting AI parsing with text length:', resumeText.length);
    console.log('First 200 characters of text:', resumeText.substring(0, 200));
    
    const prompt = `
    You are an expert resume analyzer and portfolio designer. Analyze the following resume text and extract structured information, then determine the person's profession and create a customized portfolio design.

    Return a JSON object with the following structure:
    
    {
      "personalInfo": {
        "name": "Full Name",
        "email": "email@example.com",
        "phone": "phone number",
        "location": "city, state/country",
        "linkedin": "linkedin url (if available)",
        "github": "github url (if available)",
        "website": "personal website (if available)"
      },
      "summary": "Professional summary or objective",
      "profession": {
        "category": "Primary profession (e.g., Software Engineer, Civil Engineer, Graphic Designer, Marketing Manager, Data Scientist, etc.)",
        "specialization": "Specific area of expertise (e.g., Frontend Development, Structural Engineering, UI/UX Design, Digital Marketing, Machine Learning, etc.)",
        "experience_level": "Experience level (Junior, Mid-level, Senior, Lead, Executive)"
      },
      "experience": [
        {
          "company": "Company Name",
          "position": "Job Title",
          "duration": "Start Date - End Date",
          "description": "Job description",
          "achievements": ["achievement 1", "achievement 2"]
        }
      ],
      "education": [
        {
          "institution": "University/School Name",
          "degree": "Degree Type",
          "field": "Field of Study",
          "year": "Graduation Year",
          "gpa": "GPA (if available)"
        }
      ],
      "skills": {
        "technical": ["skill1", "skill2"],
        "soft": ["skill1", "skill2"]
      },
      "projects": [
        {
          "name": "Project Name",
          "description": "Project description",
          "technologies": ["tech1", "tech2"],
          "link": "project link (if available)"
        }
      ],
      "certifications": [
        {
          "name": "Certification Name",
          "issuer": "Issuing Organization",
          "date": "Date obtained"
        }
      ],
      "portfolioStyle": {
        "template": "Choose based on profession: 'tech' for software/IT, 'engineering' for civil/mechanical/electrical engineers, 'creative' for designers/artists, 'business' for managers/consultants, 'medical' for healthcare, 'academic' for researchers/teachers",
        "colorScheme": "Choose appropriate colors: 'blue-tech' for tech, 'green-engineering' for engineering, 'purple-creative' for creative, 'orange-business' for business, 'teal-medical' for medical, 'indigo-academic' for academic",
        "layout": "Choose layout: 'showcase' for creative portfolios, 'technical' for engineers/developers, 'professional' for business, 'minimal' for academic, 'dynamic' for marketing/sales"
      }
    }
    
    Resume text:
    ${resumeText}
    
    Analyze the resume thoroughly and determine the person's profession, specialization, and experience level. Choose appropriate portfolio styling that matches their field. If any field is not available, use empty string or empty array as appropriate.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1", // Using GPT-4.1 for better analysis
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 2000, // Increased for detailed analysis
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    console.log('AI response received, length:', content.length);
    console.log('AI response preview:', content.substring(0, 300));

    const parsedData = JSON.parse(content) as ParsedResumeData;
    console.log('Successfully parsed AI response');
    return parsedData;
  } catch (error) {
    console.error("Error parsing resume with AI:", error);
    throw new Error("Failed to parse resume");
  }
}
