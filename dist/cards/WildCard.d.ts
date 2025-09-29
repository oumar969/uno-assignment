import { Card } from './Card';
import { CardType } from '../types/CardType';
export declare class WildCard extends Card {
    type: CardType;
    constructor(type: CardType);
    matches(_: Card): boolean;
}
//# sourceMappingURL=WildCard.d.ts.map