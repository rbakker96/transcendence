import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";

import { Server } from "ws";

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: any): any {
    console.log("ChatGateway: init");
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log("ChatGateway: new client connected");
  }

  handleDisconnect(client: any): any {
    console.log("ChatGateway: client disconnected");
  }

  @SubscribeMessage("newMessage")
  newMessageHandler(client: any, data: any): any {
    console.log("ChatGateway: newMessageHandler");
    const response = JSON.stringify({ event: "newMessage", data: data });
    this.server.clients.forEach((c) => {
      c.send(response);
    });
  }
}
