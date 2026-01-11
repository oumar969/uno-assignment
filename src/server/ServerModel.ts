/*
Validerer handlinger (fx “not your turn”)
Orkestrerer spilflow (join, playCard, drawCard)
Udsender events via EventEmitter
*/
import { GameStore } from "./GameStore";
import { EventEmitter } from "events";
import { v4 as uuidv4 } from "uuid";
import { UnoDeck } from "../uno-core/deck/UnoDeck";
import { PlayerHand } from "../uno-core/player/PlayerHand";
import { Round } from "../uno-core/round/Round";
import { CardType } from "../uno-core/types/CardType";
import { Card } from "../uno-core/cards/Card";
//ServerModel handles all game logic and rules
//Contains all game rules (UNO rules, turn logic, special cards)
//GameStore is used to persist game state
//EventEmitter is used to emit events to clients
export class ServerModel {
  constructor(
    private store: GameStore,
    private gameEvents: EventEmitter
  ) {}

  /* ------------------ GAME CREATION ------------------ */
  createGame() {
    const id = uuidv4();
    const deck = new UnoDeck();
    const round = new Round([], deck);

    const game = {
      id,
      players: [],
      round,
      currentPlayerIndex: 0,
      direction: 1,
      winner: null,
    };

    this.store.addGame(game);
    return game;
  }

  getGame(id: string) {
    return this.store.getGame(id);
  }

  getGames() {
    return this.store.getGames();
  }

  /* ------------------ JOIN GAME ------------------ */
  joinGame(gameId: string, name: string, viewerId?: string) {
    const game = this.store.getGame(gameId);
    if (!game) throw new Error("Game not found");

    const existing = game.players.find(
      (p: any) => p.id === viewerId || p.name === name
    );
    if (existing) return game;

    const playerId = viewerId ?? uuidv4();
    const hand = new PlayerHand();

    for (let i = 0; i < 7; i++) {
      hand.addCard(game.round.drawPile.draw());
    }

    game.players.push({ id: playerId, name, hand });

    this.store.updateGame(game);
    this.emit(gameId, game);
    return game;
  }

  /* ------------------ PLAY CARD ------------------ */
  playCard(
    gameId: string,
    playerId: string,
    cardIndex: number,
    chosenColor?: string
  ) {
    const game = this.requireGame(gameId);
    const player = this.requirePlayer(game, playerId);

    this.requireTurn(game, player);

    const handCards = player.hand.getCards();
    const card: Card = handCards[cardIndex];
    if (!card) throw new Error("Card not found");

    const discard = game.round.discardPile;
    const top = discard.at(-1);
    if (!top) throw new Error("No top card");

    const activeColor = game.round.activeColor ?? top.color;
    const cardType = CardType[card.type];

    // Adjust the type definition or casting to ensure 'value' is accessible
    const cardValue = (card as any).value;
    const topValue = (top as any).value;

    const legal =
      card.color === activeColor ||
      cardValue === topValue ||
      cardType === "Wild" ||
      cardType === "WildDrawFour";

    if (!legal) {
      throw new Error("Illegal move");
    }

    // Play card
    player.hand.playCard(cardIndex);
    discard.push(card);

    // Winner check
    if (player.hand.getCards().length === 0) {
      game.winner = player.name;
      this.store.updateGame(game);
      this.emit(gameId, game);
      return game;
    }

    // Handle wild color
    if (cardType === "Wild" || cardType === "WildDrawFour") {
      if (!chosenColor) throw new Error("Choose a color");
      game.round.activeColor = chosenColor;
    } else {
      game.round.activeColor = card.color;
    }

    // Special cards
    this.applySpecialCard(game, cardType);

    this.advanceTurn(game);
    this.store.updateGame(game);
    this.emit(gameId, game);
    return game;
  }

  /* ------------------ DRAW CARD ------------------ */
  drawCard(gameId: string, playerId: string) {
    const game = this.requireGame(gameId);
    const player = this.requirePlayer(game, playerId);

    this.requireTurn(game, player);

    player.hand.addCard(game.round.drawPile.draw());
    this.advanceTurn(game);

    this.store.updateGame(game);
    this.emit(gameId, game);
    return game;
  }

  /* ------------------ HELPERS ------------------ */
  private emit(gameId: string, game: any) {
    this.gameEvents.emit("GAME_UPDATED", { gameId, game });
  }

  private requireGame(gameId: string) {
    const game = this.store.getGame(gameId);
    if (!game) throw new Error("Game not found");
    return game;
  }

  private requirePlayer(game: any, playerId: string) {
    const player = game.players.find((p: any) => p.id === playerId);
    if (!player) throw new Error("Player not found");
    return player;
  }

  private requireTurn(game: any, player: any) {
    const current = game.players[game.currentPlayerIndex];
    if (current.id !== player.id) {
      throw new Error("Not your turn");
    }
  }

  private advanceTurn(game: any) {
    game.currentPlayerIndex =
      (game.currentPlayerIndex + game.direction + game.players.length) %
      game.players.length;
  }

  private applySpecialCard(game: any, type: string) {
    if (type === "Reverse") {
      game.direction *= -1;
    }

    if (type === "Skip") {
      this.advanceTurn(game);
    }

    if (type === "DrawTwo") {
      this.drawCardsToNext(game, 2);
    }

    if (type === "WildDrawFour") {
      this.drawCardsToNext(game, 4);
    }
  }

  private drawCardsToNext(game: any, count: number) {
    const next =  
      (game.currentPlayerIndex + game.direction + game.players.length) %
      game.players.length;

    for (let i = 0; i < count; i++) {
      game.players[next].hand.addCard(
        game.round.drawPile.draw()
      );
    }

    game.currentPlayerIndex = next;
  }

  /* ------------------ READ MODELS ------------------ */

  getTopCard(game: any) {
    const top = game.round.discardPile.at(-1);
    if (!top) return null;

    return {
      color: top.color,
      type: CardType[top.type],
      value: (top as any).value ?? null,
    };
  }

  getCurrentPlayer(game: any) {
    const p = game.players[game.currentPlayerIndex];
    return p ? { id: p.id, name: p.name } : null;
  }

  getVisibleHand(player: any, viewerId?: string) {
    if (!viewerId || player.id === viewerId) {
      return player.hand.getCards().map((c: Card) => ({
        color: c.color,
        type: CardType[c.type],
        value: (c as any).value ?? null,
        back: false,
      }));
    }

    return player.hand.getCards().map(() => ({
      color: null,
      type: null,
      value: null,
      back: true,
    }));
  }
}
