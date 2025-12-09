import { Round } from "../uno-core/round/Round";
declare const resolvers: {
    Query: {
        games: () => any[];
        game: (_: any, { id }: {
            id: string;
        }) => any;
    };
    Mutation: {
        createGame: () => {
            id: string;
            players: never[];
            round: Round;
            currentPlayerIndex: number;
            direction: number;
        };
        joinGame: (_: any, { gameId, name }: {
            gameId: string;
            name: string;
        }, context: any) => any;
        playCard: (_: any, { gameId, playerId, cardIndex, chosenColor }: any) => any;
        drawCard: (_: any, { gameId, playerId }: any) => any;
    };
    Subscription: {
        gameUpdated: {
            subscribe: import("graphql-subscriptions").IterableResolverFn<any, any, any>;
            resolve: (payload: any) => any;
        };
    };
    Game: {
        players: (game: any) => any;
        topCard: (game: any) => {
            color: "red" | "yellow" | "green" | "blue" | null;
            type: string;
            value: any;
        } | null;
        activeColor: (game: any) => any;
        direction: (game: any) => any;
        currentPlayer: (game: any) => {
            id: any;
            name: any;
        } | null;
    };
    Player: {
        handCount: (player: any) => any;
        hand: (player: any, _: any, context: any) => any;
    };
};
export default resolvers;
//# sourceMappingURL=resolvers.d.ts.map