import { Card } from '../cards/Card';

export interface Deck {
  draw(): Card;
  shuffle(): void;
  addCard(card: Card): void;
  isEmpty(): boolean;
}

/*
- OOP design principle
// differint between interface and types 
- Interface vs class
interface = contract
- Abstraction: defining behavior, not implementation
- Encapsulation of deck operations

What I say:
“Deck is an interface that defines how a deck behaves.
UnoDeck is the concrete implementation.”
*/
