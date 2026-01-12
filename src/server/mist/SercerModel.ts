/*
Refactored logic to move game rules and validation to uno-core classes.
*/
import { GameStore } from "../GameStore#";
import { EventEmitter } from "events";
import { v4 as uuidv4 } from "uuid";
import { UnoDeck } from "../../uno-core/deck/UnoDeck";
import { PlayerHand } from "../../uno-core/player/PlayerHand";
import { Round } from "../../uno-core/round/Round";

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

    game.round.validateTurn(player);
    game.round.playCard(player, cardIndex, chosenColor);

    if (player.hand.getCards().length === 0) {
      game.winner = player.name;
    }

    this.store.updateGame(game);
    this.emit(gameId, game);
    return game;
  }

  /* ------------------ DRAW CARD ------------------ */
  drawCard(gameId: string, playerId: string) {
    const game = this.requireGame(gameId);
    const player = this.requirePlayer(game, playerId);

    game.round.validateTurn(player);
    game.round.drawCard(player);

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
}
