// handles persistence of game state
export interface GameStore {
  getGames(): any[];
  getGame(id: string): any | undefined;
  addGame(game: any): void;
  updateGame(game: any): void;
}
