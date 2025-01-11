import jwt from "jsonwebtoken";
import "dotenv/config"

const PrivateKey = process.env.JWT_PRIVATE_KEY;

export function generateToken(id) {
  const token = jwt.sign({}, PrivateKey, { subject: id });
  return token;
}

export function verifyToken(token) {
  const decode = jwt.verify(token, PrivateKey);
  return decode;
}
