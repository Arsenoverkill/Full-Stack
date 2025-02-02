import { Request, Response, Router } from "express";
import { TwitService } from "./Service";
import { authMiddleware } from "../AuthMiddleware";
import { createTwitDto } from "./twitDto";

const router = Router();

const twistService = new TwitService();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const validation = createTwitDto.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ error: validation.error.flatten().fieldErrors });
  }

  const twit = await twistService.createTwit(req.body);
  res.status(201).json(twit);
});

router.get("/", async (req: Request, res: Response) => {
  const twits = await twistService.getTwits();
  res.json(twits);
});

export default router;
