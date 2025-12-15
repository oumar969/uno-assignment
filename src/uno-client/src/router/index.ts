import { createRouter, createWebHistory } from "vue-router";
import GameLobby from "../views/GameLobby.vue";
import GameBoard from "../views/GameBoard.vue";
import Login from "@/views/Login.vue";
import Pending from "@/views/Pending.vue";

//router klasser hjælper med at navigere mellem forskellige views i en SPA (Single Page Application)
//dvs hvis brugeren klikker på et link eller udfører en handling der kræver en ny side,
//routeren håndterer denne navigation uden at genindlæse hele siden
const routes = [
  { path: "/", component: GameLobby },
  { path: "/game/:id", component: GameBoard },
  { path: "/pending/:id", component: Pending },
  { path: "/login", component: Login },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),// bruger browserens historie API til at håndtere navigation
  routes,
});

export default router;