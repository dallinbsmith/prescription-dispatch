import Link from "next/link";

import { auth0 } from "@rx/auth";
import { Button, cn } from "@rx/ui";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/prescriptions", label: "Prescriptions" },
  { href: "/orders", label: "Orders" },
  { href: "/profile", label: "Profile" },
];

export const Nav = async () => {
  const session = await auth0.getSession();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-patient-600">
          Prescription Dispatch
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-patient-600",
                "text-neutral-600"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <span className="text-sm text-neutral-600">
                {session.user.email}
              </span>
              <a href="/auth/logout">
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </a>
            </>
          ) : (
            <a href="/auth/login">
              <Button size="sm">Sign In</Button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
