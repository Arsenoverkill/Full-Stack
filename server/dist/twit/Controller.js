"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Service_1 = require("./Service");
const AuthMiddleware_1 = require("../AuthMiddleware");
const twitDto_1 = require("./twitDto");
const router = (0, express_1.Router)();
const twistService = new Service_1.TwitService();
router.post("/", AuthMiddleware_1.authMiddleware, async (req, res) => {
    const validation = twitDto_1.createTwitDto.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.flatten().fieldErrors });
    }
    const twit = await twistService.createTwit(req.body);
    res.status(201).json(twit);
});
router.get("/", async (req, res) => {
    const twits = await twistService.getTwits();
    res.json(twits);
});
exports.default = router;
