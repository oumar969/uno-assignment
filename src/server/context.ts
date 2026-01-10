import { EventEmitter } from "events";
import { MemoryGameStore } from "./MemoryGameStore";
import { ServerModel } from "./ServerModel";

export const gameEvents = new EventEmitter();
export const gameStore = new MemoryGameStore();
export const serverModel = new ServerModel(gameStore, gameEvents);

/*
eventEmitter is used to emit events to clients
eventEmitter is an event bus. The server can “broadcast” messages like: GAME_UPDATED
GameStore handles persistence of game state
ServerModel handles all game logic and rules

GameStore

EventEmitter

ServerModel : This is your main business logic (application logic).
gameStore to save/load games
gameEvents to notify subscribers when something changes
Dette undgår cirkulære imports og gør arkitekturen mere robust.
*/