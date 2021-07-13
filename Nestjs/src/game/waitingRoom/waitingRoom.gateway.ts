import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "ws";
import { UnauthorizedException } from "@nestjs/common";

let waitingRoom_sockets: Socket[][] = [];
let waitingRoom_IDs: number[] = [];

@WebSocketGateway()
export class WaitingRoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  waitingQueue = 0;
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log("WaitingRoomGateway: init");
  }

  handleConnection(client: Socket, ...args: any[]) {
    if (args[0].url.includes("WaitingRoom")) {
      console.log("Waiting room: new client connected");
      const id = args[0].url.replace(/[^0-9]/g, "");
      if (!waitingRoom_sockets[id]) waitingRoom_sockets[id] = [];
      waitingRoom_sockets.push(client);
      id.push(id);
    }

    if (this.preventDuplication())
      throw new UnauthorizedException("Only one tab allowed");

    this.waitingQueue++;

    // console.log("Waiting room: newMessageHandler");
    // const response = JSON.stringify({ event: "newMessage", data: data });
    // this.server.clients.forEach((c) => {
    //     c.send(response);
  }

  preventDuplication(): any {}

  handleDisconnect(client: Socket) {
    waitingRoom_IDs.forEach(function (id) {
      if (waitingRoom_sockets[id]) {
        let index = waitingRoom_sockets.indexOf(client);
        if (index > -1) {
          console.log("Waiting room: client disconnected");
          waitingRoom_sockets[id].splice(index, 1);
          // remove active channel id after the array is empty
        }
      }
    });
  }
}
