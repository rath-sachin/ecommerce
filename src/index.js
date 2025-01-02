import express from "express";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use("/", express.static("public"));

app.get("/", async (req, res) => {
  res.send("hello");
});
app.listen(5500);
