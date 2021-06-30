import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  messageID: number;

  @Column({unique: true})
  channelID: number;

  @Column({unique: true})
  senderID: number;

  @Column()
  messageContent: string;

  @Column()
  messageTimestamp: string;
}
