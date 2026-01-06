import { Card } from "../cards/Card";
import { CardType } from "./CardType";

export type TypedCard<T extends CardType> = Extract<Card, { type: T }>; // den hjælper med at specificere typen af kort baseret på CardType

/*
WHAT TO TALK ABOUT (EXAM):

- Utility types (Extract)
- Generics
- Type-level programming
- Compile-time safety
- No runtime cost

What I say:
“TypedCard uses the Extract utility type to filter the Card union
based on CardType. This is advanced type manipulation.”
*/



/*Extract
is a utility type in TypeScript that allows you to filter types from a union.
keeps only the members that match a condition

Card is a union of card types

{ type: T } is a constraint

Result: only cards with that type
*/

/*
✔ Hvad du siger:

“TypedCard er en type-helper der bruger Extract til at filtrere unionstypen Card baseret på et CardType.
Det betyder at TypedCard<CardType.Number> er præcis en NumberCard.
Det er avanceret type manipulation: conditional unions + utility types + generics.”

Dette opfylder:

utility types

generics

type manipulations

unions

narrowing

Dette alene kan give dig topkarakter.
*/