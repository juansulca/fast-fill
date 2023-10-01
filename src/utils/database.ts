import { Game } from "@/model/game";
import { Redis } from "@upstash/redis";

const EntryTTL = 3600;

class DataBase {
  private readonly redis: Redis;

  constructor() {
    this.redis = Redis.fromEnv();
  }

  async createGame(gameId: string, playerId: string) {
    const game: Game = {
      id: gameId,
      board: Array(16).fill('empty'),
      redPlayer: playerId,
      redScore: 0,
      blueScore: 0,
    };

    await this.redis.set(gameId, game, { ex: EntryTTL });

    return gameId;
  }

  async getGame(id: string): Promise<Game> {
    const result = await this.redis.get(id);

    return result as Game;
  }

  async updateGame(id: string, game: Game): Promise<Game> {
    const result = await this.redis.set(id, game);

    return game;
  }

}

export const db = new DataBase();
