import { Card } from "../cards/Card";
import { Deck } from "./Deck";
export declare class UnoDeck implements Deck {
    private cards;
    constructor();
    private generateDeck;
    draw(): Card;
    shuffle(): void;
    addCard(card: Card): void;
    isEmpty(): boolean;
}
//# sourceMappingURL=UnoDeck.d.ts.map