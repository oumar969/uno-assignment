import { GameStore } from "./GameStore#";
//MemoryGameStore er en simpel implementation af GameStore der gemmer spil i hukommelsen
export class MemoryGameStore implements GameStore {
  private games: any[] = [];

  getGames() {
    return this.games;
  }

  getGame(id: string) {
    return this.games.find(g => g.id === id);
  }

  addGame(game: any) {
    this.games.push(game);
  }

  updateGame(game: any) {
    const index = this.games.findIndex(g => g.id === game.id);
    if (index !== -1) {
      this.games[index] = game;
    }
  }
}
