"use client";

import { useState, useEffect } from "react";
import { ParsedResumeData } from "@/lib/resume-parser";
import { GeneratedPortfolio } from "@/lib/template-portfolio-generator";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioPreviewProps {
  data: ParsedResumeData;
}

export default function PortfolioPreview({ data }: PortfolioPreviewProps) {
  const [portfolioCode, setPortfolioCode] = useState<GeneratedPortfolio | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const generatePortfolio = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Generating AI portfolio for:", data.profession?.category);

      const response = await fetch("/api/generate-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ portfolioData: data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate portfolio");
      }

      const result = await response.json();
      setPortfolioCode(result.portfolio);
    } catch (err) {
      console.error("Error generating portfolio:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate portfolio"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const regeneratePortfolio = async () => {
    setIsRegenerating(true);
    await generatePortfolio();
    setIsRegenerating(false);
  };

  useEffect(() => {
    generatePortfolio();
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="relative">
            <Sparkles className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
            <Loader2 className="h-8 w-8 text-purple-600 animate-spin absolute top-4 left-1/2 transform -translate-x-1/2" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Creating Your Portfolio
          </h2>
          <p className="text-gray-600 mb-4">
            Generating a customized {data.profession?.category} portfolio using professional templates...
          </p>
          <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Portfolio Generation Failed
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button
              onClick={generatePortfolio}
              className="flex items-center gap-2 w-full"
            >
              <RefreshCw className="h-4 w-4" />
              Try Generation Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!portfolioCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">No portfolio generated</p>
        </div>
      </div>
    );
  }

  // Combine HTML, CSS, and JavaScript into a single document
  const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo.name} - ${
    data.profession?.category
  } Portfolio</title>
      <style>
        ${portfolioCode.css}
      </style>
    </head>
    <body>
      ${portfolioCode.html.replace(
        /<\/?html[^>]*>|<\/?head[^>]*>|<\/?body[^>]*>|<title[^>]*>[\s\S]*?<\/title>|<style[^>]*>[\s\S]*?<\/style>|<script[^>]*>[\s\S]*?<\/script>/gi,
        ""
      )}
      <script>
        ${portfolioCode.javascript}
      </script>
    </body>
    </html>
  `;

  return (
    <div className="relative">
      {/* Regenerate Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={regeneratePortfolio}
          disabled={isRegenerating}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        >
          {isRegenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Regenerating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Regenerate
            </>
          )}
        </Button>
      </div>

      {/* Portfolio Preview */}
      <div className="w-full h-screen">
        <iframe
          srcDoc={fullHTML}
          className="w-full h-full border-0"
          title={`${data.personalInfo.name}'s Portfolio`}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
