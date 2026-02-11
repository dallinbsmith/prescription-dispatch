import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Auth0Client } from "@auth0/nextjs-auth0/server";

const auth0 = new Auth0Client();

const ROLES_CLAIM = "https://prescription-dispatch.com/roles";
const ALLOWED_ROLES = ["pharmacist", "technician", "system_admin", "developer"];

const decodeJwtPayload = (token: string): Record<string, unknown> => {
  const parts = token.split(".");
  if (parts.length !== 3 || !parts[1]) return {};
  const decoded = Buffer.from(parts[1], "base64").toString("utf-8");
  return JSON.parse(decoded);
};

export async function middleware(request: NextRequest) {
  const authResponse = await auth0.middleware(request);

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/auth") ||
    pathname === "/" ||
    pathname === "/unauthorized" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return authResponse;
  }

  const session = await auth0.getSession();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const idToken = session.tokenSet?.idToken;
  const claims = idToken ? decodeJwtPayload(idToken) : {};
  const userRoles = claims[ROLES_CLAIM];
  const roles = (Array.isArray(userRoles) ? userRoles : []) as string[];
  const hasAccess = roles.some((role: string) => ALLOWED_ROLES.includes(role));

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return authResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
