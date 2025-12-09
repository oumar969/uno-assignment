"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WildCard = void 0;
const Card_1 = require("./Card");
class WildCard extends Card_1.Card {
    constructor(type) {
        super(null, type);
        this.type = type;
        this._color = null; // farve vælges når kortet spilles
    }
    matches(_) {
        return true;
    }
    setColor(color) {
        this._color = color;
    }
    getColor() {
        return this._color;
    }
}
exports.WildCard = WildCard;
/*
Hvad du siger:

“Selvom kortet er immutable, må farven sættes i runtime når kortet spilles.
Derfor har jeg en intern mutable property _color. color i parent-klassen er altid null for wildcards, hvilket er et bevidst type-designvalg.”

Dette viser:

forståelse for state mutation
immutability som udgangspunkt
runtime-state når regler kræver det
*/ 
//# sourceMappingURL=WildCard.js.map