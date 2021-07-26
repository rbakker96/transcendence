import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer, SubscribeMessage,
} from "@nestjs/websockets";

import { Server, Socket } from "ws";
import { GameService } from "../game.service";
import { UserService } from "../../user/user.service";

enum game {
  classic = 0,
  deluxe = 1,
}

let waitingRoom_sockets: Socket[][] = [];     //sockets linked to unique gameRooms
waitingRoom_sockets[game.classic] = [];
waitingRoom_sockets[game.deluxe] = [];

let waitingUsers: number[][] = [];            //unique users in waitingRoom
waitingUsers[game.classic] = [];
waitingUsers[game.deluxe] = [];

@WebSocketGateway()
export class WaitingRoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
      private gameService: GameService,
      private userService: UserService,
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log("WaitingRoomGateway: init");
  }

  handleConnection(client: Socket, ...args: any[]) {
    if (args[0].url.includes("deluxeWaitingRoom")) {
      console.log("Waiting room: deluxe game client connected");
      waitingRoom_sockets[game.deluxe].push(client);
    }
    else if (args[0].url.includes("classicWaitingRoom")) {
      console.log("Waiting room: classic game client connected");
      waitingRoom_sockets[game.classic].push(client);
    }
  }

  @SubscribeMessage("newPlayer")
  async newDeluxeGamePlayer(client: Socket, data: any) {
    console.log("waitingRoom: newPlayerHandler");
    let gameType = game.classic

    if (data[1] === "deluxe")
      gameType = game.deluxe;

    if (waitingUsers[gameType].indexOf(data[0]) != -1) {
      const redirectData = {
        URL: '/profile',
      }
      const newRedirect = JSON.stringify({ event: "duplicateClient", data: redirectData});
      waitingRoom_sockets[gameType].forEach((c) => {
        c.send(newRedirect);
      });
    }
    else {
      waitingUsers[gameType].push(data[0]);
      if (waitingUsers[gameType].length == 2) {
        const playerOne = await this.userService.findOne(waitingUsers[gameType][0]);
        const playerTwo = await this.userService.findOne(waitingUsers[gameType][1]);

        // new database entry
        let newGameDto = {
          playerOne: waitingUsers[gameType][0],
          playerOneUsername: playerOne.username,
          playerOneScore: 0,
          playerTwo: waitingUsers[gameType][1],
          playerTwoUsername: playerTwo.username,
          playerTwoScore: 0,
          winner: 0,
          loser: 0,
          gameURL: '',
          active: true,
        }
        const gameID = await this.gameService.create(newGameDto);

        let gameURL;
        if (data[1] === "classic")
          gameURL = `/game:${gameID}`;
        else if (data[1] === "deluxe")
          gameURL = `/specialGame:${gameID}`;

        await this.gameService.updateGameURL(gameID, gameURL);

        console.log(await this.gameService.findOne(gameID));

        // send event for redirect to game page
        const gameData = {
          gameID: gameID,
          gameURL: gameURL,
          playerOne: playerOne.id,
          playerOneUsername: playerOne.username,
          playerTwo: playerTwo.id,
          playerTwoUsername: playerTwo.username,
        }
        const newGame = JSON.stringify({ event: "newPlayer", data: gameData});
        waitingRoom_sockets[gameType].forEach((c) => {
          c.send(newGame);
        });

        // clear users from waiting users
        console.log("ARRAY LENGTH BEFORE = ", waitingUsers[gameType].length);
        waitingUsers[gameType].splice(0, 2);
        // waitingUsers[gameType] = []; //not working for multiple clients (more then 2)
        console.log("ARRAY LENGTH AFTER = ", waitingUsers[gameType].length);
      }
    }
  }

  handleDisconnect(client: Socket): any {
    let leaving_client;
    if ((leaving_client = waitingRoom_sockets[game.classic].indexOf(client)) != -1) {
      console.log("Waiting room: classic game client disconnected");
      waitingRoom_sockets[game.classic].splice(leaving_client, 1);
    }
    else if (((leaving_client = waitingRoom_sockets[game.deluxe].indexOf(client)) > -1)) {
      console.log("Waiting room: deluxe game client disconnected");
      waitingRoom_sockets[game.deluxe].splice(leaving_client, 1);
    }
  }

}