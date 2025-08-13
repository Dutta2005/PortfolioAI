import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateTemplatePortfolio } from '@/lib/template-portfolio-generator'
import { ParsedResumeData } from '@/lib/resume-parser'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { portfolioData }: { portfolioData: ParsedResumeData } = await request.json()
    
    if (!portfolioData) {
      return NextResponse.json({ error: 'Portfolio data is required' }, { status: 400 })
    }

    console.log('Generating template-based portfolio for:', portfolioData.profession?.category)
    
    // Generate portfolio using predefined templates
    const generatedPortfolio = generateTemplatePortfolio(portfolioData)
    
    return NextResponse.json({ 
      success: true, 
      portfolio: generatedPortfolio 
    })
    
  } catch (error) {
    console.error('Error generating template portfolio:', error)
    return NextResponse.json({ 
      error: `Failed to generate portfolio: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}