export interface UnoCard {
  color: string | null
  type: string
  value?: number | null
  back?: boolean
}

export interface UnoPlayer {
  id: string
  name: string
  handCount: number
  hand: UnoCard[]
}

export interface UnoGame {
  id: string
  topCard: UnoCard | null
  players: UnoPlayer[]
  currentPlayer: Omit<UnoPlayer, 'hand' | 'handCount'> | null
  activeColor: string | null
  winner: string | null
  direction: number
}

export interface UnoGameSpecs {
  id: string
  players: string[]
  creator?: string
  number_of_players?: number
}
