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
    return;
  }

  try {
    const twit = await twistService.createTwit(req.body);
    res.status(201).json(twit);
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTwit = await twistService.deleted(id);
    res.status(201).json(deletedTwit);
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

router.get("/", async (req: Request, res: Response) => {
  const twits = await twistService.getTwits();
  res.json(twits);
});

export default router;
