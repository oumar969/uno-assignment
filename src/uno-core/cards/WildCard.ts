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
 
