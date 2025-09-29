import { UnoDeck } from '../deck/UnoDeck';
import { PlayerHand } from '../player/PlayerHand';
export declare class Round {
    private drawPile;
    private discardPile;
    private players;
    private currentPlayerIndex;
    private direction;
    constructor(players: PlayerHand[], deck: UnoDeck);
    private startRound;
    playTurn(): void;
    private handleSpecialCard;
    private nextPlayer;
    private forceDraw;
    private chooseRandomColor;
}
//# sourceMappingURL=Round.d.ts.map