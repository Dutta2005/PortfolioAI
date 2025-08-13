import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    return NextResponse.json({
      ...portfolio,
      data: JSON.parse(portfolio.data)
    })
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const portfolio = await prisma.portfolio.updateMany({
      where: {
        id: id,
        user: { email: session.user.email }
      },
      data: {
        data: JSON.stringify(data),
        updatedAt: new Date()
      }
    })

    if (portfolio.count === 0) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating portfolio:', error)
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const portfolio = await prisma.portfolio.deleteMany({
      where: {
        id: id,
        user: { email: session.user.email }
      }
    })

    if (portfolio.count === 0) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting portfolio:', error)
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 })
  }
}