import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { extractTextFromFile, parseResumeWithAI } from '@/lib/resume-parser'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary, downloadFromCloudinary } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('resume') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload PDF or DOCX files only.' 
      }, { status: 400 })
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large. Please upload files smaller than 10MB.' 
      }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Upload to Cloudinary
    console.log('Uploading file to Cloudinary...')
    const cloudinaryUrl = await uploadToCloudinary(buffer, file.name)
    console.log('File uploaded to Cloudinary:', cloudinaryUrl)
    
    // Download from Cloudinary and extract text
    console.log('Downloading file from Cloudinary for processing...')
    const downloadedBuffer = await downloadFromCloudinary(cloudinaryUrl)
    const resumeText = await extractTextFromFile(downloadedBuffer, file.type)
    
    // Parse resume with AI
    console.log('Parsing resume with AI...')
    const parsedData = await parseResumeWithAI(resumeText)
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create portfolio entry
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: user.id,
        title: `${parsedData.personalInfo.name}'s Portfolio`,
        description: parsedData.summary,
        data: JSON.stringify(parsedData),
        template: 'modern'
      }
    })

    return NextResponse.json({ 
      success: true, 
      portfolioId: portfolio.id,
      data: parsedData,
      cloudinaryUrl // Include the Cloudinary URL for reference
    })
    
  } catch (error) {
    console.error('Error processing resume:', error)
    return NextResponse.json({ 
      error: `Failed to process resume: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}