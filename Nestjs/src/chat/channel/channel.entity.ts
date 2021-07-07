import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/models/user.entity";


@Entity('channels')

export class Channel {
  @Column({unique:true})
  ChannelName: string;

  @ManyToMany(type => User, users => users.channels)
  @JoinTable()
  users: User[];

  @Column({default: false})
  IsPrivate: boolean;

  @PrimaryGeneratedColumn()
  Id: number;

}
