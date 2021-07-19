import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('games')
export class Game {

    @PrimaryGeneratedColumn()
    gameID: number;

    @Column()
    playerOne: number;

    @Column()
    playerOneUsername: string;

    @Column()
    playerOneScore: number;

    @Column()
    playerTwo: number;

    @Column()
    playerTwoUsername: string;

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