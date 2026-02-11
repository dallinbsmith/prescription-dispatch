import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();

export const getSession = async () => {
  return auth0.getSession();
};

export const getAccessToken = async () => {
  return auth0.getAccessToken();
};
