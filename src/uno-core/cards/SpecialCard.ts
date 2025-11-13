import { Card } from './Card';
import { CardType } from '../types/CardType';
import { Color } from "../types/Color";

export class SpecialCard extends Card {
  constructor(public readonly color: Color, public readonly type: CardType) {
    super(color, type);
  }

  matches(card: Card): boolean {
    return card.color === this.color || card.type === this.type;
  }
}
