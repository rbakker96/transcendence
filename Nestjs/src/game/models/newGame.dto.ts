import { IsNotEmpty } from "class-validator";

export class newGameDto {
    @IsNotEmpty()
    playerOne: number;

    @IsNotEmpty()
    playerTwo: number;

    active: boolean;
}