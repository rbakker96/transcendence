import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ChannelUsers} from "../channelUsers/channelUsers.entity";

@Entity('channels')

export class Channel {
  @Column({unique:true})
  ChannelName: string;

  @OneToMany(() => ChannelUsers, ChannelUsers => ChannelUsers.channel)
  channelUsers: ChannelUsers[];

  @Column({default: false})
  IsPrivate: boolean;

  @PrimaryGeneratedColumn()
  Id: number;

}
