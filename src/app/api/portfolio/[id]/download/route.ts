import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generatePortfolioCode } from '@/lib/code-generator'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: id,
        user: { email: session.user.email }
      }
    })

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 })
    }

    const portfolioData = JSON.parse(portfolio.data)
    const codeFiles = generatePortfolioCode(portfolioData)

    return NextResponse.json({ files: codeFiles })
  } catch (error) {
    console.error('Error generating code:', error)
    return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 })
  }
}