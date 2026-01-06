export enum CardType {
  Number,
  Skip,
  Reverse,
  DrawTwo,
  Wild,
  WildDrawFour
}


/*
discriminated union 

export type Card =
  | NumberCard
  | SkipCard
  | ReverseCard
  | DrawTwoCard
  | WildCard
  | WildDrawFourCard;

then we can define a type 'Card' that can be any of these specific card types
as
export type NumberCard = {
  type: CardType.Number;
  color: Color;
  value: number;
};

*/
/*
WHAT TO TALK ABOUT (EXAM):

- Enums as discriminators
- Discriminated unions
- Safer switch statements
- Preventing invalid states

What I say:
“CardType acts as the discriminator for the card union
and enables safe narrowing in switch statements.”
*/
