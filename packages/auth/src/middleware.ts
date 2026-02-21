import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth0 } from "./auth0";
import { ROLES_CLAIM } from "./types";

export interface PortalMiddlewareConfig {
  allowedRoles: readonly string[];
}

const decodeJwtPayload = (token: string): Record<string, unknown> => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3 || !parts[1]) return {};
    const decoded = Buffer.from(parts[1], "base64").toString("utf-8");
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return {};
  }
};

export const createPortalMiddleware = (config: PortalMiddlewareConfig) => {
  return async (request: NextRequest) => {
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

    const idToken = session.tokenSet.idToken;
    const claims = idToken ? decodeJwtPayload(idToken) : {};
    const userRoles = claims[ROLES_CLAIM];
    const roles = (Array.isArray(userRoles) ? userRoles : []) as string[];
    const hasAccess = roles.some((role: string) =>
      config.allowedRoles.includes(role)
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return authResponse;
  };
};
