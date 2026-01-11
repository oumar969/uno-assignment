//TypeScript interfaces
//Use it to describe one card.
export interface UnoCard {
  color: string | null
  type: string
  value?: number | null
  back?: boolean
}
//Use it to describe one player in the game.
export interface UnoPlayer {
  id: string
  name: string
  handCount: number
  hand: UnoCard[]
}
//Use it to describe the whole game state.
export interface UnoGame {
  id: string
  topCard: UnoCard | null
  players: UnoPlayer[]
  currentPlayer: Omit<UnoPlayer, 'hand' | 'handCount'> | null
  activeColor: string | null
  winner: string | null
  direction: number
}
//Use it to describe game info in the lobby / before the game starts.
export interface UnoGameSpecs {
  id: string
  players: string[]
  creator?: string
  number_of_players?: number
}
