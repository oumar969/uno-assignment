import { Card } from './Card';
import { CardType } from '../types/CardType';

export class SpecialCard extends Card {
  constructor(public color: string, public type: CardType) {
    super(color, type);
  }

  matches(card: Card): boolean {
    return card.color === this.color || card.type === this.type;
  }
}
