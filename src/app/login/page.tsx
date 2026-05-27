"use client";

import { signIn } from "next-auth/react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg">
            LP
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to LinkedPro</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in with your LinkedIn account to get started
          </p>
        </div>

        <Button
          onClick={() => signIn("linkedin", { callbackUrl: "/dashboard" })}
          className="w-full"
          size="lg"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Sign in with LinkedIn
        </Button>

        <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
          <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
          <p className="text-xs text-blue-700">
            We&apos;ll use your LinkedIn account to post content and track analytics on your behalf.
          </p>
        </div>
      </div>
    </div>
  );
}
