import { Card } from './Card';
import { CardType } from '../types/CardType';
import { Color } from "../types/Color";
export declare class WildCard extends Card {
    readonly type: CardType;
    private _color;
    constructor(type: CardType);
    matches(_: Card): boolean;
    setColor(color: Color): void;
    getColor(): Color | null;
}
//# sourceMappingURL=WildCard.d.ts.map