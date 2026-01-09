<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import * as api from "../model/api";   
import Card from "../components/Card.vue";
import PlayerHand from "../components/PlayerHand.vue";
import Modal from "../components/Modal.vue";
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";


const route = useRoute()
const gameId = route.params.id as string
const myPlayerId = localStorage.getItem("myPlayerId")
const result = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showColorPicker = ref(false)
const pendingCardIndex = ref<number | null>(null)

const GAME_UPDATED_SUBSCRIPTION = gql`
  subscription OnGameUpdated($id: ID!) {
    gameUpdated(id: $id) {
      id
      winner
      activeColor
      direction
      currentPlayer { id name }
      topCard { color type value }
      players {
        id
        name
        handCount
        hand { color type value back }
      }
    }
  }
`;

onMounted(async () => {
  try {
    result.value = await api.game(gameId)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const { result: liveResult, error: subError, loading: subLoading } = useSubscription(
  GAME_UPDATED_SUBSCRIPTION, 
  { id: gameId },
  {
    fetchPolicy: "no-cache"  //  Bypass Apollo cache for subscriptions
  }
);

// Debug subscription - ignorer HTTP fejl da WebSocket virker
watch(subError, (err) => {
  if (err && !err.message.includes('asyncIterator')) {
    console.error(" Subscription error:", err);
  }
});

// Opdater automatisk når serveren sender nyt game
watch(liveResult, (newVal, oldVal) => {
  if (newVal?.gameUpdated) {
    result.value = newVal.gameUpdated;
  }
});

function handlePlayCard(player: any, index: number) {
  return () => {
    const card = player.hand[index]
    playCard(card, index)
  }
}

async function playCard(card: any, index: number) {
  if (card.type === "Wild" || card.type === "WildDrawFour") {
    pendingCardIndex.value = index
    showColorPicker.value = true
  } else {
    result.value = await api.playCard(gameId, myPlayerId!, index, undefined)
  }
}

async function selectColor(color: string) {
  if (pendingCardIndex.value !== null) {
    result.value = await api.playCard(gameId, myPlayerId!, pendingCardIndex.value, color)
  }
  showColorPicker.value = false
  pendingCardIndex.value = null
}

async function drawCard() {
  result.value = await api.drawCard(gameId, myPlayerId!)
}

</script>


<template>
  <h2>UNO Game</h2>
  <div v-if="loading"> Loading game...</div>
  <div v-else-if="error"> Error: {{ error }}</div>

  <div v-else>
    <h3>Game ID: {{ result?.id }}</h3>

    <!--  Vinder besked -->
    <div v-if="result?.winner">
      <h2> {{ result.winner }} vandt spillet! </h2>
      <button @click="$router.push('/')">Tilbage til lobby</button>
    </div>

    <!-- 🔹 Spillerliste -->
    <div v-if="result?.players?.length">
      <p>
        <strong>Players ({{ result.players.length }}):</strong>
        <span v-for="player in result.players" :key="player.id">
          {{ player.name }}<span v-if="player.id === myPlayerId"> (You)</span>,
        </span>
      </p>

      <p>
        <strong>Current Turn:</strong>
        {{ result.currentPlayer?.name ?? "Unknown" }}
      </p>
    </div>

    <!-- 🔹 Spillet -->
    <div v-if="!result?.winner">
      <p v-if="result?.topCard">
        <strong>Top Card:</strong>
        <Card
          :color="result.topCard.color"
          :type="result.topCard.type"
          :value="result.topCard.value"
        />
      </p>

      <p v-if="result?.activeColor">
        <strong>Active color:</strong> {{ result.activeColor }}
      </p>

      <h3>Players:</h3>
      <div v-for="player in result.players" :key="player.id">
        <h3>{{ player.name }}'s Hand</h3>

        <!-- en komponent til spillerens hånd -->
        <PlayerHand
          v-if="player.id === myPlayerId"
          :hand="player.hand"
          @play-card="(i) => playCard(player.hand[i], i)"
        />

        <div v-else>
          {{ player.handCount }} cards
        </div>
      </div>

      <button @click="drawCard">Draw Card</button>
    </div>

    <!-- Color Picker Modal -->
    <Modal v-if="showColorPicker" @close="showColorPicker = false">
      <template #header>
        <h3>Vælg farve:</h3>
      </template>
      <div class="color-buttons">
        <button class="color-btn red" @click="selectColor('red')">Red</button>
        <button class="color-btn blue" @click="selectColor('blue')">Blue</button>
        <button class="color-btn green" @click="selectColor('green')">Green</button>
        <button class="color-btn yellow" @click="selectColor('yellow')">Yellow</button>
      </div>
    </Modal>
  </div>
</template>


<style scoped>
.color-buttons {
  display: flex;
  gap: 1rem;
}

.color-btn {
  width: 80px;
  height: 80px;
  border: 3px solid #333;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn.red { background: #e74c3c; }
.color-btn.blue { background: #3498db; }
.color-btn.green { background: #2ecc71; }
.color-btn.yellow { background: #f39c12; }
</style>
