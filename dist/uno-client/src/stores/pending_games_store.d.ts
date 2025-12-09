import type { UnoGameSpecs } from '@/model/game';
export declare const usePendingGamesStore: import("pinia").StoreDefinition<"pendingGames", Pick<{
    games: import("vue").ComputedRef<any>;
    game: (id: string) => UnoGameSpecs | undefined;
    update: (partial: Partial<UnoGameSpecs>) => void;
    upsert: (newGame: UnoGameSpecs) => void;
    remove: (toRemove: {
        id: string;
    }) => void;
}, never>, Pick<{
    games: import("vue").ComputedRef<any>;
    game: (id: string) => UnoGameSpecs | undefined;
    update: (partial: Partial<UnoGameSpecs>) => void;
    upsert: (newGame: UnoGameSpecs) => void;
    remove: (toRemove: {
        id: string;
    }) => void;
}, "games">, Pick<{
    games: import("vue").ComputedRef<any>;
    game: (id: string) => UnoGameSpecs | undefined;
    update: (partial: Partial<UnoGameSpecs>) => void;
    upsert: (newGame: UnoGameSpecs) => void;
    remove: (toRemove: {
        id: string;
    }) => void;
}, "game" | "update" | "upsert" | "remove">>;
//# sourceMappingURL=pending_games_store.d.ts.map