/*
bliver ikke brugt endnu
save a snapshot of the game state after each turn
to allow undo/redo functionality
*/

import { Card } from "../cards/Card";
import { UnoDeck } from "../deck/UnoDeck";
import { PlayerHand } from "../player/PlayerHand";
import { Round } from "../round/Round";

export interface Memento {
  state: any;
}

export class GameMemento implements Memento {
  constructor(public state: any) {}
}

export interface RoundMemento {
  readonly drawPile: Card[];
  readonly discardPile: Card[];
  readonly players: Readonly<{ hand: Card[] }[]>;
  readonly currentPlayerIndex: number;
  readonly direction: 1 | -1;
}


export function new_round(players: PlayerHand[], deck: UnoDeck): Round {
  return new Round(players, deck);
}

export function from_memento(memento: RoundMemento): Round {
  const deck = new UnoDeck();
  const players = memento.players.map(p => {
    const ph = new PlayerHand();
    p.hand.forEach(c => ph.addCard(c));
    return ph;
  });
  const round = new Round(players, deck);
  return round;
}

/*
- Memento pattern
- Immutability with readonly
*/
