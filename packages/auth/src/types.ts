import type { UserRole } from "@rx/types";

export const ROLES_CLAIM = "https://prescription-dispatch.com/roles";

export interface Auth0User {
  sub: string;
  email: string;
  email_verified?: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  updated_at?: string;
  [ROLES_CLAIM]?: string[];
}

export interface SessionUser extends Auth0User {
  roles: UserRole[];
}

export const getRolesFromUser = (user: Auth0User): UserRole[] => {
  const roles = user[ROLES_CLAIM] ?? [];
  return roles as UserRole[];
};

export const getPrimaryRole = (user: Auth0User): UserRole => {
  const roles = getRolesFromUser(user);
  return roles[0] ?? "patient";
};
