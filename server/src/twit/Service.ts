import { PrismaClient, Twit } from "@prisma/client";
import { IcreateTwit } from "./twitType";
import { logger } from "@/utils/log";

export class TwitService {
  private prisma = new PrismaClient();
  async createTwit(twit: IcreateTwit): Promise<Twit> {
    try {
      return await this.prisma.twit.create({ data: twit });
    } catch (error) {
      logger.error(error);
      throw new Error("Something went wrong");
    }
  }
  async deleted(id: string): Promise<Twit> {
    try {
      return await this.prisma.twit.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to delete twit");
    }
  }
  async getTwits(): Promise<Twit[]> {
    try {
      return await this.prisma.twit.findMany();
    } catch (error) {
      logger.error(error);
      throw new Error("Something went wrong");
    }
  }
}
