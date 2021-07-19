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
let waitingUsers: number[][] = [];            //unique users in waitingRoom
let waitingRoom_IDs: number[] = [];           //unique gamesRooms

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
    if (args[0].url.includes("WaitingRoom")) {
      console.log("Waiting room: new client connected");

      if (!waitingRoom_sockets[game.classic]) {
        waitingRoom_sockets[game.classic] = [];
        waitingUsers[game.classic] = [];
      }
      waitingRoom_sockets[game.classic].push(client);
      waitingRoom_IDs.push(game.classic);
    }

    //same routine for deluxe gameType

  }


  @SubscribeMessage("newClassicGamePlayer")
  async newClassicGamePlayer(client: Socket, data: any) {
    console.log("waitingRoom: newClassicGamePlayerHandler");

    if (waitingUsers[game.classic].indexOf(data.id) != -1) {
        //remove socket from duplicate client
        let index = waitingRoom_sockets.indexOf(client);
        waitingRoom_sockets[game.classic].splice(index, 1);

        //send event for redirection to profile page
        const redirectData = {
          URL: 'http://localhost/profile',
        }
        const newRedirect = JSON.stringify({ event: "duplicateClient", data: redirectData});
        waitingRoom_sockets[game.classic].forEach((c) => {
          c.send(newRedirect);
        });
    }
    else {
      waitingUsers[game.classic].push(data.id);
      if (waitingUsers[game.classic].length == 2) {
        const playerOne = await this.userService.findOne(waitingUsers[game.classic][0]);
        const playerTwo = await this.userService.findOne(waitingUsers[game.classic][1]);

        // new database entry
        let newGameDto = {
          playerOne: waitingUsers[game.classic][0],
          playerOneUsername: playerOne.username,
          playerOneScore: 0,
          playerTwo: waitingUsers[game.classic][1],
          playerTwoUsername: playerTwo.username,
          playerTwoScore: 0,
          winner: 0,
          loser: 0,
          gameURL: '',
          active: true,
        }
        const gameID = await this.gameService.create(newGameDto);
        const gameURL = `/game:${gameID}`;
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
        const newGame = JSON.stringify({ event: "newClassicGamePlayer", data: gameData});
        waitingRoom_sockets[game.classic].forEach((c) => {
          c.send(newGame);
        });

        // clear users from waiting users
        waitingUsers[game.classic] = []; //not working for multiple clients (more then 2)
      }
    }
  }

  @SubscribeMessage("newDeluxeGamePlayer")
  newDeluxeGamePlayer(client: Socket, data: any) {
    console.log("waitingRoom: newDeluxeGamePlayerHandler");


  }



  handleDisconnect(client: Socket) {
    waitingRoom_IDs.forEach(function (id) {
      if (waitingRoom_sockets[id]) {
        let index = waitingRoom_sockets.indexOf(client);
        if (index > -1) {
          console.log("Waiting room: client disconnected");
          waitingRoom_sockets[game.classic].splice(index, 1); //Does this work for waiting room??
          // remove active channel id after the array is empty
        }
      }
    });
  }
}
