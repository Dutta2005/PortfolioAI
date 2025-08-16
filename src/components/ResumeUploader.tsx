"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ResumeUploaderProps {
  onUploadSuccessAction: (portfolioId: string, data: any) => void;
}

export default function ResumeUploader({
  onUploadSuccessAction,
}: ResumeUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      // Try Cloudinary upload first, fallback to direct upload
      let response = await fetch("/api/upload-resume-cloudinary", {
        method: "POST",
        body: formData,
      });
      
      // If Cloudinary fails, try direct upload
      if (!response.ok) {
        console.log('Cloudinary upload failed, trying direct upload...');
        response = await fetch("/api/upload-resume", {
          method: "POST",
          body: formData,
        });
      }

      const result = await response.json();

      if (response.ok) {
        toast.success("Resume uploaded and processed successfully!");
        onUploadSuccessAction(result.portfolioId, result.data);
      } else {
        toast.error(result.error || "Failed to process resume");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload resume");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Upload Your Resume
        </CardTitle>
        <CardDescription>
          Upload your resume in PDF or DOCX format to generate your portfolio
          website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary hover:bg-gray-50"
          } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
        >
          <input {...getInputProps()} />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-gray-600">Processing your resume...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              {isDragActive ? (
                <p className="text-sm text-gray-600">
                  Drop your resume here...
                </p>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Drag and drop your resume here, or click to select
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports PDF and DOCX files
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4">
          <Button
            onClick={() =>
              (
                document.querySelector('input[type="file"]') as HTMLInputElement
              )?.click()
            }
            disabled={isUploading}
            className="w-full bg-gray-900 text-gray-50 hover:bg-gray-800"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
