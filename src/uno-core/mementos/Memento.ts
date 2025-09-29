export interface Memento {
  state: any;
}

export class GameMemento implements Memento {
  constructor(public state: any) {}
}
