"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { Button, cn, Sheet, SheetContent, SheetTrigger } from "@rx/ui";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/employees", label: "Employees" },
  { href: "/benefits", label: "Benefits" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
];

export const Nav = () => {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => mobile && setOpen(false)}
          className={cn(
            "text-sm font-medium transition-colors hover:text-employer-600",
            isActive(item.href)
              ? "text-employer-600 font-semibold"
              : "text-neutral-600",
            mobile && "block py-2"
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-employer-600">
          Prescription Dispatch Employer
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          {isLoading ? null : user ? (
            <>
              <span className="hidden text-sm text-neutral-600 sm:block">
                {user.email}
              </span>
              <a href="/api/auth/logout">
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </a>
            </>
          ) : (
            <a href="/api/auth/login">
              <Button size="sm">Sign In</Button>
            </a>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="mt-8 flex flex-col gap-2">
                <NavLinks mobile />
              </nav>
              {user && (
                <div className="mt-6 border-t pt-4">
                  <p className="text-sm text-neutral-600">{user.email}</p>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
