"use client";

import { useEffect } from "react";

import { AlertTriangle } from "lucide-react";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui";


interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl">Something went wrong</CardTitle>
          <CardDescription>
            We encountered an unexpected error while loading your dashboard.
            Your data is safe. Please try again or contact support if the issue persists.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-left">
              <p className="font-mono text-xs text-red-600">{error.message}</p>
              {error.digest && (
                <p className="mt-2 font-mono text-xs text-neutral-500">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button onClick={reset} className="w-full sm:w-auto">
              Try Again
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
