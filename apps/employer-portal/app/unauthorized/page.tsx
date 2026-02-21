import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl">Access Denied</CardTitle>
          <CardDescription>
            You don&apos;t have permission to access this portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-left text-sm">
            <p className="font-medium text-neutral-900">This portal is for:</p>
            <ul className="mt-2 list-inside list-disc text-neutral-600">
              <li>HR administrators</li>
              <li>Benefits managers</li>
            </ul>
          </div>
          <p className="text-sm text-neutral-500">
            If you believe you should have access, please contact support at{" "}
            <a href="mailto:support@rxdispatch.com" className="text-employer-600 hover:underline">
              support@rxdispatch.com
            </a>
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <a href="/auth/logout">
              <Button variant="outline" className="w-full sm:w-auto">
                Sign Out
              </Button>
            </a>
            <Link href="/">
              <Button className="w-full sm:w-auto">Return Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
