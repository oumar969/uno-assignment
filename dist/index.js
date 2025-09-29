"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardType_1 = require("./types/CardType");
const NumberCard_1 = require("./cards/NumberCard");
const UnoDeck_1 = require("./deck/UnoDeck");
const PlayerHand_1 = require("./player/PlayerHand");
const Round_1 = require("./round/Round");
console.log('🎮 UNO Game Test Starting...');
// Create a deck and add enough cards
const deck = new UnoDeck_1.UnoDeck();
const colors = ['red', 'blue', 'green', 'yellow'];
for (const color of colors) {
    for (let i = 0; i <= 9; i++) {
        deck.addCard(new NumberCard_1.NumberCard(color, i));
    }
}
deck.shuffle();
// Create two players
const player1 = new PlayerHand_1.PlayerHand();
const player2 = new PlayerHand_1.PlayerHand();
const players = [player1, player2];
// Start a round
const round = new Round_1.Round(players, deck);
// Show initial hands
console.log('🧑‍🎤 Player 1 hand:', player1.getCards());
console.log('🧑‍🎤 Player 2 hand:', player2.getCards());
// Simulate a few turns
for (let i = 0; i < 4; i++) {
    console.log(`🔁 Turn ${i + 1}`);
    round.playTurn();
    console.log('Top of discard pile:', round['discardPile'][round['discardPile'].length - 1]);
    console.log('Player 1 hand:', player1.getCards().map(c => `${c.color} ${CardType_1.CardType[c.type]}`));
    console.log('Player 2 hand:', player2.getCards().map(c => `${c.color} ${CardType_1.CardType[c.type]}`));
}
console.log('✅ Test complete');
//# sourceMappingURL=index.js.map