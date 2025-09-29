import { Card } from '../cards/Card';

export interface Deck {
  draw(): Card;
  shuffle(): void;
  addCard(card: Card): void;
  isEmpty(): boolean;
}
