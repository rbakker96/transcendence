import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "ws";

let chat_sockets: Socket[][] = [];
let chat_channel_IDs: number[] = [];

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {}

  handleConnection(client: Socket, ...args: any[]) {
    if (args[0].url.includes("chat")) {
      const id = args[0].url.replace(/[^0-9]/g, "");
      if (!chat_sockets[id]) chat_sockets[id] = [];
      chat_sockets[id].push(client);
      chat_channel_IDs.push(id);
    }
  }

  handleDisconnect(client: Socket) {
    chat_channel_IDs.forEach(function (id) {
      if (chat_sockets[id]) {
        let index = chat_sockets[id].indexOf(client);
        if (index > -1) {
          chat_sockets[id].splice(index, 1);
        }
      }
    });
  }

  @SubscribeMessage("newMessage")
  newMessageHandler(client: Socket, data: any) {
    const response = JSON.stringify({ event: "newMessage", data: data });
    chat_sockets[data.channelID].forEach((c) => {
      c.send(response);
    });
  }
}
