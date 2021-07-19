export interface GameModel {
    gameID: number
    playerOne: number
    playerOneUsername: string
    playerOneScore: number
    playerTwo: number
    playerTwoUsername: string
    playerTwoScore: number
    winner: number
    loser: number
    gameURL: string
    active: boolean
}