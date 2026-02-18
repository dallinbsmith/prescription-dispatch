import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui";
import { FileQuestion } from "lucide-react";
import Link from "next/link";


const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <FileQuestion className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Try navigating from the dashboard or use the links below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">Go to Dashboard</Button>
            </Link>
            <Link href="/employees">
              <Button variant="outline" className="w-full sm:w-auto">
                View Employees
              </Button>
            </Link>
          </div>
          <p className="text-sm text-neutral-500">
            Need help?{" "}
            <Link href="/settings" className="text-employer-600 hover:underline">
              Contact support
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
