"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ResumeUploader from "@/components/ResumeUploader";
import PortfolioEditor from "@/components/PortfolioEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Eye, Edit, LogOut, User, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ParsedResumeData } from "@/lib/resume-parser";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface Portfolio {
  id: string;
  title: string;
  description: string;
  data: ParsedResumeData;
  template: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"upload" | "edit" | "list">(
    "list"
  );
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    portfolio: Portfolio | null;
  }>({
    open: false,
    portfolio: null,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchPortfolios();
    }
  }, [status, router]);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch("/api/portfolios");
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSuccess = (portfolioId: string, data: ParsedResumeData) => {
    const newPortfolio: Portfolio = {
      id: portfolioId,
      title: `${data.personalInfo.name}'s Portfolio`,
      description: data.summary,
      data,
      template: "modern",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPortfolios((prev) => [newPortfolio, ...prev]);
    setCurrentPortfolio(newPortfolio);
    setActiveTab("edit");
    toast.success("Portfolio created successfully!");
  };

  const handleSave = (data: ParsedResumeData) => {
    if (currentPortfolio) {
      const updatedPortfolio = { ...currentPortfolio, data };
      setCurrentPortfolio(updatedPortfolio);
      setPortfolios((prev) =>
        prev.map((p) => (p.id === currentPortfolio.id ? updatedPortfolio : p))
      );
    }
  };

  const handlePreview = () => {
    if (currentPortfolio) {
      // Open preview in new window
      const previewUrl = `/preview/${currentPortfolio.id}`;
      window.open(
        previewUrl,
        "_blank",
        "width=1200,height=800,scrollbars=yes,resizable=yes"
      );
    }
  };

  const handleDownload = async () => {
    if (!currentPortfolio) return;

    try {
      const response = await fetch(
        `/api/portfolio/${currentPortfolio.id}/download`
      );
      if (response.ok) {
        const { files } = await response.json();

        // Dynamically import JSZip to avoid SSR issues
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();

        // Add each file to the zip
        files.forEach((file: any) => {
          zip.file(file.name, file.content);
        });

        // Generate the zip file
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        
        // Download the zip file
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${currentPortfolio.title
          .replace(/\s+/g, "-")
          .toLowerCase()}-portfolio.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success(`Downloaded portfolio with ${files.length} files!`);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download code files");
    }
  };

  const editPortfolio = (portfolio: Portfolio) => {
    setCurrentPortfolio(portfolio);
    setActiveTab("edit");
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const openDeleteDialog = (portfolio: Portfolio) => {
    setDeleteDialog({ open: true, portfolio });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, portfolio: null });
  };

  const handleDeletePortfolio = async () => {
    if (!deleteDialog.portfolio) return;

    try {
      const response = await fetch(
        `/api/portfolio/${deleteDialog.portfolio.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPortfolios((prev) =>
          prev.filter((p) => p.id !== deleteDialog.portfolio!.id)
        );

        // If we're editing the deleted portfolio, clear it
        if (currentPortfolio?.id === deleteDialog.portfolio.id) {
          setCurrentPortfolio(null);
          setActiveTab("list");
        }

        toast.success("Portfolio deleted successfully!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete portfolio");
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      toast.error("Failed to delete portfolio");
    } finally {
      closeDeleteDialog();
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Portfolio Dashboard
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <User className="h-4 w-4" />
                Welcome back, {session?.user?.name || session?.user?.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="list">My Portfolios</TabsTrigger>
            <TabsTrigger value="upload">Upload Resume</TabsTrigger>
            <TabsTrigger value="edit" disabled={!currentPortfolio}>
              Edit Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <div className="grid gap-6">
              {portfolios.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">
                        No portfolios yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Upload your resume to create your first portfolio
                      </p>
                      <Button onClick={() => setActiveTab("upload")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Portfolio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolios.map((portfolio) => (
                    <Card
                      key={portfolio.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {portfolio.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {portfolio.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Updated{" "}
                            {new Date(portfolio.updatedAt).toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const previewUrl = `/preview/${portfolio.id}`;
                                window.open(
                                  previewUrl,
                                  "_blank",
                                  "width=1200,height=800,scrollbars=yes,resizable=yes"
                                );
                              }}
                              title="Preview Portfolio"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => editPortfolio(portfolio)}
                              title="Edit Portfolio"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDeleteDialog(portfolio)}
                              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                              title="Delete Portfolio"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <ResumeUploader onUploadSuccessAction={handleUploadSuccess} />
          </TabsContent>

          <TabsContent value="edit" className="mt-6">
            {currentPortfolio ? (
              <PortfolioEditor
                portfolioId={currentPortfolio.id}
                initialData={currentPortfolio.data}
                onSaveAction={handleSave}
                onPreviewAction={handlePreview}
                onDownloadAction={handleDownload}
              />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-gray-600">Select a portfolio to edit</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={deleteDialog.open}
          onOpenChangeAction={(open) => !open && closeDeleteDialog()}
          title="Delete Portfolio"
          description={`Are you sure you want to delete "${deleteDialog.portfolio?.title}"? This action cannot be undone.`}
          onConfirmAction={handleDeletePortfolio}
          onCancelAction={closeDeleteDialog}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
        />
      </div>
    </div>
  );
}
