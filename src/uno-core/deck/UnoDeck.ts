import { Card } from "../cards/Card";
import { NumberCard } from "../cards/NumberCard";
import { SpecialCard } from "../cards/SpecialCard";
import { WildCard } from "../cards/WildCard";
import { CardType } from "../types/CardType";
import { Color } from "../types/Color";
import { Deck } from "./Deck";

/*
- Interface implementation
- Encapsulation of mutable state
- Array operations
- Error handling
- Real-world modeling (physical deck of cards)
*/

export class UnoDeck implements Deck {
  private cards: Card[] = []; 

  constructor() {
    this.generateDeck();
    this.shuffle();
  }

  private generateDeck(): void {
    const colors: Color[] = ["red", "yellow", "green", "blue"];

    // Number cards
    for (const color of colors) {
      this.cards.push(new NumberCard(color, 0));
      for (let i = 1; i <= 9; i++) {
        this.cards.push(new NumberCard(color, i));
        this.cards.push(new NumberCard(color, i));
      }

      // Special cards
      for (let i = 0; i < 2; i++) {
        this.cards.push(new SpecialCard(color, CardType.Skip));
        this.cards.push(new SpecialCard(color, CardType.Reverse));
        this.cards.push(new SpecialCard(color, CardType.DrawTwo));
      }
    }

    // Wild cards
    for (let i = 0; i < 4; i++) {
      this.cards.push(new WildCard(CardType.Wild));
      this.cards.push(new WildCard(CardType.WildDrawFour));
    }
  }

  draw(): Card {
    if (this.isEmpty()) throw new Error("Deck is empty");
    return this.cards.pop()!;//pop returns Card | undefined
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }
  
  shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);//randomize array
  }
  
  isEmpty(): boolean {
  return this.cards.length === 0;
  }
}