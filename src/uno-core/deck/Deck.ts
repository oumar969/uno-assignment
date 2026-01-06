import { Card } from '../cards/Card';

export interface Deck {
  draw(): Card;
  shuffle(): void;
  addCard(card: Card): void;
  isEmpty(): boolean;
}

// forskellen mellem interface and types 
/*

✔ interface for deck operations
✔ encapsulates deck behavior
Du viser:

array operations

generering af complete UNO deck

shuffle med sort(() => Math.random() - 0.5)

error handling

klassisk OOP interface + implementation

✔ Eksamensforklaring:

“Deck er defineret som interface (abstraktion) og UnoDeck som implementation (OOP-princip).
Jeg bruger arrays og generics-frie konstruktioner men holder state indenfor objektet.
Der må gerne være mutation i Deck, da det modellerer en fysisk bunke kort.”
*/

/*
WHAT TO TALK ABOUT (EXAM):

- Interface vs class
- Abstraction: defining behavior, not implementation
- Encapsulation of deck operations
- OOP design principle

What I say:
“Deck is an interface that defines how a deck behaves.
UnoDeck is the concrete implementation.”
*/
