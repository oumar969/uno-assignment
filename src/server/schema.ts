import gql from "graphql-tag";

export const typeDefs = gql`
  type Card {
    color: String
    type: String
    value: Int
  }

 type Player {
  id: ID!
  name: String!
  hand: [Card!]!     # kun egen hånd
  handCount: Int!    # andre spillere ser kun hvor mange kort
}

  type Game {
    id: ID!
    players: [Player!]!
    topCard: Card
    currentPlayer: Int
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
