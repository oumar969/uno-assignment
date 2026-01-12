import { EventEmitter } from "events";
import { MemoryGameStore } from "./MemoryGameStore";
import { ServerModel } from "./ServerModel";

export const gameEvents = new EventEmitter(); //event bus for game updates
export const gameStore = new MemoryGameStore();//a set of functions for saving and loading games
export const serverModel = new ServerModel(gameStore, gameEvents);//business logic (rules) of the game

/*
eventEmitter is an event bus. The server can “broadcast” messages from GAME_UPDATED
eventEmitter sends messages when the game changes (like “GAME_UPDATED”) so clients can update live.
*/