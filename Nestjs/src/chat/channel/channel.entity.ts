import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/models/user.entity";


@Entity('channels')

export class Channel {

  @Column()
  ChannelName: string;

  @ManyToMany(type => User, users => users.channels)
  @JoinTable()
  users: User[];

  // @OneToMany(() => ChannelUser, (channelUser) => channelUser.channel)
  // userLinks: Promise<ChannelUser[]>; // dit moet ik nog even onderzoeken weet niet of dit de beste manier is
  @ManyToMany(type => User, admin => admin.channels )
  @JoinTable()
  admins: User[];

  @Column()
  IsPrivate: boolean;

  @Column({default : false})
  IsDirect: boolean;

  @Column({nullable: true})
  Password: string;

  @PrimaryGeneratedColumn()
  Id: number;

}
