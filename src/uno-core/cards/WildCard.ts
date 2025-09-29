import { Card } from './Card';
import { CardType } from '../types/CardType';

export class WildCard extends Card {
  constructor(public type: CardType) {
    super(null, type); // Wild cards have no color until played
  }

  matches(_: Card): boolean {
    return true; // Wild cards match anything
  }
}
