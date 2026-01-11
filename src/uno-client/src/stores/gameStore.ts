/*
Composition setup vs Options API(getters, actions, state)
Central store for game state and actions
State (reactive refs):
- game: the current game data
- myPlayerId: stored playerid

Actions (functions that update state / call backend):
- loadGame(id): fetch game data from server and set game ref
- joinGame(gameId, name): 
*/

import { defineStore } from "pinia";
import { ref } from "vue";
import { GameService } from "../model/GameService(ZOD)";

export const useGameStore = defineStore("game", () => {
  const service = new GameService(); 
  const game = ref<any>(null);
  const myPlayerId = ref<string | null>(localStorage.getItem("myPlayerId"));

  async function loadGame(id: string) {
    game.value = await service.fetchGame(id);
  }

  async function joinGame(gameId: string, name: string) {
    return await service.joinGame(gameId, name);
  }

  return {
    service,
    game,
    myPlayerId,
    loadGame,
    joinGame,
  };
});
