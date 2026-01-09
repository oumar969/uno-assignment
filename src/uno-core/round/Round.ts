import { UnoDeck } from '../deck/UnoDeck';
import { PlayerHand } from '../player/PlayerHand';
import { Card } from '../cards/Card';
import { CardType } from '../types/CardType';
import { WildCard } from '../cards/WildCard';

export class Round {
  private drawPile: UnoDeck;
  private discardPile: Card[] = [];
  private players: PlayerHand[] = [];
  private currentPlayerIndex = 0;
  private direction = 1; 

  constructor(players: PlayerHand[], deck: UnoDeck) {
    this.players = players;
    this.drawPile = deck;
    this.drawPile.shuffle();
    this.startRound();
  }

  private startRound(): void {
    for (const player of this.players) {
      for (let i = 0; i < 7; i++) {
        player.addCard(this.drawPile.draw());
      }
    }
    
    // Træk første kort - må IKKE være Wild eller WildDrawFour
    const tempWildCards: Card[] = [];
    let firstCard = this.drawPile.draw();
    
    while (firstCard.type === CardType.Wild || firstCard.type === CardType.WildDrawFour) {
      // Gem wild card midlertidigt
      tempWildCards.push(firstCard);
      firstCard = this.drawPile.draw();
    }
    
    // Put alle wild cards tilbage i discard pile (de vil blive shufflet tilbage senere hvis nødvendigt)
    for (const wildCard of tempWildCards) {
      this.discardPile.push(wildCard);
    }
    
    this.discardPile.push(firstCard);
  }

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

      // 👉 Her håndterer vi specialkort
      this.handleSpecialCard(card);
    } else {
      player.addCard(this.drawPile.draw());
      this.nextPlayer();
    }
  }
 nextTurn(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + this.direction + this.players.length) %
      this.players.length;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  reverseDirection(): void {
    this.direction *= -1;
  }
  private handleSpecialCard(card: Card): void {
    switch (card.type) {
      case CardType.Skip:
        console.log('Skip!');
        this.nextPlayer(); // spring én spiller over
        this.nextPlayer();
        break;

      case CardType.Reverse:
        if (this.players.length === 2) {
          console.log('Reverse (acts like Skip with 2 players)');
          this.nextPlayer(); // spring én spiller over
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
        this.nextPlayer(); // spring spillerens tur over
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

  private nextPlayer(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + this.direction + this.players.length) %
      this.players.length;
  }
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

private chooseRandomColor(card: WildCard): void {
  const colors: string[] = ['red', 'blue', 'green', 'yellow'];
  const chosen = colors[Math.floor(Math.random() * colors.length)]!;
  (card as any).color = chosen;
  console.log(` Wild color chosen: ${chosen}`);
}
}

/*
I denne klasse viser du brug af:

OOP state machine
narrowing (instanceof WildCard)
switch på CardType (discriminating union via enum)
modulo-arithmetik (god game logic)
polymorf matches() på card types
✔ Hvad du siger:

“Round repræsenterer en UNO-hånd. Den indeholder spillets state og metoder til at udføre reglerne.
Jeg bruger enums til card-typer og switch-statements til diskrimination over unionen af korttyper.
Polymorfien i matches() gør at Round ikke behøver kende til konkrete typer, men blot kalder metoden.”
*/

/*
WHAT TO TALK ABOUT (EXAM):

- State machine
- Game logic orchestration
- Discriminated union via CardType enum
- Narrowing with switch(card.type)
- Polymorphism via matches()
- Modulo arithmetic for turn handling

What I say:
“Round represents a single UNO hand and contains the game rules.
I use discriminated unions, narrowing, and polymorphism to handle card behavior.”
*/
