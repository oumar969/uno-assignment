/*
Resolvers fungerer udelukkende som API-adaptere:
Modtager input fra klienten (queries, mutations, subscriptions)
Kalder metoder på ServerModel
Indeholder ingen spilregler eller state
*/
//
import { serverModel as server, gameEvents } from "./context";

const resolvers = {
  Query: {
    games: () => server.getGames(),

    game: (_: any, { id }: { id: string }) => {
      return server.getGame(id);
    },
  },

  Mutation: {
    createGame: () => {
      return server.createGame();
    },

    joinGame: (
      _: any,
      { gameId, name }: { gameId: string; name: string },
      context: any
    ) => {
      return server.joinGame(gameId, name, context.viewerId);
    },

    playCard: (
      _: any,
      {
        gameId,
        playerId,
        cardIndex,
        chosenColor,
      }: {
        gameId: string;
        playerId: string;
        cardIndex: number;
        chosenColor?: string;
      }
    ) => {
      return server.playCard(gameId, playerId, cardIndex, chosenColor);
    },

    drawCard: (
      _: any,
      { gameId, playerId }: { gameId: string; playerId: string }
    ) => {
      return server.drawCard(gameId, playerId);
    },
  },

  Subscription: {
    gameUpdated: {
      subscribe: async function* (_: any, { id }: { id: string }) {
        while (true) {
          const update = await new Promise<any>((resolve) => {
            const listener = (data: any) => {
              if (data.gameId === id) {
                resolve(data);
                gameEvents.off("GAME_UPDATED", listener);
              }
            };
            gameEvents.on("GAME_UPDATED", listener);
          });
          // Fallback: if payload lacks game, fetch latest from store
            const nextGame = update?.game ?? server.getGame(id);
            if (!nextGame) {
              // Skip emitting null to satisfy non-nullable schema
              continue;
            }
            yield { gameUpdated: nextGame };
          }
        }
      },
    },


  Game: {
    players: (game: any) => game.players,
    topCard: (game: any) => server.getTopCard(game),
    activeColor: (game: any) => game.round.activeColor ?? null,
    direction: (game: any) => game.direction,
    currentPlayer: (game: any) => server.getCurrentPlayer(game),
  },

  Player: {
    handCount: (player: any) => player.hand.getCards().length,

    hand: (player: any, _: any, context: any) => {
      return server.getVisibleHand(player, context?.viewerId);
    },
  },
};

export default resolvers;
