import { IsNotEmpty } from "class-validator";

export class ChatMessageDto {
  messageID: number;

  @IsNotEmpty()
  channelID: number;

  @IsNotEmpty()
  senderID: number;

  @IsNotEmpty()
  messageContent: string;

  @IsNotEmpty()
  messageTimestamp: string;
}
