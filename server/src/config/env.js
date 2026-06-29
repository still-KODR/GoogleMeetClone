import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
  MONOG_DB_URI:process.env.MONOG_DB_URI,
  JWT_SECRET:process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID
};

