"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitService = void 0;
const client_1 = require("@prisma/client");
const log_1 = require("@/utils/log");
class TwitService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    createTwit(twit) {
        try {
            return this.prisma.twit.create({ data: twit });
        }
        catch (error) {
            log_1.logger.error(error);
            throw new Error("Something went wrong");
        }
    }
    async getTwits() {
        try {
            return this.prisma.twit.findMany();
        }
        catch (error) {
            log_1.logger.error(error);
            throw new Error("Something went wrong");
        }
    }
}
exports.TwitService = TwitService;
