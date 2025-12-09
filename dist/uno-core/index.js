"use strict";
/*import { CardType } from './types/CardType';
import { NumberCard } from './cards/NumberCard';
import { UnoDeck } from './deck/UnoDeck';
import { PlayerHand } from './player/PlayerHand';
import { Round } from './round/Round';

console.log('🎮 UNO Game Test Starting...');

// Create a deck and add enough cards
const deck = new UnoDeck();
const colors = ['red', 'blue', 'green', 'yellow'];

for (const color of colors) {
  for (let i = 0; i <= 9; i++) {
    deck.addCard(new NumberCard(color, i));
  }
}

deck.shuffle();

// Create two players
const player1 = new PlayerHand();
const player2 = new PlayerHand();
const players = [player1, player2];

// Start a round
const round = new Round(players, deck);

// Show initial hands
console.log('🧑‍🎤 Player 1 hand:', player1.getCards());
console.log('🧑‍🎤 Player 2 hand:', player2.getCards());

// Simulate a few turns
for (let i = 0; i < 4; i++) {
  console.log(`🔁 Turn ${i + 1}`);
  round.playTurn();
  console.log('Top of discard pile:', round['discardPile'][round['discardPile'].length - 1]);
  console.log('Player 1 hand:', player1.getCards().map(c => `${c.color} ${CardType[c.type]}`));
  console.log('Player 2 hand:', player2.getCards().map(c => `${c.color} ${CardType[c.type]}`));
}

console.log('✅ Test complete');
*/
Object.defineProperty(exports, "__esModule", { value: true });
const CardType_1 = require("./types/CardType");
const UnoDeck_1 = require("./deck/UnoDeck");
const PlayerHand_1 = require("./player/PlayerHand");
const Round_1 = require("./round/Round");
console.log("🎮 UNO Game Test Starting...");
// Create and shuffle deck
const deck = new UnoDeck_1.UnoDeck();
deck.shuffle();
// Create players
const player1 = new PlayerHand_1.PlayerHand();
const player2 = new PlayerHand_1.PlayerHand();
const players = [player1, player2];
// Start a round
const round = new Round_1.Round(players, deck);
// Show initial hands
console.log("🧑‍🎤 Player 1 starting hand:", player1.getCards().map(c => `${c.color ?? "wild"} ${CardType_1.CardType[c.type]}`));
console.log("🧑‍🎤 Player 2 starting hand:", player2.getCards().map(c => `${c.color ?? "wild"} ${CardType_1.CardType[c.type]}`));
// Simulate a few turns
for (let i = 0; i < 5; i++) {
    console.log(`\n🔁 Turn ${i + 1}`);
    try {
        round.playTurn();
    }
    catch (e) {
        console.error("Error during turn:", e);
        break;
    }
    const top = round["discardPile"][round["discardPile"].length - 1];
    console.log("🃏 Top of discard pile:", `${top.color ?? "wild"} ${CardType_1.CardType[top.type]}`);
    console.log("Player 1 hand:", player1.getCards().map(c => `${c.color ?? "wild"} ${CardType_1.CardType[c.type]}`));
    console.log("Player 2 hand:", player2.getCards().map(c => `${c.color ?? "wild"} ${CardType_1.CardType[c.type]}`));
}
console.log("\n✅ UNO test complete!");
//# sourceMappingURL=index.js.map