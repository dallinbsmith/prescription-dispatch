import { createPortalMiddleware, PORTAL_ROLES } from "@rx/auth";

export const middleware = createPortalMiddleware({
  allowedRoles: PORTAL_ROLES.patient,
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
