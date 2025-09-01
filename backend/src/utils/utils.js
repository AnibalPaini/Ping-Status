import bcrypt from "bcrypt";
import config from "../config/config.js";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export { __dirname };

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateJWToken = (user) => {
  return jwt.sign(user, config.SECRET_JWT, { expiresIn: "8h" });
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.signedCookies && typeof req.signedCookies === "object") {
    token = req.signedCookies["jwtCookieToken"];
  }
  return token;
};

// Maneja el rol del user
export const authorization = (...roles) => {
  return async (req, res, next) => {
    if (!req.user)
      return res.status(401).send("Unauthorized: Usuario no autenticado");

    if (!roles.includes(req.user.rol)) {
      return res
        .status(403)
        .send("Forbidden: El usuario no tiene permisos suficientes");
    }
    next();
  };
};

export const authenticate = (req, res, next) => {
  try {
    const token = cookieExtractor(req);

    if (!token) return res.status(401).send("No autorizado: sin token");

    const decoded = jwt.verify(token, config.SECRET_JWT); // verificamos JWT
    req.user = decoded; // guardamos info del usuario
    next();
  } catch (err) {
    return res.status(401).send("Token inválido o expirado");
  }
};
