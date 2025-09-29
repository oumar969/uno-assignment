<script setup lang="ts">
import { useRoute } from "vue-router";// to access route params
import { useQuery } from "@vue/apollo-composable"; // for GraphQL queries
import gql from "graphql-tag";
import Card from "./Card.vue";

const route = useRoute();
const gameId = route.params.id as string;
const myPlayerId = localStorage.getItem("myPlayerId");

// GraphQL query
const GET_GAME = gql`
  query ($id: ID!) {
    game(id: $id) {
      id
      topCard {
        color
        type
        value
      }
      players {
        id
        name
        hand {
          color
          type
          value
        }
      }
    }
  }
`;

const { result, loading, error } = useQuery(GET_GAME, { id: gameId });

function playCard(card: { color: string; type: string; value?: number }) {
  alert(`You played: ${card.color} ${card.type}`);
}

function drawCard() {
  alert("You drew a card");
}
</script>

<template>
  <div>
    <h2>UNO Game</h2>

    <div v-if="loading">⏳ Loading game...</div>
    <div v-else-if="error">❌ Error: {{ error.message }}</div>
    <div v-else>
      <h3>Game ID: {{ result.game.id }}</h3>

      <p v-if="result?.game?.topCard">
        <strong>Top Card:</strong>
        <Card
          :color="result.game.topCard.color"
          :type="result.game.topCard.type"
          :value="result.game.topCard.value"
        />
      </p>
      <p v-else>No top card yet</p>

      <h3>Players:</h3>
      <div v-for="player in result.game.players" :key="player.id">
        <h3>{{ player.name }}'s Hand</h3>

        <!-- Kun vis egne kort -->
        <div v-if="player.id === myPlayerId" class="hand">
          <Card
            v-for="(card, i) in player.hand"
            :key="i"
            :color="card.color"
            :type="card.type"
            :value="card.value"
            @click="playCard(card)"
          />
        </div>

        <!-- Andre spillere: vis kun antal -->
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
