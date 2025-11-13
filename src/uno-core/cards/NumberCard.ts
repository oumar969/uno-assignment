import { Card } from './Card';
import { CardType } from '../types/CardType';
import { Color } from "../types/Color";

export class NumberCard extends Card {
  constructor(public readonly color: Color, public readonly value: number) {
    super(color, CardType.Number);
  }

  matches(card: Card): boolean {
    return (
      card.color === this.color ||
      (card instanceof NumberCard && card.value === this.value)
    );
  }
}
