"use client";

import { Sparkles } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning icon */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-xl font-bold text-gray-900">
          Portfolio<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI</span>
        </h1>

        {/* Status */}
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
