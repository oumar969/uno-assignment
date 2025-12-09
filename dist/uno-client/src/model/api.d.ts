export declare function games(): Promise<any>;
export declare function createGame(): Promise<any>;
export declare function joinGame(gameId: string, name: string): Promise<any>;
export declare function game(id: string): Promise<any>;
export declare function playCard(gameId: string, playerId: string, cardIndex: number, chosenColor?: string): Promise<any>;
export declare function drawCard(gameId: string, playerId: string): Promise<any>;
//# sourceMappingURL=api.d.ts.map