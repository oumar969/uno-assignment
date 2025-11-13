<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { onMounted, ref, watch } from "vue";
import * as api from "../model/api";   
import Card from "../components/Card.vue"; 
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";


const route = useRoute()
const gameId = route.params.id as string
const myPlayerId = localStorage.getItem("myPlayerId")
const result = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

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
const { result: liveResult } = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
  id: gameId,
});

// Opdater automatisk når serveren sender nyt game
watch(liveResult, (newVal) => {
  if (newVal?.gameUpdated) {
    result.value = newVal.gameUpdated;
  }
});
async function playCard(card: any, index: number) {
  const chosenColor =
    card.type === "Wild" || card.type === "WildDrawFour"
      ? (prompt("Vælg farve (red, blue, green, yellow):") ?? undefined)
      : undefined
  result.value = await api.playCard(gameId, myPlayerId!, index, chosenColor)
}

async function drawCard() {
  result.value = await api.drawCard(gameId, myPlayerId!)
}

</script>


<template>
  <h2>UNO Game</h2>
  <div v-if="loading">⏳ Loading game...</div>
  <div v-else-if="error">❌ Error: {{ error }}</div>

  <div v-else>
    <h3>Game ID: {{ result?.id }}</h3>

    <!-- 🎉 Vinder besked -->
    <div v-if="result?.winner">
      <h2>🎉 {{ result.winner }} vandt spillet! 🎉</h2>
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
        {{
          result.players[result.currentPlayer?.id === myPlayerId
            ? 0
            : result.currentPlayer?.name
          ] ?? "Unknown"
        }}
      </p>

      <p>
        <strong>Direction:</strong> {{ result.direction ?? "clockwise" }}
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
      <p v-else>No top card yet</p>

      <h3>Players:</h3>
      <div v-for="player in result.players" :key="player.id">
        <h3>{{ player.name }}'s Hand</h3>

        <div v-if="player.id === myPlayerId" class="hand">
          <Card
            v-for="(card, i) in player.hand"
            :key="i"
            :color="card.color"
            :type="card.type"
            :value="card.value"
            @click="playCard(card, i)"
          />
        </div>

        <div v-else>
          {{ player.hand.length }} cards
        </div>
      </div>

      <button @click="drawCard">Draw Card</button>
    </div>
  </div>
</template>


<style scoped>
.hand {
  display: flex;
  flex-wrap: wrap;
}
</style>
