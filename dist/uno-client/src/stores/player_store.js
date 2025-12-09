import { defineStore } from 'pinia';
import { ref } from 'vue';
export const usePlayerStore = defineStore('player', () => {
    const player = ref(undefined);
    return { player };
});
//👉 Brug denne store i stedet for localStorage direkte i komponenter.
//# sourceMappingURL=player_store.js.map