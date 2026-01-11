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
