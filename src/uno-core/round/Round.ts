import { UnoDeck } from '../deck/UnoDeck';
import { PlayerHand } from '../player/PlayerHand';
import { Card } from '../cards/Card';
import { CardType } from '../types/CardType';
/*
OOP
Encapsulation 
Round runs the rules and turn flow
switch(card.type) for rule branching 
callback predicate
Array operations
narrowing (instanceof WildCard)
switch på CardType (discriminating union via enum)
*/
export class Round {
  //instance variables or state
  private drawPile: UnoDeck;
  private discardPile: Card[] = [];
  private players: PlayerHand[] = [];
  private currentPlayerIndex = 0;
  private direction = 1; 
  /*private state: {
    drawPile: UnoDeck;
    discardPile: Card[];
    players: PlayerHand[];
    currentPlayerIndex: number;
    direction: number;
  };*/
  constructor(players: PlayerHand[], deck: UnoDeck) {
    this.players = players;
    this.drawPile = deck;
    this.drawPile.shuffle();
    this.startRound();
  }
 //  applies UNO special-card rules
  private handleSpecialCard(card: Card): void {
    switch (card.type) {
      case CardType.Skip:
        console.log('Skip!');
        this.nextPlayer();// move to next player...
        this.nextPlayer(); // ...and skip their turn
        break;

      case CardType.Reverse:
        if (this.players.length === 2) {
          console.log('Reverse (acts like Skip with 2 players)');
          this.nextPlayer(); //move to next player...
          this.nextPlayer();
        } else {
          console.log(' Reverse direction!');
          this.direction *= -1;
          this.nextPlayer();
        }
        break;

      case CardType.DrawTwo:
        console.log('2! Next player draws 2 cards');
        this.forceDraw(2);
        this.nextPlayer();
        this.nextPlayer(); //move to next player...
        break;

      case CardType.Wild:
        console.log(' Wild! Choosing a color...');
        //this.chooseRandomColor(card as WildCard);
        this.nextPlayer();
        break;

      case CardType.WildDrawFour:
        console.log('4! Next player draws 4 cards');
        //this.chooseRandomColor(card as WildCard);
        this.forceDraw(4);
        this.nextPlayer();
        this.nextPlayer(); // spring turen over
        break;

      default:
        this.nextPlayer();
        break;
    }
  }
  //Deals 7 cards to each player
  private startRound(): void {
    for (const player of this.players) {
      for (let i = 0; i < 7; i++) {
        player.addCard(this.drawPile.draw());
      }
    }
    // Pick the first top card (must not be wild)
    const tempWildCards: Card[] = [];
    let firstCard = this.drawPile.draw();
    
    while (firstCard.type === CardType.Wild || firstCard.type === CardType.WildDrawFour) {
      tempWildCards.push(firstCard);
      firstCard = this.drawPile.draw();
    }
    
    for (const wildCard of tempWildCards) {
      this.discardPile.push(wildCard);
    }
    this.discardPile.push(firstCard);
  }
  //returns the current top card on the discard pile (or null if empty)
  getTopCard(): Card | null {
    if (this.discardPile.length === 0) return null;
    const topCard = this.discardPile[this.discardPile.length - 1];
    return topCard ?? null;
  }

  checkUno(player: PlayerHand): void {
    if (player.getCardCount() === 1) {
      console.log("UNO! 🎉");
    }
  }
  // executes a single turn for the current player
  playTurn(): void {
    const player = this.players[this.currentPlayerIndex];
    const topCard = this.discardPile[this.discardPile.length - 1];

    if (!player || !topCard) throw new Error('Missing player or top card');

    console.log(`Turn: Player ${this.currentPlayerIndex + 1}`);
    console.log(`Top of discard pile: ${topCard.constructor.name} ${JSON.stringify(topCard)}`);

    if (player.hasPlayableCard(topCard)) {
      const card = player.getCards().find(c => c.matches(topCard));
      if (!card) throw new Error('No matching card found');

      player.playCard(player.getCards().indexOf(card));
      this.discardPile.push(card);

      this.handleSpecialCard(card);
    } else {
      player.addCard(this.drawPile.draw());
      this.nextPlayer();
    }
  }
  // advances to the next player's turn
  nextTurn(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + this.direction + this.players.length) %
      this.players.length;
  }
  // returns the PlayerHand for the current player.
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
  // reverseDirection: flips direction (forward <-> reverse).
  reverseDirection(): void {
    this.direction *= -1;
  }
  // advances to the next player based on direction.
  private nextPlayer(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + this.direction + this.players.length) %
      this.players.length;
  }
  // makes the next player (based on direction) draw a specific number of cards
  private forceDraw(count: number): void {
  const nextIndex =
    (this.currentPlayerIndex + this.direction + this.players.length) %
    this.players.length;
  const nextPlayer = this.players[nextIndex];
  if (!nextPlayer) throw new Error("Next player not found");

  for (let i = 0; i < count; i++) {
    nextPlayer.addCard(this.drawPile.draw());
  }
 }
}

