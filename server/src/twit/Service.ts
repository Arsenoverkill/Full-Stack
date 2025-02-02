import { PrismaClient, Twit } from "@prisma/client";
import { IcreateTwit } from "./twitType";
import { logger } from "@/utils/log";

export class TwitService {
  private prisma = new PrismaClient();
  createTwit(twit: IcreateTwit): Promise<Twit> {
    try {
      return this.prisma.twit.create({ data: twit });
    } catch (error) {
      logger.error(error);
      throw new Error("Something went wrong");
    }
  }
  async getTwits(): Promise<Twit[]> {
    try {
      return this.prisma.twit.findMany();
    } catch (error) {
      logger.error(error);
      throw new Error("Something went wrong");
    }
  }
}
