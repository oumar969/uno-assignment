import { Card } from '../cards/Card';

export interface Deck {
  draw(): Card;
  shuffle(): void;
  addCard(card: Card): void;
  isEmpty(): boolean;
}

/*
- Interface vs type
- interface = contract
- Abstraction: defining behavior, not implementation
 how a deck behaves.
*/
