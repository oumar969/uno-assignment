import { Card } from '../cards/Card';

export class PlayerHand {
  private hand: Card[] = [];

  addCard(card: Card): void {
    this.hand.push(card);
  }

  playCard(index: number): Card {
const removed = this.hand.splice(index, 1)[0];
if (!removed) throw new Error('Invalid card index');
return removed;
  }

  getCards(): Card[] {
    return [...this.hand];
  }

  hasPlayableCard(topCard: Card): boolean {
    return this.hand.some(card => card.matches(topCard));
  }

  getCardCount(): number {
    return this.hand.length;
  }
}
