import { Card } from '../cards/Card';

export class PlayerHand {
  //Encapsulation
  private hand: Card[] = [];

  addCard(card: Card): void {
    this.hand.push(card);
  }
  //Error Handling & Safety
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

/*
Encapsulation is an OOP principle where internal state is hidden from outside.
“Jeg returnerer en kopi af håndens array for at bevare immutability udadtil. Ellers kunne andre dele af systemet mutere hånden direkte.”

Dette viser du forstår capsulation + immutability som designprincip.
*/  

/*
WHAT TO TALK ABOUT (EXAM):

- Encapsulation
- Defensive copying to preserve immutability
- Single responsibility
- Polymorphic use of matches()

What I say:
“PlayerHand encapsulates a player’s cards and protects internal state
by returning copies instead of the original array.”
*/
