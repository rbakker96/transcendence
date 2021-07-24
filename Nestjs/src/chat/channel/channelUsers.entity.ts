import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/models/user.entity";
import {Channel} from "./channel.entity";

export enum ChannelUserType {
    Member = 0,
    Admin,
    Owner,
    Muted,
    Kicked,
}

@Entity()
export class ChannelUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.channelLinks, {
        primary: true
    })
    @JoinColumn({name: "userId"})
    user: User;

    @ManyToOne(() => Channel, channel => channel.userLinks, {
        primary: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: "channelId"})
    channel: Channel;

    @Column({default: ChannelUserType.Member})
    userType: ChannelUserType;
}
