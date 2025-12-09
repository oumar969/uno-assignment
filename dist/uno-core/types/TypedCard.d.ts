import { Card } from "../cards/Card";
import { CardType } from "./CardType";
export type TypedCard<T extends CardType> = Extract<Card, {
    type: T;
}>;
//# sourceMappingURL=TypedCard.d.ts.map