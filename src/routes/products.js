import { Router } from "express";
import { isAdmin } from "../middleware/isadmin.js";
import { auth } from "../middleware/auth.js";
import { CreateProductSchema, DeleteProductSchema } from "../types.js";
import prisma from "../prisma.js";

export const router = Router();

router.post("/", auth, isAdmin, async (req, res) => {
  const data = await CreateProductSchema.parseAsync(req.body);
  console.log(data);
  try {
    const product = await prisma.product.create({
      data: { ...data },
    });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
    console.error(e);
  }
});

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.delete("/:productId", auth, isAdmin, async (req, res) => {
  await prisma.product.delete({
    where: {
      id: req.params.productId,
    },
  });
  const products = await prisma.product.findMany();
  res.json(products);
});
