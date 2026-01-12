import gql from "graphql-tag";
// Graphql
// Graphql with typescript
// GraphQL schema
// Graphql type
// Queries, mutations og subscriptions
//game store
export const typeDefs = gql`
  type Card {
    color: String
    type: String
    value: Int
    back: Boolean
  }

 type Player {
  id: ID!
  name: String!
  hand: [Card!]!     
  handCount: Int!    # andre spillere ser kun hvor mange kort
}
type Subscription {
  gameUpdated(id: ID!): Game!
}
type Game {
  id: ID!
  players: [Player!]! #exclamation mark
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
  playCard(gameId: ID!, playerId: ID!, cardIndex: Int!, chosenColor: String): Game! 
    drawCard(gameId: ID!, playerId: ID!): Game!
  }
`;
