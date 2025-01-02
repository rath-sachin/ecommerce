// @ts-check
import { Router } from "express";
import { SignupSchema, SigninSchema } from "../types.js";
import prisma from "../prisma.js";
import { hash, compare } from "../bcrypt.js";
import { generateToken, verifyToken } from "../jwt.js";

export const router = Router();

router.post("/signup", async (req, res) => {
  const parsed = SignupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());
    return;
  }
  const hashedPassword = await hash(parsed.data.password);
  try {
    await prisma.user.create({
      data: { ...parsed.data, password: hashedPassword },
    });
    res.json({ message: "Login Successful" });
  } catch (e) {
    res.status(400).json({ message: "User already exist" });
  }
});

router.post("/signin", async (req, res) => {
  const parsed = SigninSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(403).json({ message: "Invalid username or password" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { username: parsed.data.username },
    select: { password: true, id: true },
  });
  if (!user) {
    res.status(403).json({ message: "Invalid username or password" });
    return;
  }
  const hashedPassword = await compare(user.password, parsed.data.password);

  if (!hashedPassword) {
    res.status(403).json({ message: "Invalid username or password" });
    return;
  }
  res.cookie("token", generateToken(user.id), {
    httpOnly: true,
  });
  res.json({ message: "Login Successful" });
  console.log(generateToken(user.id));
});

router.get("/users/@me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(403).json({ message: "Not aurthorised" });
    return;
  }
  try {
    const payload = verifyToken(token);
    const sub = payload.sub;
    const user = await prisma.user.findUnique({
      where: { id: sub },
    });
    res.json(user);
  } catch (e) {
    res.status(403).json({ message: "Not aurthorised" });
  }
});

router.post("/logout", async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(),
    })
    .json({ mesage: "Logout Sucessful" });
});
