import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "ws";

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log("ChatGateway: init");
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log("ChatGateway: new client connected");
  }

  handleDisconnect(client: Socket) {
    console.log("ChatGateway: client disconnected");
  }

  @SubscribeMessage("newMessage")
  newMessageHandler(client: Socket, data: any) {
    console.log("ChatGateway: newMessageHandler");
    const response = JSON.stringify({ event: "newMessage", data: data });
    this.server.clients.forEach((c) => {
      c.send(response);
    });
  }
}
