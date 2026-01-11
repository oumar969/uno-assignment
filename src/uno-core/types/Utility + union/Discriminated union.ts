import { CardType } from "../CardType";
import { Color } from "../Color";

/**
 * Discriminated union of all concrete card types.
 * we have many types but there is o
 */
export type CardUnion =
  | { type: CardType.Number; value: number; color: Color }
  | { type: CardType.Skip; color: Color }
  | { type: CardType.Reverse; color: Color }
  | { type: CardType.Wild };

  
  // narrowing via discriminated union we use switch(card.type) or instanceof
  /*

  if (card instanceof WildCard) {
  card.setColor("red"); // her ved TS at det er WildCard
}
  */