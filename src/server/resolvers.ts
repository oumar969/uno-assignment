import { v4 as uuidv4 } from "uuid";
import { UnoDeck } from "../uno-core/deck/UnoDeck";
import { PlayerHand } from "../uno-core/player/PlayerHand";
import { Round } from "../uno-core/round/Round";
import { CardType } from "../uno-core/types/CardType";
import { Card } from "../uno-core/cards/Card";

const games: any[] = [];

const resolvers = {
  Query: {
    games: () => games,
    game: (_: any, { id }: { id: string }) => games.find((g) => g.id === id),
  },

  Mutation: {
    createGame: () => {
      const id = uuidv4();
      const deck = new UnoDeck();
      const round = new Round([], deck);

      const game = { id, players: [], round };
      games.push(game);

      return game;
    },

    joinGame: (_: any, { gameId, name }: { gameId: string; name: string }) => {
      const game = games.find((g) => g.id === gameId);
      if (!game) throw new Error("Game not found");

      // Opret spiller
      const player = { id: uuidv4(), name, hand: new PlayerHand() };

      // Giv spilleren 7 kort fra bunken
      for (let i = 0; i < 7; i++) {
        player.hand.addCard(game.round.drawPile.draw());
      }

      game.players.push(player);
      return game;
    },
  },

  Game: {
    players: (game: any) => game.players,

    topCard: (game: any) => {
      const discard = game.round?.discardPile;
      if (!discard || discard.length === 0) return null;

      const top: Card = discard[discard.length - 1];
      return {
        color: top.color,
        type: CardType[top.type], // enum til string-navn
        value: (top as any).value ?? null, // kun NumberCard har value
      };
    },

    currentPlayer: (game: any) => game.round?.currentPlayerIndex ?? null,
  },

 Player: {
  hand: (player: any, _: any, context: any) => {
    // context.viewerId skal du sætte, fx når man joiner
    if (player.id === context.viewerId) {
      return player.hand.getCards().map((card: Card) => ({
        color: card.color,
        type: CardType[card.type],
        value: (card as any).value ?? null,
      }))
    }
    // andre spillere -> ikke vise deres kort
    return []
  },
  handCount: (player: any) => player.hand.getCardCount(),
},
};
export default resolvers;
