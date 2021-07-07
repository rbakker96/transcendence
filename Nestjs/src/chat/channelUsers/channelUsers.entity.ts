import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Channel} from "../channel/channel.entity";
import {User} from "../../user/models/user.entity";

@Entity(' ChannelUsers')

export class ChannelUsers {
    @PrimaryGeneratedColumn()
    Key: number;

    @ManyToOne(() => Channel, channel => channel.channelUsers)
    channel: Channel;

    @ManyToOne(() => User, Users => Users.channelusers)
    user: User;
}