import { createRouter, createWebHistory } from "vue-router";
import GameLobby from "../views/GameLobby.vue";
import GameBoard from "../views/GameBoard.vue";
import Login from "@/views/Login.vue";
import Pending from "@/views/Pending.vue";
//dynamic routing
// (Single Page Application)
// definde routes for the application and map them to components
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