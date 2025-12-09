"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMemento = void 0;
exports.new_round = new_round;
exports.from_memento = from_memento;
const UnoDeck_1 = require("../deck/UnoDeck");
const PlayerHand_1 = require("../player/PlayerHand");
const Round_1 = require("../round/Round");
//💡 Et simpelt objekt der kan gemme hele spillets tilstand.
//at gemme/loade via GraphQL (Assignment 3),
//eller eksportere state til Vue-appen.
class GameMemento {
    constructor(state) {
        this.state = state;
    }
}
exports.GameMemento = GameMemento;
// fabriksfunktioner til oprettelse af nye runder og gendannelse fra mementos:
//fabrikker (factory functions)
function new_round(players, deck) {
    return new Round_1.Round(players, deck);
}
// gendannelse fra memento
//Genskaber en Round fra gemt data
function from_memento(memento) {
    const deck = new UnoDeck_1.UnoDeck();
    const players = memento.players.map(p => {
        const ph = new PlayerHand_1.PlayerHand();
        p.hand.forEach(c => ph.addCard(c));
        return ph;
    });
    const round = new Round_1.Round(players, deck);
    // restore discardPile, index, direction osv.
    return round;
}
/*
JSON-venlig state

DTO pattern (Data Transfer Object)

✔ Hvad du siger:

“Mementos bruges til at gemme og genskabe state.
Jeg modellerer dem som readonly JSON-venlige objekter uden metoder.
Dette matcher kravene for GraphQL transmissible state.”
*/ 
//# sourceMappingURL=Memento.js.map