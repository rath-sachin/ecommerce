import { Router } from "express";
import { isAdmin } from "../middleware/isadmin.js";
import { auth } from "../middleware/auth.js";
import { CreateGameSchema } from "../types.js";
import prisma from "../prisma.js";

export const router = Router();

router.post("/", auth, isAdmin, async (req, res) => {
  const data = await CreateGameSchema.parseAsync(req.body);

  console.log(req.body);
  res.send(req.body);
  const values = data.categories.map((id) => {
    return { id };
  });
  try {
    const game = await prisma.game.create({
      data: { ...data, categories: { connect: values } },
    });
    res.json(game);
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
    console.error(e);
  }
});

router.get("/", async (req, res) => {
  const games = await prisma.game.findMany();
  res.json(games);
});

router.delete("/:gameId", auth, isAdmin, async (req, res) => {
  await prisma.game.delete({
    where: {
      id: req.params.gameId,
    },
  });
  const games = await prisma.game.findMany();
  res.json(games);
});
router.get("/categories", async (req, res) => {
  const category = await prisma.category.findMany();
  res.json(category);
});
