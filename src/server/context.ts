import { EventEmitter } from "events";
import { MemoryGameStore } from "./MemoryGameStore";
import { ServerModel } from "./ServerModel";

export const gameEvents = new EventEmitter();
export const gameStore = new MemoryGameStore();
export const serverModel = new ServerModel(gameStore, gameEvents);

/*
Alle centrale afhængigheder oprettes ét sted:

GameStore

EventEmitter

ServerModel

Dette undgår cirkulære imports og gør arkitekturen mere robust.
*/