import { IsNotEmpty } from "class-validator";
import {Column} from "typeorm";

export class newGameDto {
    @IsNotEmpty()
    playerOne: number;

    @IsNotEmpty()
    playerOneUsername: string;

    @IsNotEmpty()
    playerTwo: number;

    @IsNotEmpty()
    playerTwoUsername: string;

    active: boolean;
}