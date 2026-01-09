import { Card } from './Card';
import { CardType } from '../types/CardType';
import { Color } from "../types/Color";

//export type WildCardType = CardType.Wild | CardType.WildDrawFour;

export class WildCard extends Card {
    private _color: Color | null = null; // farve vælges når kortet spilles
    //  constructor(public readonly type: WildCardType) {
    constructor(public readonly type: CardType) {
    super(null, type); 
  }

  matches(_: Card): boolean {
    return true; 
  }

  setColor(color: Color): void {
    this._color = color;
  }

  getColor(): Color | null {
    return this._color;
  }
}
 
/*
Hvad du siger:

“Selvom kortet er immutable, må farven sættes i runtime når kortet spilles.
Derfor har jeg en intern mutable property _color. color i parent-klassen er altid null for wildcards, hvilket er et bevidst type-designvalg.”

Dette viser:

forståelse for state mutation
immutability som udgangspunkt
runtime-state når regler kræver det
*/

/*
WHAT TO TALK ABOUT (EXAM):

- Controlled mutation vs immutability
- Runtime state vs initial state
- Why color is null in base Card
- Encapsulation using private fields

What I say:
“Wild cards are immutable by default, but require controlled mutation
when a color is chosen at runtime. This models the game rules correctly.”
*/
