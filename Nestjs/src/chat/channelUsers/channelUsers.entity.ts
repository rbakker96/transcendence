import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Channel} from "../channel/channel.entity";
import {User} from "../../user/models/user.entity";

@Entity('channelUsers')

export class ChannelUsers {
    @PrimaryGeneratedColumn()
    Key: number;

    @ManyToOne(() => Channel, channel => channel.channelUsers)
    channel: Channel;

    @OneToMany(() => User, Users => Users.ChannelUsers)
    user: User;
}