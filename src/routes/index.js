import { Router } from "express";
import { SignupSchema, SigninSchema } from "../types.js";
import prisma from "../prisma.js";
import { hash, compare } from "../bcrypt.js";
import { generateToken, verifyToken } from "../jwt.js";
import { router as productsRouter } from "./products.js";
import { auth } from "../middleware/auth.js";

export const router = Router();

router.post("/signup", async (req, res) => {
  const data = await SignupSchema.parseAsync(req.body);

  const hashedPassword = await hash(data.password);
  try {
    await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    res.json({ message: "User Created" });
  } catch (e) {
    res.status(400).json({ message: "User already exist" });
  }
});

router.post("/signin", async (req, res) => {
  const data = await SigninSchema.parseAsync(req.body);

  const user = await prisma.user.findUnique({
    where: { username: data.username },
    select: { password: true, id: true, role: true },
  });
  if (!user) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }
  const hashedPassword = await compare(user.password, data.password);

  if (!hashedPassword) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }
  res.cookie("token", generateToken(user.id), {
    httpOnly: true,
  });
  res.json(user);
  console.log(generateToken(user.id));
});

router.get("/users/@me", auth, async (req, res) => {
  res.json(req.user);
});

router.post("/logout", auth, async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(),
    })
    .json({ mesage: "Logout Sucessful" });
});

router.use("/products", productsRouter);
