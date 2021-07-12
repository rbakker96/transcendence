import {
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from "@nestjs/websockets";

import { Server } from "ws";
import {UnauthorizedException} from "@nestjs/common";

@WebSocketGateway()
export class WaitingRoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    waitingQueue = 0;
    @WebSocketServer() server: Server;

    afterInit(server: any): any {
        console.log("WaitingRoomGateway: init");
    }

    handleConnection(client: any, ...args: any[]): any {
        console.log("Waiting room: new client connected");
        if (this.preventDuplication())
            throw new UnauthorizedException('Only one tab allowed');

        this.waitingQueue++;


        // console.log("Waiting room: newMessageHandler");
        // const response = JSON.stringify({ event: "newMessage", data: data });
        // this.server.clients.forEach((c) => {
        //     c.send(response);
    }

    preventDuplication(): any {

    }

    handleDisconnect(client: any): any {
        console.log("Waiting room: client disconnected");
    }


}