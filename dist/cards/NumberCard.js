"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberCard = void 0;
const Card_1 = require("./Card");
const CardType_1 = require("../types/CardType");
class NumberCard extends Card_1.Card {
    constructor(color, value) {
        super(color, CardType_1.CardType.Number);
        this.color = color;
        this.value = value;
    }
    matches(card) {
        return (card.color === this.color ||
            (card instanceof NumberCard && card.value === this.value));
    }
}
exports.NumberCard = NumberCard;
//# sourceMappingURL=NumberCard.js.map