// src/deck/Deck.ts
import { Card } from '../cards/Card';
import { NumberCard } from '../cards/NumberCard';
import { SpecialCard } from '../cards/SpecialCard';
import { WildCard } from '../cards/WildCard';
import { CardType } from '../types/CardType';

export class UnoDeck {
  private cards: Card[] = [];

  constructor() {
    this.generateDeck();
    this.shuffle();
  }

  private generateDeck(): void {
    const colors = ['red', 'yellow', 'green', 'blue'];

    // Number cards (0–9, to of each number except 0)
    for (const color of colors) {
      this.cards.push(new NumberCard(color, 0)); // only one zero
      for (let i = 1; i <= 9; i++) {
        this.cards.push(new NumberCard(color, i));
        this.cards.push(new NumberCard(color, i));
      }

      // Special cards (two of each per color)
      for (let i = 0; i < 2; i++) {
        this.cards.push(new SpecialCard(color, CardType.Skip));
        this.cards.push(new SpecialCard(color, CardType.Reverse));
        this.cards.push(new SpecialCard(color, CardType.DrawTwo));
      }
    }

    // Wild cards (4 Wild + 4 Wild Draw Four)
    for (let i = 0; i < 4; i++) {
      this.cards.push(new WildCard(CardType.Wild));
      this.cards.push(new WildCard(CardType.WildDrawFour));
    }
  }

  draw(): Card {
    if (this.isEmpty()) throw new Error('Deck is empty');
    return this.cards.pop()!;
  }

  shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  isEmpty(): boolean {
    return this.cards.length === 0;
  }
}
