/*
pending_games_store.ts 
Store for pending UNO games (lobbies)
bruges til at holde styr på spil, der er oprettet men ikke startet
*/
import { computed, reactive, type Reactive } from 'vue'
import { defineStore } from 'pinia'
import type { UnoGameSpecs } from '@/model/game' // UNO pending game type

export const usePendingGamesStore = defineStore('pendingGames', () => {
  const gameList = reactive<UnoGameSpecs[]>([])

  // Reactive liste over alle pending spil
  const games = computed((): Reactive<Readonly<UnoGameSpecs[]>> => gameList)

  // Find et spil ud fra id
  const game = (id: string): UnoGameSpecs | undefined => 
    gameList.find(g => g.id === id)

  // Opdater et spil
  const update = (partial: Partial<UnoGameSpecs>) => {
    const index = gameList.findIndex(g => g.id === partial.id)
    if (index > -1) {
      gameList[index] = { ...gameList[index], ...partial }
    }
  }

  // Tilføj eller opdater
  const upsert = (newGame: UnoGameSpecs) => {
    const index = gameList.findIndex(g => g.id === newGame.id)
    if (index > -1) {
      gameList[index] = newGame
    } else {
      gameList.push(newGame)
    }
  }

  // Fjern et spil (fx når det bliver aktivt)
  const remove = (toRemove: { id: string }) => {
    const index = gameList.findIndex(g => g.id === toRemove.id)
    if (index > -1) {
      gameList.splice(index, 1)
    }
  }

  return { games, game, update, upsert, remove }
})
//Denne holder spil, der er oprettet men ikke startet — altså lobbyer, hvor man kan “join’e”.