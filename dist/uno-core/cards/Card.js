"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(color, // null tilladt for wildcards
    type) {
        this.color = color;
        this.type = type;
    }
}
exports.Card = Card;
// readonly is added to make properties immutable after initialization
// that means once a WildCard is created, its type cannot be changed
/*
“Card er en abstrakt baseklasse. Jeg bruger readonly for immutability — når et kort er oprettet kan det ikke ændres. Det gør spillets state mere stabilt.
color er null for wildcards, hvilket er modelleret gennem union-typen Color | null.
Jeg bruger objektorienteret arv og en abstrakt metode matches, som polymorfisk implementeres i de forskellige korttyper.”

Dette viser:

OO inheritance
Immutability
Unions (Color | null)
Polymorfi
abstrakte metoder
*/ 
//# sourceMappingURL=Card.js.map