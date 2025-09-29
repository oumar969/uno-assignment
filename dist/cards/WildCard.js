"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WildCard = void 0;
const Card_1 = require("./Card");
class WildCard extends Card_1.Card {
    constructor(type) {
        super(null, type); // Wild cards have no color until played
        this.type = type;
    }
    matches(_) {
        return true; // Wild cards match anything
    }
}
exports.WildCard = WildCard;
//# sourceMappingURL=WildCard.js.map