import type { UnoGame } from '@/model/game';
export declare const useOngoingGamesStore: import("pinia").StoreDefinition<"ongoingGames", Pick<{
    games: import("vue").ComputedRef<any>;
    game: (id: string) => UnoGame | undefined;
    update: (updated: UnoGame) => void;
    upsert: (newGame: UnoGame) => void;
}, never>, Pick<{
    games: import("vue").ComputedRef<any>;
    game: (id: string) => UnoGame | undefined;
    update: (updated: UnoGame) => void;
    upsert: (newGame: UnoGame) => void;
}, "games">, Pick<{
    games: import("vue").ComputedRef<any>;
    game: (id: string) => UnoGame | undefined;
    update: (updated: UnoGame) => void;
    upsert: (newGame: UnoGame) => void;
}, "game" | "update" | "upsert">>;
//# sourceMappingURL=ongoing_games_store.d.ts.map