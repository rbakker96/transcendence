import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/models/user.entity";


@Entity('channels')

export class Channel {
  @Column({unique:true})
  ChannelName: string;

  @ManyToMany(type => User, users => users.channels)
  @JoinTable()
  users: User[];

  @ManyToMany(type => User, admin => admin.channels)
  @JoinTable()
  admins: User[];

  @Column()
  IsPrivate: boolean;

  @Column({default : false})
  IsDirect: boolean;

  @PrimaryGeneratedColumn()
  Id: number;

}
