import { CardType } from "../types/CardType";
import { Color } from "../types/Color";

export abstract class Card {
  constructor(
    public readonly color: Color | null, // null tilladt for wildcards
    public readonly type: CardType
  ) {}

  abstract matches(card: Card): boolean;
}
// readonly is added to make properties immutable after initialization
// that means once a WildCard is created, its type cannot be changed