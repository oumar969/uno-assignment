import { Card } from './Card';
import { CardType } from '../types/CardType';
export declare class SpecialCard extends Card {
    color: string;
    type: CardType;
    constructor(color: string, type: CardType);
    matches(card: Card): boolean;
}
//# sourceMappingURL=SpecialCard.d.ts.map