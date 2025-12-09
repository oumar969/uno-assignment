import { Card } from '../cards/Card';
export declare class PlayerHand {
    private hand;
    addCard(card: Card): void;
    playCard(index: number): Card;
    getCards(): Card[];
    hasPlayableCard(topCard: Card): boolean;
    getCardCount(): number;
}
//# sourceMappingURL=PlayerHand.d.ts.map