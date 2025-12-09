import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
export const usePendingGamesStore = defineStore('pendingGames', () => {
    const gameList = reactive([]);
    // Reactive liste over alle pending spil
    const games = computed(() => gameList);
    // Find et spil ud fra id
    const game = (id) => gameList.find(g => g.id === id);
    // Opdater et spil
    const update = (partial) => {
        const index = gameList.findIndex(g => g.id === partial.id);
        if (index > -1) {
            gameList[index] = { ...gameList[index], ...partial };
        }
    };
    // Tilføj eller opdater
    const upsert = (newGame) => {
        const index = gameList.findIndex(g => g.id === newGame.id);
        if (index > -1) {
            gameList[index] = newGame;
        }
        else {
            gameList.push(newGame);
        }
    };
    // Fjern et spil (fx når det bliver aktivt)
    const remove = (toRemove) => {
        const index = gameList.findIndex(g => g.id === toRemove.id);
        if (index > -1) {
            gameList.splice(index, 1);
        }
    };
    return { games, game, update, upsert, remove };
});
//Denne holder spil, der er oprettet men ikke startet — altså lobbyer, hvor man kan “join’e”.
//# sourceMappingURL=pending_games_store.js.map