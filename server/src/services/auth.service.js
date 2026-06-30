import { env } from "../config/env.js";
import googleClient from "../config/google.js";
import { generateToken } from "../utils/jwt.js";

export const verifyGoogleToken = async (credential) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error("Invalid Google Token");
  }
  const user = {
    googleId: payload.sub,
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
    emailVerified: payload.email_verified,
  };
  const token = generateToken({
    googleId: user.googleId,
    email: user.email,
    name: user.name,
  });
  return {
    user,
    token,
  };
};
