import { GameMemento } from "../mementos/Memento";
import { Round } from "../round/Round";
//flere runder (et helt UNO-spil, ikke bare én hånd),
//pointsamling og vinderlogik,
//“save/load entire game” (når du når til server-delen).
export interface Game {
  rounds: Round[];
  currentRound(): Round;
  isFinished(): boolean;
  to_memento(): GameMemento;
  clone(): Game;
}
