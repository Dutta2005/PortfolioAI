'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import PortfolioPreview from '@/components/PortfolioPreview'
import { ParsedResumeData } from '@/lib/resume-parser'
import { Loader2 } from 'lucide-react'

export default function PreviewPage() {
  const params = useParams()
  const [portfolioData, setPortfolioData] = useState<ParsedResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolio/${params.id}`)
        if (response.ok) {
          const portfolio = await response.json()
          setPortfolioData(portfolio.data)
        } else {
          setError('Portfolio not found')
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error)
        setError('Failed to load portfolio')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchPortfolio()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600">{error || 'The requested portfolio could not be loaded.'}</p>
        </div>
      </div>
    )
  }

  return <PortfolioPreview data={portfolioData} />
}