import { env } from "../config/env.js";
import googleClient from "../config/google.js";

export const googleLoginController = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Google token is required" });
    }
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload)
  
    return res.json({
      success: true,
      user: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,

    message:"Authentication Failed"
    });
  }
};
