import { computed, reactive, type Reactive } from 'vue'
import { defineStore } from 'pinia'
import type { UnoGame } from '@/model/game' // din UNO-game type fra model

export const useOngoingGamesStore = defineStore('ongoingGames', () => {
  // Her gemmes alle aktive spil
  const gameList = reactive<UnoGame[]>([])

  // Returnér alle spil (read-only computed property)
  const games = computed((): Reactive<Readonly<UnoGame[]>> => gameList)

  // Find et enkelt spil ud fra id
  const game = (id: string): UnoGame | undefined => 
    gameList.find(g => g.id === id)

  // Opdater et eksisterende spil
  const update = (updated: UnoGame) => {
    const index = gameList.findIndex(g => g.id === updated.id)
    if (index > -1) {
      gameList[index] = updated
    }
  }

  // Indsæt nyt spil eller opdater eksisterende
  const upsert = (newGame: UnoGame) => {
    const index = gameList.findIndex(g => g.id === newGame.id)
    if (index > -1) {
      gameList[index] = newGame
    } else {
      gameList.push(newGame)
    }
  }

  return { games, game, update, upsert }
})
