import express, { NextFunction, Request, Response } from "express";
import router from "./twit/Controller";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { logger } from "./utils/log";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

async function main() {
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(express.json());

  app.use("/api/twits", router);

  app.get("/profile", (req, res) => {
    res.render("profile", { user: { name: "Arsen", age: 17 } });
  });

  app.get("/error", (req, res) => {
    throw new Error("This is test error");
  });

  app.all("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).send("Something went wrong");
  });

  app.listen(process.env.PORT || 4200, () => {
    logger.info(`Server listening on port ${process.env.PORT || 4200}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
