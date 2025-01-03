import express from "express";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { zod } from "./middleware/zod.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use("/", express.static("public"));

app.get("/", async (req, res) => {
  res.send("hello");
});
app.use(zod);
app.listen(process.env.PORT);
console.log("App live at port: ", process.env.PORT);
