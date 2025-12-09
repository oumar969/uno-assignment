import { createRouter, createWebHistory } from "vue-router";
import GameLobby from "../views/GameLobby.vue";
import GameBoard from "../views/GameBoard.vue";
import Login from "@/views/Login.vue";
//router klasser hjælper med at navigere mellem forskellige views i en SPA (Single Page Application)
//dvs hvis brugeren klikker på et link eller udfører en handling der kræver en ny side,
//routeren håndterer denne navigation uden at genindlæse hele siden
const routes = [
    { path: "/", component: GameLobby },
    { path: "/game/:id", component: GameBoard },
];
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // bruger browserens historie API til at håndtere navigation
    routes,
});
// Login route tilføjet
router.addRoute({ path: "/login", component: Login });
// Dette gør det muligt at navigere til login siden ved at bruge routeren
export default router;
//# sourceMappingURL=index.js.map