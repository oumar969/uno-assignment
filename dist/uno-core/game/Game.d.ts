import { GameMemento } from "../mementos/Memento";
import { Round } from "../round/Round";
export interface Game {
    rounds: Round[];
    currentRound(): Round;
    isFinished(): boolean;
    to_memento(): GameMemento;
    clone(): Game;
}
//# sourceMappingURL=Game.d.ts.map