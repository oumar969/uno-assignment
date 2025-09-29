"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialCard = void 0;
const Card_1 = require("./Card");
class SpecialCard extends Card_1.Card {
    constructor(color, type) {
        super(color, type);
        this.color = color;
        this.type = type;
    }
    matches(card) {
        return card.color === this.color || card.type === this.type;
    }
}
exports.SpecialCard = SpecialCard;
//# sourceMappingURL=SpecialCard.js.map