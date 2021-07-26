import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ChannelUser} from "./channelUsers.entity";


@Entity('channels')

export class Channel {

  @Column()
  ChannelName: string;

  @OneToMany(() => ChannelUser, (channelUser) => channelUser.channel)
  userLinks: Promise<ChannelUser[]>;

  @Column()
  IsPrivate: boolean;

  @Column()
  public ownerId: number;

  @Column({default : false})
  IsDirect: boolean;

  @Column({nullable: true})
  Password: string;

  @PrimaryGeneratedColumn()
  Id: number;

}
