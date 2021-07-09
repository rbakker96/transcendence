import { IsNotEmpty } from "class-validator";

export class gameStatsDto {

    @IsNotEmpty()
    gameID: number;

    @IsNotEmpty()
    playerOneScore: number;

    @IsNotEmpty()
    playerTwoScore: number;

    @IsNotEmpty()
    winner: number;

    @IsNotEmpty()
    loser: number;

    active: boolean;

}