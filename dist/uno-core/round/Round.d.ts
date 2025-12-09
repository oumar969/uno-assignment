import { UnoDeck } from '../deck/UnoDeck';
import { PlayerHand } from '../player/PlayerHand';
import { Card } from '../cards/Card';
export declare class Round {
    private drawPile;
    private discardPile;
    private players;
    private currentPlayerIndex;
    private direction;
    constructor(players: PlayerHand[], deck: UnoDeck);
    private startRound;
    getTopCard(): Card | null;
    checkUno(player: PlayerHand): void;
    playTurn(): void;
    nextTurn(): void;
    getCurrentPlayer(): PlayerHand | undefined;
    reverseDirection(): void;
    private handleSpecialCard;
    private nextPlayer;
    private forceDraw;
    private chooseRandomColor;
}
//# sourceMappingURL=Round.d.ts.map