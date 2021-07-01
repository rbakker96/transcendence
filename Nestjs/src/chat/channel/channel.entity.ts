import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('channels')

export class Channel {
  @Column({unique:true})
  ChannelName: string;

  @Column()
  Admin: string; // becomes channel admin

  @Column({default: "doei"})
  Users: string; // becomes connection to channelusers

  @Column({default: false})
  IsPrivate: boolean;

  @PrimaryGeneratedColumn()
  Id: number;

}
