import { gql } from "@apollo/client/core"
import { apolloClient } from "./apollo"

//  Hent alle aktive spil
export async function games() {
  const query = gql`
    query {
      games {
        id
        players { id name }
      }
    }`
  const result = await apolloClient.query({ query, fetchPolicy: "no-cache" })
  return result.data.games
}

//  Opret et nyt spil
export async function createGame() {
  const mutation = gql`
    mutation {
      createGame { id }
    }`
  const result = await apolloClient.mutate({ mutation })
  return result.data.createGame
}

//  Join et spil
export async function joinGame(gameId: string, name: string) {
  const mutation = gql`
    mutation JoinGame($gameId: ID!, $name: String!) {
      joinGame(gameId: $gameId, name: $name) {
        id
        players { id name }
      }
    }`
  const result = await apolloClient.mutate({ mutation, variables: { gameId, name } })
  return result.data.joinGame
}

//  Hent ét spil med kort og spillere
export async function game(id: string) {
  const query = gql`
    query ($id: ID!) {
      game(id: $id) {
        id
        winner
        topCard { color type value }
        players {
          id name
          hand { color type value }
        }
      }
    }`
  const result = await apolloClient.query({ query, variables: { id }, fetchPolicy: "no-cache" })
  return result.data.game
}

//  Spil et kort
export async function playCard(gameId: string, playerId: string, cardIndex: number, chosenColor?: string) {
  const mutation = gql`
    mutation PlayCard($gameId: ID!, $playerId: ID!, $cardIndex: Int!, $chosenColor: String) {
      playCard(gameId: $gameId, playerId: $playerId, cardIndex: $cardIndex, chosenColor: $chosenColor) {
        id
        winner
        topCard { color type value }
        players {
          id name
          hand { color type value }
        }
      }
    }`
  const result = await apolloClient.mutate({
    mutation,
    variables: { gameId, playerId, cardIndex, chosenColor }
  })
  return result.data.playCard
}

//  Træk et kort
export async function drawCard(gameId: string, playerId: string) {
  const mutation = gql`
    mutation DrawCard($gameId: ID!, $playerId: ID!) {
      drawCard(gameId: $gameId, playerId: $playerId) {
        id
        topCard { color type value }
        players {
          id name
          hand { color type value }
        }
      }
    }`
  const result = await apolloClient.mutate({ mutation, variables: { gameId, playerId } })
  return result.data.drawCard
}

export function join(value: UnoGameSpecs, player: string) {
    throw new Error('Function not implemented.')
}
export function pending_games() {
  throw new Error('Function not implemented.')
}

