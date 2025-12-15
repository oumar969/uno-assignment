<script setup lang="ts">
import { usePendingGamesStore } from '@/stores/pending_games_store'
import { usePlayerStore } from '@/stores/player_store'
import { useOngoingGamesStore } from '@/stores/ongoing_games_store'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as api from '../model/api'
import type { UnoGameSpecs } from '@/model/game'

const route = useRoute()
const router = useRouter()

const pendingGamesStore = usePendingGamesStore()
const ongoingGamesStore = useOngoingGamesStore()
const playerStore = usePlayerStore()

const id = ref(route.params.id.toString())
const game = computed(() => pendingGamesStore.game(id.value))
const canJoin = computed(() => 
  game.value && playerStore.player 
  && game.value.players.indexOf(playerStore.player) === -1
)

watch(() => route.params.id, (newId) => id.value = newId.toString())
watch(() => pendingGamesStore.game(id.value), g => {
  if (!g) {
    if (ongoingGamesStore.game(id.value))
      router.replace(`/game/${id.value}`)
    else
      router.replace('/')
  }
})

const join = () => {
  if (game.value && playerStore.player && canJoin.value) {
    api.join(game.value, playerStore.player)
  }
}

if (playerStore.player === undefined)
  router.push(`/login?pending=${id.value}`)
else if (game.value === undefined) {
  if (ongoingGamesStore.game(id.value))
    router.replace('/game/' + id.value)
  else
    router.replace('/')
}
</script>

<template>
  <div class="pending-container">
    <h1>Game #{{ id }}</h1>
    <div class="game-info">
      <div><strong>Creator:</strong> {{ game?.creator || 'Unknown' }}</div>
      <div><strong>Players:</strong> {{ game?.players.join(', ') || 'None yet' }}</div>
      <div><strong>Available Seats:</strong> {{ (game?.number_of_players ?? 2) - (game?.players.length ?? 0) }}</div>
    </div>
    <button v-if="canJoin" @click="join" class="join-button">Join Game</button>
    <p v-if="!canJoin && game" class="already-joined">You are already in this game</p>
  </div>
</template>

<style scoped>
.pending-container {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 1.5rem;
}

.game-info {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

.game-info div {
  font-size: 1rem;
  color: #555;
}

.join-button {
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.join-button:hover {
  background-color: #0056b3;
}

.already-joined {
  color: #666;
  font-style: italic;
}
</style>