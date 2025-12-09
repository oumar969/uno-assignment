import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
export const useOngoingGamesStore = defineStore('ongoingGames', () => {
    // Her gemmes alle aktive spil
    const gameList = reactive([]);
    // Returnér alle spil (read-only computed property)
    const games = computed(() => gameList);
    // Find et enkelt spil ud fra id
    const game = (id) => gameList.find(g => g.id === id);
    // Opdater et eksisterende spil
    const update = (updated) => {
        const index = gameList.findIndex(g => g.id === updated.id);
        if (index > -1) {
            gameList[index] = updated;
        }
    };
    // Indsæt nyt spil eller opdater eksisterende
    const upsert = (newGame) => {
        const index = gameList.findIndex(g => g.id === newGame.id);
        if (index > -1) {
            gameList[index] = newGame;
        }
        else {
            gameList.push(newGame);
        }
    };
    return { games, game, update, upsert };
});
//# sourceMappingURL=ongoing_games_store.js.map