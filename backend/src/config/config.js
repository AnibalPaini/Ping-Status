import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../config/.env"),
});

export default {
  PORT: process.env.PORT || 8080,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/pingstatus",
  SECRET_JWT: process.env.SECRET_JWT,
  TOKEN_TELEGRAM: process.env.TOKEN_TELEGRAM,
  GROUP_CHAT_ID: process.env.GROUP_CHAT_ID,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  NODE_ENV: process.env.NODE_ENV
};
