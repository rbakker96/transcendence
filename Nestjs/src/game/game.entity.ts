import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('games')
export class Game {

    @PrimaryGeneratedColumn()
    gameID: number;

    @Column()
    playerOne: number;

    @Column()
    playerOneScore: number;

    @Column()
    playerTwo: number;

    @Column()
    playerTwoScore: number;

    @Column()
    winner: number;

    @Column()
    loser: number;

    @Column()
    gameURL: string;

    @Column()
    active: boolean;

}