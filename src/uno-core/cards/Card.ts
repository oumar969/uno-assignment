import { CardType } from "../types/CardType";
import { Color } from "../types/Color";

export abstract class Card {
  constructor(
    public readonly color: Color | null, // null tilladt for wildcards
    public readonly type: CardType
  ) {}

  abstract matches(card: Card): boolean;
}



/*


abstract class

shared base class

abstract method (matches)

inheritance
I use an abstract base class to define shared behavior and force subclasses to implement their own matching logic
readonly
state cannot be mutated after creation




// readonly is added to make properties immutable after initialization
// that means once a WildCard is created, its type cannot be changed


“Card er en abstrakt baseklasse. Jeg bruger readonly for immutability — når et kort er oprettet kan det ikke ændres. Det gør spillets state mere stabilt.
color er null for wildcards, hvilket er modelleret gennem union-typen Color | null.
Jeg bruger objektorienteret arv og en abstrakt metode matches, som polymorfisk implementeres i de forskellige korttyper.”

Dette viser:

OO inheritance
Immutability
Unions (Color | null)
Polymorfi
abstrakte metoder
*/

/*
WHAT TO TALK ABOUT (EXAM):

- Object-Oriented Programming: abstract base class
- Encapsulation: Card defines shared structure for all cards
- Immutability: readonly properties prevent accidental mutation
- Union types: Color | null models wild cards correctly
- Polymorphism: matches() is abstract and implemented by subclasses

*/