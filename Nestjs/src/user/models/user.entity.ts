//The most crucial concept to grasp when using TypeORM is the entity. It is a class that maps to a database table.

import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {

    @PrimaryColumn({ unique: true })
    id: number;

    @Column()
    avatar: string;

    @Column({ unique: true })
    username: string;

    @Column( { unique: true })
    email: string;

    @Column({ unique: true })
    phonenumber: string;

    @Column()
    authentication: boolean;

}