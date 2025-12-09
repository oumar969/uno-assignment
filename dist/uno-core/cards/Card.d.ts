import { CardType } from "../types/CardType";
import { Color } from "../types/Color";
export declare abstract class Card {
    readonly color: Color | null;
    readonly type: CardType;
    constructor(color: Color | null, // null tilladt for wildcards
    type: CardType);
    abstract matches(card: Card): boolean;
}
//# sourceMappingURL=Card.d.ts.map