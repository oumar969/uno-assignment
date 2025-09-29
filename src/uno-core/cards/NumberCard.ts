import { Card } from './Card';
import { CardType } from '../types/CardType';

export class NumberCard extends Card {
  constructor(public color: string, public value: number) {
    super(color, CardType.Number);
  }

  matches(card: Card): boolean {
    return (
      card.color === this.color ||
      (card instanceof NumberCard && card.value === this.value)
    );
  }
}
