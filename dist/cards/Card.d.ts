import { CardType } from '../types/CardType';
export declare abstract class Card {
    color: string | null;
    type: CardType;
    constructor(color: string | null, type: CardType);
    abstract matches(card: Card): boolean;
}
//# sourceMappingURL=Card.d.ts.map