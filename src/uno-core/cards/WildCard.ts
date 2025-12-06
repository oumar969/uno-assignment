import { Card } from './Card';
import { CardType } from '../types/CardType';
import { Color } from "../types/Color";

export class WildCard extends Card {
    private _color: Color | null = null; // farve vælges når kortet spilles
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