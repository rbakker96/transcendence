import { IsNotEmpty } from "class-validator";

export class newGameDto {
    @IsNotEmpty()
    playerOne: number;

    @IsNotEmpty()
    playerTwo: number;

    @IsNotEmpty()
    gameURL: string;

    active: boolean;
}