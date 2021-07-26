import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import {ChannelUser} from "../chat/channel/channelUsers.entity";

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

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];
}
