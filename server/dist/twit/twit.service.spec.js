"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("./Service");
describe("TwitService", () => {
    const twitService = new Service_1.TwitService();
    it("should create a twit", async () => {
        const twit = await twitService.createTwit({ text: "Hello world" });
        expect(twit).toHaveProperty("id");
        expect(twit.text).toEqual("Hello world");
    });
});
