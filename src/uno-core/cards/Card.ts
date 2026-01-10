import { CardType } from "../types/CardType";
import { Color } from "../types/Color";

export abstract class Card {
  constructor(
    public readonly color: Color | null, // wildcards
    public readonly type: CardType, 
  ) {}

  abstract matches(card: Card): boolean;
}



/*
OO inheritance
Immutability
Unions (Color | null)
Polymorfi
abstrakte metoder

// readonly is added to make properties immutable after initialization
// that means once a WildCard is created, its type cannot be changed

- Object-Oriented Programming: abstract base class
- Encapsulation: access modifiers (public, readonly)
- Immutability: readonly properties prevent accidental mutation
- Union types: Color | null models wild cards correctly
- Polymorphism: matches() is abstract and implemented by subclasses

*/