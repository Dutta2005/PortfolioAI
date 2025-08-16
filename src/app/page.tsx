import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, Edit, Download, Sparkles, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              PortfolioAI
            </span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button className="bg-gray-100 hover:bg-gray-50 border-slate-200 shadow-md">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Resume Into a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Stunning Portfolio
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your resume and let AI create a beautiful, professional
            portfolio website. Edit without coding and download the complete
            source code.
          </p>
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8 py-3 bg-gray-900 text-white hover:bg-gray-800">
                Create Your Portfolio
              </Button>
            </Link>
            <Link href="/auth/signin">
            <Button size="lg" className="text-lg px-8 py-3 bg-gray-100 hover:bg-gray-50 border-slate-200 shadow-md">
              Sign in
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to create your professional portfolio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow bg-white border-none">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">1. Upload Resume</CardTitle>
              <CardDescription>
                Simply drag and drop your PDF or DOCX resume file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our AI automatically extracts your information including
                experience, education, skills, and projects from your resume.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white border-none">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Edit className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">2. Edit & Customize</CardTitle>
              <CardDescription>
                Fine-tune your portfolio with our intuitive editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Edit your information, add projects, update skills, and
                customize your portfolio without writing any code.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white border-none">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">3. Download Code</CardTitle>
              <CardDescription>
                Get the complete source code for your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Download HTML, CSS, and JavaScript files ready to deploy
                anywhere or customize further.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PortfolioAI?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Create a professional portfolio in minutes, not hours or days.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Advanced AI extracts and organizes your information
                intelligently.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is secure and private. We don't store your resume
                files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Create Your Portfolio?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who have created stunning portfolios
            with PortfolioAI
          </p>
          <Link href="/auth/signin">
            <Button size="lg" className="text-lg px-8 py-3 bg-gray-900 text-white hover:bg-gray-800">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-xl font-bold">PortfolioAI</span>
          </div>
          <p className="text-gray-400">
            Transform your resume into a beautiful portfolio with the power of
            AI
          </p>
        </div>
      </footer>
    </div>
  );
}
