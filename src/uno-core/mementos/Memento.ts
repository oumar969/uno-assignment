/*
bliver ikke brugt endnu
*/

import { Card } from "../cards/Card";
import { UnoDeck } from "../deck/UnoDeck";
import { PlayerHand } from "../player/PlayerHand";
import { Round } from "../round/Round";

export interface Memento {
  state: any;
}
//💡 Et simpelt objekt der kan gemme hele spillets tilstand.
//at gemme/loade via GraphQL (Assignment 3),
//eller eksportere state til Vue-appen.
export class GameMemento implements Memento {
  constructor(public state: any) {}
}
//round memento at gemme spillets tilstand i et JSON-venligt format:
export interface RoundMemento {
  readonly drawPile: Card[];
  readonly discardPile: Card[];
  readonly players: Readonly<{ hand: Card[] }[]>;
  readonly currentPlayerIndex: number;
  readonly direction: 1 | -1;
}

// fabriksfunktioner til oprettelse af nye runder og gendannelse fra mementos:
//fabrikker (factory functions)
export function new_round(players: PlayerHand[], deck: UnoDeck): Round {
  return new Round(players, deck);
}
// gendannelse fra memento
//Genskaber en Round fra gemt data
export function from_memento(memento: RoundMemento): Round {
  const deck = new UnoDeck();
  const players = memento.players.map(p => {
    const ph = new PlayerHand();
    p.hand.forEach(c => ph.addCard(c));
    return ph;
  });
  const round = new Round(players, deck);
  // restore discardPile, index, direction osv.
  return round;
}

/*
JSON-venlig state

DTO pattern (Data Transfer Object)

✔ Hvad du siger:

“Mementos bruges til at gemme og genskabe state.
Jeg modellerer dem som readonly JSON-venlige objekter uden metoder.
Dette matcher kravene for GraphQL transmissible state.”
*/

/*
WHAT TO TALK ABOUT (EXAM):

- Memento pattern
- DTO (Data Transfer Object)
- JSON-serializable state
- Immutability with readonly
- Server–client communication (GraphQL)

What I say:
“Mementos store immutable snapshots of game state
that can be saved, sent over HTTP, or restored.”
*/
