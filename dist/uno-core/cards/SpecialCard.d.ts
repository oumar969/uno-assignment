import { Card } from './Card';
import { CardType } from '../types/CardType';
import { Color } from "../types/Color";
export declare class SpecialCard extends Card {
    readonly color: Color;
    readonly type: CardType;
    constructor(color: Color, type: CardType);
    matches(card: Card): boolean;
}
//# sourceMappingURL=SpecialCard.d.ts.map