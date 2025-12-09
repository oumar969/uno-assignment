<script setup lang="ts">
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter } from "vue-router";

const router = useRouter();

/* -----------------------------
   GRAPHQL QUERIES & MUTATIONS
------------------------------*/
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

/* -----------------------------
        APOLLO CLIENT
------------------------------*/
const { result, loading, error, refetch } = useQuery(GET_GAMES, null, {
  fetchPolicy: "no-cache",
});

const { mutate: createGame } = useMutation(CREATE_GAME);
const { mutate: joinGame } = useMutation(JOIN_GAME);

/* -----------------------------
       UI STATE (MVVM)
------------------------------*/
const showNameModal = ref(false);     // styrer modal
const playerName = ref("");          // v-model
const pendingGameId = ref<string | null>(null);
const isCreating = ref(false);       // om vi laver nyt spil

/* -----------------------------
        HANDLER FUNCTIONS
------------------------------*/

// Åben modal for CREATE GAME
function handleCreateGame() {
  isCreating.value = true;
  pendingGameId.value = null;
  showNameModal.value = true;
}

// Åben modal for JOIN GAME
function handleJoinGame(gameId: string) {
  isCreating.value = false;
  pendingGameId.value = gameId;
  showNameModal.value = true;
}

// Bekræft navn og udfør mutation
async function confirmName() {
  if (!playerName.value) return;

  const name = playerName.value;

  // Hvis spilleren opretter nyt spil
  if (isCreating.value) {
    const res = await createGame();
    const gameId = res?.data?.createGame?.id;

    if (!gameId) return;

    const joinRes = await joinGame({ gameId, name });

    const myPlayer = joinRes?.data?.joinGame?.players?.find(
      (p: any) => p.name === name
    );

    if (myPlayer) {
      localStorage.setItem("myPlayerId", myPlayer.id);
    }

    router.push(`/game/${gameId}`);
  }

  // Hvis spilleren joiner eksisterende spil
  else {
    const gameId = pendingGameId.value!;

    const joinRes = await joinGame({ gameId, name });

    const myPlayer = joinRes?.data?.joinGame.players.find(
      (p: any) => p.name === name
    );

    if (myPlayer) {
      localStorage.setItem("myPlayerId", myPlayer.id);
      router.push(`/game/${gameId}`);

      // Reload så Apollo fanger headers
      setTimeout(() => window.location.reload(), 500);
    }
  }

  // Nulstil modalens state
  playerName.value = "";
  showNameModal.value = false;

  await refetch();
}
</script>

<template>
  <div>
    <h2>UNO Lobby</h2>

    <button @click="handleCreateGame">Create Game</button>

    <div v-if="loading">Loading games...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>

    <ul v-else>
      <li v-for="game in result?.games" :key="game.id">
        Game {{ game.id }} ({{ game.players.length }} players)
        <button @click="handleJoinGame(game.id)">Join</button>
      </li>
    </ul>

    <!-- -------------------------
          MODAL WITH SLOTS + V-MODEL
        ------------------------------>
    <Modal v-if="showNameModal" @close="showNameModal = false">
      
      <!-- Header Slot -->
      <template #header>
        <h3>Enter your name</h3>
      </template>

      <!-- Default Slot (body) -->
      <input
        v-model="playerName"
        placeholder="Your name"
        class="name-input"
      />

      <!-- Footer Slot -->
      <template #footer>
        <button @click="confirmName">OK</button>
        <button @click="showNameModal = false">Cancel</button>
      </template>

    </Modal>
  </div>
</template>

<style scoped>
.name-input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #444;
  margin-bottom: 10px;
}
</style>
