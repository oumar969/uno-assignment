"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const CardType_1 = require("../types/CardType");
class Round {
    constructor(players, deck) {
        this.discardPile = [];
        this.players = [];
        this.currentPlayerIndex = 0;
        this.direction = 1; // 1 = fremad, -1 = baglæns
        this.players = players;
        this.drawPile = deck;
        this.drawPile.shuffle();
        this.startRound();
    }
    startRound() {
        for (const player of this.players) {
            for (let i = 0; i < 7; i++) {
                player.addCard(this.drawPile.draw());
            }
        }
        this.discardPile.push(this.drawPile.draw());
    }
    playTurn() {
        const player = this.players[this.currentPlayerIndex];
        const topCard = this.discardPile[this.discardPile.length - 1];
        if (!player || !topCard)
            throw new Error('Missing player or top card');
        console.log(`🔁 Turn: Player ${this.currentPlayerIndex + 1}`);
        console.log(`Top of discard pile: ${topCard.constructor.name} ${JSON.stringify(topCard)}`);
        if (player.hasPlayableCard(topCard)) {
            const card = player.getCards().find(c => c.matches(topCard));
            if (!card)
                throw new Error('No matching card found');
            player.playCard(player.getCards().indexOf(card));
            this.discardPile.push(card);
            // 👉 Her håndterer vi specialkort
            this.handleSpecialCard(card);
        }
        else {
            player.addCard(this.drawPile.draw());
            this.nextPlayer();
        }
    }
    handleSpecialCard(card) {
        switch (card.type) {
            case CardType_1.CardType.Skip:
                console.log('⏭️ Skip!');
                this.nextPlayer(); // spring én spiller over
                this.nextPlayer();
                break;
            case CardType_1.CardType.Reverse:
                if (this.players.length === 2) {
                    console.log('🔄 Reverse (acts like Skip with 2 players)');
                    this.nextPlayer(); // spring én spiller over
                    this.nextPlayer();
                }
                else {
                    console.log('🔄 Reverse direction!');
                    this.direction *= -1;
                    this.nextPlayer();
                }
                break;
            case CardType_1.CardType.DrawTwo:
                console.log('➕2! Next player draws 2 cards');
                this.forceDraw(2);
                this.nextPlayer();
                this.nextPlayer(); // spring spillerens tur over
                break;
            case CardType_1.CardType.Wild:
                console.log('🌈 Wild! Choosing a color...');
                this.chooseRandomColor(card);
                this.nextPlayer();
                break;
            case CardType_1.CardType.WildDrawFour:
                console.log('🌈➕4! Next player draws 4 cards');
                this.chooseRandomColor(card);
                this.forceDraw(4);
                this.nextPlayer();
                this.nextPlayer(); // spring turen over
                break;
            default:
                this.nextPlayer();
                break;
        }
    }
    nextPlayer() {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + this.direction + this.players.length) %
                this.players.length;
    }
    forceDraw(count) {
        const nextIndex = (this.currentPlayerIndex + this.direction + this.players.length) %
            this.players.length;
        const nextPlayer = this.players[nextIndex];
        if (!nextPlayer)
            throw new Error("Next player not found");
        for (let i = 0; i < count; i++) {
            nextPlayer.addCard(this.drawPile.draw());
        }
    }
    chooseRandomColor(card) {
        const colors = ['red', 'blue', 'green', 'yellow'];
        const chosen = colors[Math.floor(Math.random() * colors.length)];
        card.color = chosen;
        console.log(`🎨 Wild color chosen: ${chosen}`);
    }
}
exports.Round = Round;
//# sourceMappingURL=Round.js.map