import { createRouter, createWebHistory } from "vue-router";
import GameLobby from "../views/GameLobby.vue";
import GameBoard from "../views/GameBoard.vue";


const routes = [
  { path: "/", component: GameLobby },
  { path: "/game/:id", component: GameBoard },
];

export const router = createRouter({
  history: createWebHistory(),// use browsers history
  routes,
});
