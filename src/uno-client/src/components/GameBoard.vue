<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { onMounted } from "vue";
import gql from "graphql-tag";
import Card from "./Card.vue";

const route = useRoute();
const gameId = route.params.id as string;
const myPlayerId = localStorage.getItem("myPlayerId");

// ✅ Queries
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

// ✅ Mutations
const PLAY_CARD = gql`
  mutation PlayCard(
    $gameId: ID!,
    $playerId: ID!,
    $cardIndex: Int!,
    $chosenColor: String
  ) {
    playCard(
      gameId: $gameId,
      playerId: $playerId,
      cardIndex: $cardIndex,
      chosenColor: $chosenColor
    ) {
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

const DRAW_CARD = gql`
  mutation DrawCard($gameId: ID!, $playerId: ID!) {
    drawCard(gameId: $gameId, playerId: $playerId) {
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

// ✅ useQuery og mutation hooks
const { result, loading, error, refetch } = useQuery(
  GET_GAME,
  { id: gameId },
  { fetchPolicy: "no-cache" }
);

const { mutate: playCardMutation } = useMutation(PLAY_CARD);
const { mutate: drawCardMutation } = useMutation(DRAW_CARD);

// 🟢 Refetch ved mount
onMounted(() => {
  refetch();
});

// 👉 Når man klikker på et kort
function playCard(card: { color: string; type: string; value?: number }, index: number) {
  if (!myPlayerId) return;

  let chosenColor: string | null = null;
  const isWild = card.type === "Wild" || card.type === "WildDrawFour";

  if (isWild) {
    chosenColor = prompt("Vælg farve (red, blue, green, yellow):")?.toLowerCase() || null;
    if (!["red", "blue", "green", "yellow"].includes(chosenColor || "")) {
      alert("Ugyldig farve!");
      return;
    }
  }

  playCardMutation({
    gameId,
    playerId: myPlayerId,
    cardIndex: index,
    chosenColor,
  })
    .then(() => refetch())
    .catch((err) => alert(err.message));
} // 👈 Manglede denne lukning!

// 👉 Træk et kort
function drawCard() {
  if (!myPlayerId) return;

  drawCardMutation({
    gameId,
    playerId: myPlayerId,
  }).then(() => {
    refetch();
  });
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

        <!-- Kun egne kort -->
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
