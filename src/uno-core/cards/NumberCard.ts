import { Card } from './Card';
import { CardType } from '../types/CardType';
import { Color } from "../types/Color";

export class NumberCard extends Card {
  //public readonly type: CardType.Number = CardType.Number;

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
overriding matches
- Polymorphism: custom matches() logic
readonly
super
narrowing by instanceof : accessing value safely
Casting & Narrowing
*/

/*
WHAT TO TALK ABOUT (EXAM):

- Inheritance: extends Card
- super(): calling parent constructor
- readonly properties for immutability
- Narrowing with instanceof (runtime type guard)


What I say:
“NumberCard extends Card and uses instanceof for runtime narrowing.
This allows safe access to value and demonstrates polymorphism.”
*/
