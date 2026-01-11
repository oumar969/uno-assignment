import { EventEmitter } from "events";
import { MemoryGameStore } from "./MemoryGameStore";
import { ServerModel } from "./ServerModel";

export const gameEvents = new EventEmitter();
export const gameStore = new MemoryGameStore();//a set of functions for saving and loading games
export const serverModel = new ServerModel(gameStore, gameEvents);//business logic

/*
emit events to clients
eventEmitter is an event bus. The server can “broadcast” messages like: GAME_UPDATED
eventEmitter sends messages when the game changes (like “GAME_UPDATED”) so clients can update live.
ServerModel : the main game logic. It checks rules, changes the game, saves it, and sends update events
gameStore to save/load games
gameEvents to notify subscribers when something changes
*/