"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = (0, graphql_tag_1.default) `
  type Card {
    color: String
    type: String
    value: Int
    back: Boolean
  }

 type Player {
  id: ID!
  name: String!
  hand: [Card!]!     # kun egen hånd
  handCount: Int!    # andre spillere ser kun hvor mange kort
}
type Subscription {
  gameUpdated(id: ID!): Game!
}
type Game {
  id: ID!
  players: [Player!]!
  topCard: Card
  currentPlayer: Player
  activeColor: String
  winner: String
  direction: Int
  handCount: Int
}
    
  type Query {
    games: [Game!]!
    game(id: ID!): Game
  }

  type Mutation {
    createGame: Game!
    joinGame(gameId: ID!, name: String!): Game!
  playCard(gameId: ID!, playerId: ID!, cardIndex: Int!, chosenColor: String): Game! # 👈 vigtigt
    drawCard(gameId: ID!, playerId: ID!): Game!
  }
`;
//# sourceMappingURL=schema.js.map