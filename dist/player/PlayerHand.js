"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerHand = void 0;
class PlayerHand {
    constructor() {
        this.hand = [];
    }
    addCard(card) {
        this.hand.push(card);
    }
    playCard(index) {
        const removed = this.hand.splice(index, 1)[0];
        if (!removed)
            throw new Error('Invalid card index');
        return removed;
    }
    getCards() {
        return [...this.hand];
    }
    hasPlayableCard(topCard) {
        return this.hand.some(card => card.matches(topCard));
    }
    getCardCount() {
        return this.hand.length;
    }
}
exports.PlayerHand = PlayerHand;
//# sourceMappingURL=PlayerHand.js.map