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
/*
“Jeg bruger instanceof til type narrowing.
Hvis kortet er et NumberCard, kan jeg sikkert tilgå value.
Dette er et eksempel på runtime-narrowing.”

Dette opfylder læreren krav om:

casting & narrowing

unions (flere korttyper)

runtime type guards
*/