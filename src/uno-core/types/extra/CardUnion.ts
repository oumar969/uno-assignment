import type { NumberCard } from "../../cards/NumberCard";
import type { SpecialCard } from "../../cards/SpecialCard";
import type { WildCard } from "../../cards/WildCard";
import { CardType } from "../CardType";
import { Color } from "../Color";

/**
 * Discriminated union of all concrete card types.
 *
 * Discriminator: `type` (CardType enum).
 * type is the discriminator 
 * Each variant has different properties based on card type.
 */
export type CardUnion =
  | { type: CardType.Number; value: number; color: Color }
  | { type: CardType.Skip; color: Color }
  | { type: CardType.Reverse; color: Color }
  | { type: CardType.Wild };
