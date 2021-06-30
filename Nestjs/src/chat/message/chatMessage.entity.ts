import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  messageID: number;

  @Column()
  channelID: number;

  @Column()
  senderID: number;

  @Column()
  messageContent: string;

  @Column()
  messageTimestamp: string;
}
