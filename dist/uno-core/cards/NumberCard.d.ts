import { Card } from './Card';
import { Color } from "../types/Color";
export declare class NumberCard extends Card {
    readonly color: Color;
    readonly value: number;
    constructor(color: Color, value: number);
    matches(card: Card): boolean;
}
//# sourceMappingURL=NumberCard.d.ts.map