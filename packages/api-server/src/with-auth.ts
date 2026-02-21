import type { Auth0User } from "@rx/auth";
import { getSession, getRolesFromUser, getPrimaryRole } from "@rx/auth";
import type { UserRole } from "@rx/types";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

import { apiUnauthorized, apiForbidden } from "./response";

export interface AuthenticatedUser {
  sub: string;
  email: string;
  roles: UserRole[];
  primaryRole: UserRole;
}

export interface AuthenticatedRequest<TParams = Record<string, string>> {
  user: AuthenticatedUser;
  request: NextRequest;
  params: TParams;
}

export interface RouteContext<TParams = Record<string, string>> {
  params: Promise<TParams>;
}

type AuthenticatedHandler<TParams = Record<string, string>> = (
  ctx: AuthenticatedRequest<TParams>
) => Promise<NextResponse>;

export const withAuth = <TParams = Record<string, string>>(
  handler: AuthenticatedHandler<TParams>
) => {
  return async (
    request: NextRequest,
    context?: RouteContext<TParams>
  ): Promise<NextResponse> => {
    const session = await getSession();

    if (!session?.user) {
      return apiUnauthorized();
    }

    const user = session.user as Auth0User;
    const roles = getRolesFromUser(user);
    const primaryRole = getPrimaryRole(user);

    if (!user.email) {
      return apiUnauthorized("User email not available");
    }

    const params = context?.params ? await context.params : ({} as TParams);

    const ctx: AuthenticatedRequest<TParams> = {
      user: {
        sub: user.sub,
        email: user.email,
        roles,
        primaryRole,
      },
      request,
      params,
    };

    return handler(ctx);
  };
};

export const withRoles = <TParams = Record<string, string>>(
  allowedRoles: UserRole[],
  handler: AuthenticatedHandler<TParams>
) => {
  return withAuth<TParams>(async (ctx) => {
    const hasAllowedRole = ctx.user.roles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!hasAllowedRole) {
      return apiForbidden("You do not have permission to access this resource");
    }

    return handler(ctx);
  });
};
