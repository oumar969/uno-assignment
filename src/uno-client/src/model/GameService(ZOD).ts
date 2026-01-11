import * as api from "./api.js";
import { z } from "zod";
//validate server responses at runtime
//TypeScript types are only at compile time. Zod checks at runtime
//So if the server sends wrong data, Zod will throw an error instead of your UI breaking.
export class GameService {

  private static CardSchema = z.object({
    color: z.string().nullable(),
    type: z.string(),
    value: z.number().nullable().optional(),
    back: z.boolean().optional(),
  });

  private static PlayerSchema = z.object({
    id: z.string(),
    name: z.string(),
    handCount: z.number(),
    hand: z.array(GameService.CardSchema),
  });

  private static GameSchema = z.object({
    id: z.string(),
    winner: z.string().nullable(),
    activeColor: z.string().nullable(),
    direction: z.number(),
    currentPlayer: GameService.PlayerSchema.nullable(),
    topCard: GameService.CardSchema.nullable(),
    players: z.array(GameService.PlayerSchema),
  });

  async fetchGame(id: string) {
    const result = await api.game(id);
    return GameService.GameSchema.parse(result);
  }

  async joinGame(gameId: string, name: string) {
    const result = await api.joinGame(gameId, name);
    return GameService.GameSchema.parse(result);
  }

  async createGame() {
    const result = await api.createGame();
    return result;
  }
}
