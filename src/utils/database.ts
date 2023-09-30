import { Game } from "@/model/game";
import { Redis } from "@upstash/redis";

const EntryTTL = 3600;

class DataBase {
  private readonly redis: Redis;

  constructor() {
    this.redis = Redis.fromEnv();
  }

  async createNewGame(gameId: string, playerId: string) {
    const game: Game = {
      id: gameId,
      board: Array(16).fill('empty'),
      redPlayer: playerId,
    };

    await this.redis.set(gameId, game, { ex: EntryTTL });

    return gameId;
  }

  async getEntry(id: string) {
    const result = await this.redis.get(id);

    return result;
  }

}

export const db = new DataBase();
