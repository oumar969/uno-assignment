/*
gameStore.ts
Central store for game state and actions
bruges til at håndtere spillets tilstand og interaktioner
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
