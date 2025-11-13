import { createRouter, createWebHistory } from "vue-router";
import GameLobby from "../views/GameLobby.vue";
import GameBoard from "../views/GameBoard.vue";

//router klasser hjælper med at navigere mellem forskellige views i en SPA (Single Page Application)
//dvs hvis brugeren klikker på et link eller udfører en handling der kræver en ny side,
//routeren håndterer denne navigation uden at genindlæse hele siden
const routes = [
  { path: "/", component: GameLobby },
  { path: "/game/:id", component: GameBoard },
];

export const router = createRouter({
  history: createWebHistory(),// use browsers history
  routes,
});
