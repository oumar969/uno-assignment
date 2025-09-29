<script setup lang="ts">
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter } from "vue-router";

const router = useRouter();

// Queries & mutations
const GET_GAMES = gql`
  query {
    games {
      id
      players {
        id
        name
      }
    }
  }
`;

const CREATE_GAME = gql`
  mutation {
    createGame {
      id
    }
  }
`;

const JOIN_GAME = gql`
  mutation JoinGame($gameId: ID!, $name: String!) {
    joinGame(gameId: $gameId, name: $name) {
      id
      players {
        id
        name
      }
    }
  }
`;

// Apollo hooks
const { result, loading, error } = useQuery(GET_GAMES);
const { mutate: createGame } = useMutation(CREATE_GAME);
const { mutate: joinGame } = useMutation(JOIN_GAME);

// Handlers
async function handleCreateGame() {
  const res = await createGame();
  if (res?.data?.createGame) {
    router.push(`/game/${res.data.createGame.id}`);
  }
}

async function handleJoinGame(gameId: string) {
  const name = prompt("Enter your name:");
  if (!name) return;

  const res = await joinGame({ gameId, name });
  if (res?.data?.joinGame) {
    // find den spiller vi selv er
    const myPlayer = res.data.joinGame.players.find((p: any) => p.name === name);

    if (myPlayer) {
      localStorage.setItem("myPlayerId", myPlayer.id);
    }

    router.push(`/game/${res.data.joinGame.id}`);
  }
}
</script>

<template>
  <div>
    <h2>🎮 UNO Lobby</h2>

    <button @click="handleCreateGame">➕ Create Game</button>

    <div v-if="loading">⏳ Loading games...</div>
    <div v-else-if="error">❌ Error: {{ error.message }}</div>

    <ul v-else>
      <li v-for="game in result?.games" :key="game.id">
        Game {{ game.id }} ({{ game.players.length }} players)
        <button @click="handleJoinGame(game.id)">Join</button>
      </li>
    </ul>
  </div>
</template>
