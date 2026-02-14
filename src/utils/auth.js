<<<<<<< HEAD
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const SECRET = process.env.JWT_SECRET || "rahasia-admin-akk";

export const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(32).toString("hex");
=======
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const SECRET = process.env.JWT_SECRET || "rahasia-admin-akk";

export const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "30m" });
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(32).toString("hex");
>>>>>>> master
};