/*
GameStore er et interface, der abstraherer hvor spilstate gemmes:
MemoryGameStore er en konkret implementation
ServerModel kender kun interfacet – ikke hvordan data gemmes
Gør det muligt senere at skifte til fx MongoDB uden at ændre logik
*/

export interface GameStore {
  getGames(): any[];
  getGame(id: string): any | undefined;
  addGame(game: any): void;
  updateGame(game: any): void;
}
