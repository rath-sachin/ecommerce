import { verifyToken } from "../jwt.js";
import prisma from "../prisma.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    const { sub } = decoded;
    req.user = await prisma.user.findUnique({ where: {id: sub} });
    next();
  } catch (e) {
    console.error(e)
    res.status(401).json({ message: "Unauthorized" });
  }
}
