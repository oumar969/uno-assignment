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
extends
readonly
super
narrowing by instanceof 
*/

/*
WHAT TO TALK ABOUT (EXAM):

- Inheritance: extends Card
- super(): calling parent constructor
- readonly properties for immutability
- Narrowing with instanceof (runtime type guard)
- Polymorphism: custom matches() logic

What I say:
“NumberCard extends Card and uses instanceof for runtime narrowing.
This allows safe access to value and demonstrates polymorphism.”
*/
