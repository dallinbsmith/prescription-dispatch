import { prisma } from "@rx/database";

import type { Auth0User } from "./types";
import { getPrimaryRole } from "./types";

import { getPlatformForRole } from "./index";

export const syncUserToDatabase = async (auth0User: Auth0User) => {
  const primaryRole = getPrimaryRole(auth0User);
  const platform = getPlatformForRole(primaryRole);

  const user = await prisma.user.upsert({
    where: { auth0Id: auth0User.sub },
    update: {
      email: auth0User.email,
      role: primaryRole,
      platform,
    },
    create: {
      auth0Id: auth0User.sub,
      email: auth0User.email,
      role: primaryRole,
      platform,
    },
  });

  return user;
};

export const getUserByAuth0Id = async (auth0Id: string) => {
  return prisma.user.findUnique({
    where: { auth0Id },
    include: {
      patient: true,
      provider: true,
      employer: true,
    },
  });
};
