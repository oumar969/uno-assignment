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

/*
“Her viser jeg hvordan forskellige korttyper bruger polymorfisme til at definere deres regler.”
*/ 

/*
WHAT TO TALK ABOUT (EXAM):

- Inheritance and reuse
- Polymorphism: same method, different behavior
- Avoiding code duplication (DRY principle)

What I say:
“SpecialCard groups common logic for colored special cards.
Each card type defines its own matching behavior.”
*/
