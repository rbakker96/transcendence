//The most crucial concept to grasp when using TypeORM is the entity. It is a class that maps to a database table.

import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {

    @Column({ unique: true })
    username: string;

    @Column( { unique: true })
    email: string;

    @Column()
    phonenumber: string;

    @Column()
    authentication: boolean;

    @Column()
    avatar: string;

    @PrimaryGeneratedColumn()
    id: number;

}
