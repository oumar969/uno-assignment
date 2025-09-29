import { CardType } from '../types/CardType';

export abstract class Card {
  constructor(public color: string | null, public type: CardType) {}

  abstract matches(card: Card): boolean;
}
