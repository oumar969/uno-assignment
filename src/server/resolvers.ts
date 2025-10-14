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
      const game = {
        id,
        players: [],
        round,
        currentPlayerIndex: 0, // 🔹 første spiller starter
        direction: 1, // 🔹 1 = med uret, -1 = mod uret
      };
           // game.round.activeColor = null; // 👈 den nuværende farve på bordet

      games.push(game);
      return game;
      
    },

    joinGame: (_: any, { gameId, name }: { gameId: string; name: string }, context: any) => {
      const game = games.find((g) => g.id === gameId);
      if (!game) throw new Error("Game not found");

      const viewerId = context.viewerId;
      let player = game.players.find((p: any) => p.id === viewerId || p.name === name);

      if (!player) {
        player = { id: uuidv4(), name, hand: new PlayerHand() };

        // Giv 7 kort fra bunken
        for (let i = 0; i < 7; i++) {
          player.hand.addCard(game.round.drawPile.draw());
        }

        game.players.push(player);
      }

      console.log("✅ Player joined:", player.id, "viewer:", viewerId, "game:", gameId);

      return game;
    },

    playCard: (_: any, { gameId, playerId, cardIndex, chosenColor }: any) => {
  const game = games.find((g) => g.id === gameId);
  if (!game) throw new Error("Game not found");

  const player = game.players.find((p: any) => p.id === playerId);
  if (!player) throw new Error("Player not found");

  // 🚫 Kun den spiller der har tur må spille
  const currentPlayer = game.players[game.currentPlayerIndex];
  if (player.id !== currentPlayer.id) {
    throw new Error("Not your turn!");
  }

  const handCards = player.hand.getCards();
  const card = handCards[cardIndex];
  if (!card) throw new Error("Card not found");

  const discard = game.round.discardPile;
  const top = discard[discard.length - 1];
  if (!top) throw new Error("No top card found");

  const cardType = typeof card.type === "number" ? CardType[card.type] : card.type;
  const topType = typeof top.type === "number" ? CardType[top.type] : top.type;

  // 🎨 brug den aktive farve, hvis den er sat
  const activeColor = game.round.activeColor || top.color;

  const sameColor = card.color === activeColor;
  const sameValue =
    (card as any).value !== undefined &&
    (top as any).value !== undefined &&
    (card as any).value === (top as any).value;
  const isWild = cardType === "Wild" || cardType === "WildDrawFour";

  if (!(sameColor || sameValue || isWild)) {
    throw new Error(
      `Illegal move: ${card.color} ${cardType} does not match ${activeColor}`
    );
  }

  // ✅ Spil kortet
  player.hand.playCard(cardIndex);
  discard.push(card);

  // 🎨 Håndter farvevalg ved Wild-kort
  if (isWild) {
    if (!chosenColor) {
      throw new Error("You must choose a color for a Wild card!");
    }
    game.round.activeColor = chosenColor;
    console.log(`🎨 Wild color chosen: ${chosenColor}`);
  } else {
    // Ellers sæt farven til kortets farve
    game.round.activeColor = card.color;
  }

  // 🔁 Håndter specialkort
  if (cardType === "Reverse") {
    game.direction *= -1; // skift retning
  }

  if (cardType === "Skip") {
    // spring næste spiller over
    game.currentPlayerIndex =
      (game.currentPlayerIndex + game.direction + game.players.length) % game.players.length;
  }

  if (cardType === "DrawTwo") {
    // næste spiller trækker 2 kort
    const nextIndex =
      (game.currentPlayerIndex + game.direction + game.players.length) % game.players.length;
    const nextPlayer = game.players[nextIndex];
    nextPlayer.hand.addCard(game.round.drawPile.draw());
    nextPlayer.hand.addCard(game.round.drawPile.draw());
    console.log(`➕2! ${nextPlayer.name} trækker 2 kort`);
  }

  if (cardType === "WildDrawFour") {
    // næste spiller trækker 4 kort
    const nextIndex =
      (game.currentPlayerIndex + game.direction + game.players.length) % game.players.length;
    const nextPlayer = game.players[nextIndex];
    for (let i = 0; i < 4; i++) nextPlayer.hand.addCard(game.round.drawPile.draw());
    console.log(`🌈➕4! ${nextPlayer.name} trækker 4 kort`);
  }

  // 🔄 Skift tur
  game.currentPlayerIndex =
    (game.currentPlayerIndex + game.direction + game.players.length) % game.players.length;

  console.log(
    `➡️ Next turn: ${game.players[game.currentPlayerIndex].name} (${game.players[game.currentPlayerIndex].id})`
  );

  return game;
},

    drawCard: (_: any, { gameId, playerId }: any) => {
      const game = games.find((g) => g.id === gameId);
      if (!game) throw new Error("Game not found");

      const player = game.players.find((p: any) => p.id === playerId);
      if (!player) throw new Error("Player not found");

      // ✅ kun hvis det er spillerens tur
      const currentPlayer = game.players[game.currentPlayerIndex];
      if (player.id !== currentPlayer.id) {
        throw new Error("Not your turn!");
      }

      player.hand.addCard(game.round.drawPile.draw());

      // Efter træk → næste tur
      game.currentPlayerIndex =
        (game.currentPlayerIndex + game.direction + game.players.length) % game.players.length;

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

    // 🔹 viser hvem der har tur
    currentPlayer: (game: any) => {
      const player = game.players[game.currentPlayerIndex];
      return player
        ? { id: player.id, name: player.name }
        : null;
    },
  },

  Player: {
    hand: (player: any, _: any, context: any) => {
      if (!context?.viewerId) return [];

      if (player.id === context.viewerId) {
        return player.hand.getCards().map((card: Card) => ({
          color: card.color,
          type: CardType[card.type],
          value: (card as any).value ?? null,
        }));
      }

      return [];
    },
  },
};

export default resolvers;
