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

      const player = { id: uuidv4(), name, hand: new PlayerHand() };

      for (let i = 0; i < 7; i++) {
        player.hand.addCard(game.round.drawPile.draw());
      }

      game.players.push(player);
      return game;
    },
playCard: (_: any, { gameId, playerId, cardIndex }: any) => {
  const game = games.find((g) => g.id === gameId);
  if (!game) throw new Error("Game not found");

  const player = game.players.find((p: any) => p.id === playerId);
  if (!player) throw new Error("Player not found");

  const handCards = player.hand.getCards();
  const card = handCards[cardIndex];
  if (!card) throw new Error("Card not found");

  // hent topkort
  const discard = game.round.discardPile;
  const top = discard[discard.length - 1];

  // ✅ UNO regler
  const sameColor = card.color === top.color;
  const sameValue = (card as any).value !== undefined && (card as any).value === (top as any).value;
  const sameType = card.type === top.type;

  const isWild = card.type === CardType.Wild || card.type === CardType.WildDrawFour;

  if (!(sameColor || sameValue || sameType || isWild)) {
    throw new Error("Illegal move: card does not match top card");
  }

  // fjern kortet fra spillerens hånd
  player.hand.playCard(cardIndex);

  // læg på bunken
  discard.push(card);

  return {
    ...game,
    players: game.players.map((p: any) => ({
      ...p,
      hand: p.hand.getCards(), // vigtigt!
    })),
  };
},

    drawCard: (_: any, { gameId, playerId }: any) => {
      const game = games.find((g) => g.id === gameId);
      if (!game) throw new Error("Game not found");

      const player = game.players.find((p: any) => p.id === playerId);
      if (!player) throw new Error("Player not found");

      player.hand.addCard(game.round.drawPile.draw());
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
        type: CardType[top.type],
        value: (top as any).value ?? null,
      };
    },
  },

  Player: {
    hand: (player: any, _: any, context: any) => {
      if (player.id === context.viewerId) {
        return player.hand.getCards().map((card: Card) => ({
          color: card.color,
          type: CardType[card.type],
          value: (card as any).value ?? null,
        }));
      }
      return [];
    },
    handCount: (player: any) => player.hand.getCardCount(),
  },
};
export default resolvers;