import { Card } from "../cards/Card";
import { UnoDeck } from "../deck/UnoDeck";
import { PlayerHand } from "../player/PlayerHand";
import { Round } from "../round/Round";
export interface Memento {
    state: any;
}
export declare class GameMemento implements Memento {
    state: any;
    constructor(state: any);
}
export interface RoundMemento {
    readonly drawPile: Card[];
    readonly discardPile: Card[];
    readonly players: Readonly<{
        hand: Card[];
    }[]>;
    readonly currentPlayerIndex: number;
    readonly direction: 1 | -1;
}
export declare function new_round(players: PlayerHand[], deck: UnoDeck): Round;
export declare function from_memento(memento: RoundMemento): Round;
//# sourceMappingURL=Memento.d.ts.map