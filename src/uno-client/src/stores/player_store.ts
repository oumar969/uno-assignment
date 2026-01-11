import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const player = ref<string | undefined>(undefined)
  return { player }
})
