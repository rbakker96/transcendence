//The most crucial concept to grasp when using TypeORM is the entity. It is a class that maps to a database table.

import {Column, Entity, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import {Channel} from "../../chat/channel/channel.entity";
import {ChannelUser} from "../../chat/channel/channelUsers.entity";

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
    pendingInvite: boolean;

    @Column()
    authentication: boolean;

    @Column({ nullable: true })
    twoFactorSecret?: string;

    @OneToMany(() => ChannelUser, (channelUser) => channelUser.user)
    channelLinks: Promise<ChannelUser[]>;


}
