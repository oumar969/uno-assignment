export interface UnoCard {
    color: string | null;
    type: string;
    value?: number | null;
}
export interface UnoPlayer {
    id: string;
    name: string;
    hand: UnoCard[];
}
export interface UnoGame {
    id: string;
    topCard: UnoCard;
    players: UnoPlayer[];
}
export interface UnoGameSpecs {
    id: string;
    players: string[];
    creator?: string;
    number_of_players?: number;
}
//# sourceMappingURL=game.d.ts.map