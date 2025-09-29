"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnoDeck = void 0;
const NumberCard_1 = require("../cards/NumberCard");
const SpecialCard_1 = require("../cards/SpecialCard");
const WildCard_1 = require("../cards/WildCard");
const CardType_1 = require("../types/CardType");
class UnoDeck {
    constructor() {
        this.cards = [];
        this.generateDeck();
        this.shuffle();
    }
    generateDeck() {
        const colors = ['red', 'yellow', 'green', 'blue'];
        // Number cards (0–9, to of each number except 0)
        for (const color of colors) {
            this.cards.push(new NumberCard_1.NumberCard(color, 0)); // only one zero
            for (let i = 1; i <= 9; i++) {
                this.cards.push(new NumberCard_1.NumberCard(color, i));
                this.cards.push(new NumberCard_1.NumberCard(color, i));
            }
            // Special cards (two of each per color)
            for (let i = 0; i < 2; i++) {
                this.cards.push(new SpecialCard_1.SpecialCard(color, CardType_1.CardType.Skip));
                this.cards.push(new SpecialCard_1.SpecialCard(color, CardType_1.CardType.Reverse));
                this.cards.push(new SpecialCard_1.SpecialCard(color, CardType_1.CardType.DrawTwo));
            }
        }
        // Wild cards (4 Wild + 4 Wild Draw Four)
        for (let i = 0; i < 4; i++) {
            this.cards.push(new WildCard_1.WildCard(CardType_1.CardType.Wild));
            this.cards.push(new WildCard_1.WildCard(CardType_1.CardType.WildDrawFour));
        }
    }
    draw() {
        if (this.isEmpty())
            throw new Error('Deck is empty');
        return this.cards.pop();
    }
    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }
    addCard(card) {
        this.cards.push(card);
    }
    isEmpty() {
        return this.cards.length === 0;
    }
}
exports.UnoDeck = UnoDeck;
//# sourceMappingURL=UnoDeck.js.map