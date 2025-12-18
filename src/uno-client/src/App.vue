<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useOngoingGamesStore } from './stores/ongoing_games_store'
import { usePlayerStore } from './stores/player_store'
import { usePendingGamesStore } from './stores/pending_games_store'
import * as api from './model/api'

const ongoingGamesStore = useOngoingGamesStore()
const pendingGamesStore = usePendingGamesStore()
const playerStore = usePlayerStore()

const isParticipant = (g: any) => g.players?.indexOf(playerStore.player ?? '') > -1

const my_ongoing_games = computed(() => 
  ongoingGamesStore.games.filter(g => isParticipant(g))
)
const my_pending_games = computed(() => 
  pendingGamesStore.games.filter(isParticipant)
)
const other_pending_games = computed(() => 
  pendingGamesStore.games.filter(g => !isParticipant(g))
)

onMounted(async () => {
  // Hent alle games fra server
  const games = await api.games()
  games?.forEach((g: any) => ongoingGamesStore.upsert(g))

  const pending_games = await api.pending_games()
  if (Array.isArray(pending_games)) {
    pending_games.forEach((g: any) => pendingGamesStore.upsert(g))
  }

  // Setup WebSocket for real-time updates (optional)
  try {
    const ws = new WebSocket('ws://localhost:4000/graphql')
    ws.onopen = () => {
      console.log('WebSocket connected for game updates')
    }
    ws.onmessage = ({ data: gameJSON }) => {
      try {
        const game = JSON.parse(gameJSON)
        if (game.pending) {
          pendingGamesStore.upsert(game)
        } else {
          ongoingGamesStore.upsert(game)
          pendingGamesStore.remove(game)
        }
      } catch (e) {
        console.error('Failed to parse WebSocket message', e)
      }
    }
    onUnmounted(() => {
      ws.close()
    })
  } catch (e) {
    console.warn('WebSocket connection failed (optional)', e)
  }
})
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1>🎮 UNO Game</h1>
      <h2 v-if="playerStore.player" class="subheader">Welcome, {{ playerStore.player }}!</h2>
    </header>

    <div class="content">
      <nav v-if="playerStore.player" class="sidebar">
        <div class="nav-section">
          <RouterLink class="link" to="/">🏠 Lobby</RouterLink>
        </div>

        <div class="nav-section" v-if="my_ongoing_games.length > 0">
          <h3>My Ongoing Games</h3>
          <RouterLink 
            v-for="game in my_ongoing_games" 
            :key="game.id"
            class="link" 
            :to="`/game/${game.id}`"
          >
            Game #{{ game.id }}
          </RouterLink>
        </div>

        <div class="nav-section" v-if="my_pending_games.length > 0">
          <h3>Waiting for Players</h3>
          <RouterLink 
            v-for="game in my_pending_games" 
            :key="game.id"
            class="link" 
            :to="`/pending/${game.id}`"
          >
            Game #{{ game.id }}
          </RouterLink>
        </div>

        <div class="nav-section" v-if="other_pending_games.length > 0">
          <h3>Available Games</h3>
          <RouterLink 
            v-for="game in other_pending_games" 
            :key="game.id"
            class="link" 
            :to="`/pending/${game.id}`"
          >
            Game #{{ game.id }}
          </RouterLink>
        </div>
      </nav>

      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.header {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1.5rem;
  text-align: center;
  border-bottom: 3px solid #ffd700;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
}

.subheader {
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  color: #ffd700;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 1.5rem;
  overflow-y: auto;
  border-right: 2px solid #ffd700;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section h3 {
  color: #ffd700;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.link {
  display: block;
  color: #e0e0e0;
  text-decoration: none;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.link:hover {
  background-color: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  border-left-color: #ffd700;
  transform: translateX(5px);
}

.link.router-link-active {
  background-color: rgba(255, 215, 0, 0.3);
  color: #ffd700;
  border-left-color: #ffd700;
  font-weight: bold;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.95);
}
</style>
