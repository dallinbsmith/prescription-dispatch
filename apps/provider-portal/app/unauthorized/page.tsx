import { Button } from "@rx/ui";
import Link from "next/link";


const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-neutral-900">Access Denied</h1>
      <p className="mt-2 text-neutral-600">
        You don&apos;t have permission to access this portal.
      </p>
      <p className="mt-1 text-sm text-neutral-500">
        This portal is for licensed prescribers only.
      </p>
      <div className="mt-6 flex gap-4">
        <a href="/auth/logout">
          <Button variant="outline">Sign Out</Button>
        </a>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
