import { FileQuestion } from "lucide-react";
import Link from "next/link";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-neutral-100 text-neutral-400">
            <FileQuestion className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">Go Home</Button>
            </Link>
            <Link href="/prescriptions">
              <Button variant="outline" className="w-full sm:w-auto">
                View Prescriptions
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
