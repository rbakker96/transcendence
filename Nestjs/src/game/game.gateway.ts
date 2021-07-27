import {
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'ws';

let connectedClients: Socket[][] = [];		//clients for specific game (players/viewers)
let allGameStates: gameState[][] = [];		//gameState for each game
let activeGameIDs: number[] = [];			//all active games by gameID

type gameState = {
	leftPlayerName: string
	leftPlayerY: number
	leftPlayerMoveSpeed: number
	leftMoveSpeedUsesLeft: number
	leftMoveSpeedColor: string
	leftShotSpeedUsesLeft: number
	leftShotSpeedColor: string
	rightPlayerName: string
	rightPlayerY: number
	rightPlayerMoveSpeed: number
	rightMoveSpeedUsesLeft: number
	rightMoveSpeedColor: string
	rightShotSpeedUsesLeft: number
	rightShotSpeedColor: string
	ballX: number
	ballY: number
	velocityX: number
	velocityY: number
	leftPlayerScore: number
	rightPlayerScore: number
	gameFinished: boolean
}

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	numberOfPlayers: number = 0;
	gameState: gameState = {
		leftPlayerName: "LEFT_PLAYER_NAME",
		leftPlayerY: 262.5,
		leftPlayerMoveSpeed: 7.5,
		leftMoveSpeedUsesLeft: 3,
		leftMoveSpeedColor: "red",
		leftShotSpeedUsesLeft: 3,
		leftShotSpeedColor: "red",
		rightPlayerName: "RIGHT_PLAYER_NAME",
		rightPlayerY: 262.5,
		rightPlayerMoveSpeed: 7.5,
		rightMoveSpeedUsesLeft: 3,
		rightMoveSpeedColor: "blue",
		rightShotSpeedUsesLeft: 3,
		rightShotSpeedColor: "blue",
		ballX: 400,
		ballY: 300,
		velocityX: 4,
		velocityY: 4,
		leftPlayerScore: 0,
		rightPlayerScore: 0,
		gameFinished: false
	}

	handleConnection(client: any, ...args: any[]): any {
		if (args[0].url.includes("game")) {
			const gameID = args[0].url.replace(/[^0-9]/g, "");

			if (!connectedClients[gameID]) {
				connectedClients[gameID] = [];
				allGameStates[gameID] = [];
				allGameStates[gameID].push(this.gameState);		//Assign default gameState
			}
			connectedClients[gameID].push(client);				//Add client to gameID
			activeGameIDs.push(gameID);							//Add gameID to active IDs

			console.log('game ', gameID, ' has ', connectedClients[gameID].length, 'users');
		}
	}

	handleDisconnect(client: any): any {
		let index;

		activeGameIDs.forEach(function (gameID) {
			if (connectedClients[gameID]) {
				if ((index = connectedClients[gameID].indexOf(client)) != -1) {
					connectedClients[gameID].splice(index, 1);
					console.log('returnkey captured');
				}
				if (!connectedClients[gameID].length) {
					console.log('end of game');
					connectedClients.splice(gameID, 1);
					activeGameIDs.splice(gameID, 1);
				}
			}
		});
		console.log('Game: client disconnected');
	}

	afterInit(server: any): any {
		console.log('GameGateway init');
	}

	@SubscribeMessage("newConnection") //what is it used for?
	handleNewConnection(client: any, data: any): WsResponse<number> {
		let gameID = data;

		if (connectedClients[gameID])
			return ({ event: 'newConnection', data: connectedClients[gameID].length });
		else
			return ({ event: 'newConnection', data: 0 });
	}

	@SubscribeMessage("updateLeftPlayer")
	updateLeftPlayer(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].leftPlayerY = data[1];
		const response = JSON.stringify({ event: 'updateLeftPlayer', data: data });
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("updateRightPlayer")
	updateRightPlayer(client: any, data: any): void {
		let gameID = data[0]

		this.gameState.rightPlayerY = data[1];
		const response = JSON.stringify({ event: 'updateRightPlayer', data: data });
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("activateBall")
	activateBall(client: any, data: any): void {
		let gameID = data;

		const response = JSON.stringify({
			event: 'activateBall',
			data: [ allGameStates[gameID][0].leftPlayerY, allGameStates[gameID][0].leftPlayerMoveSpeed, allGameStates[gameID][0].leftMoveSpeedUsesLeft,
				allGameStates[gameID][0].leftMoveSpeedColor, allGameStates[gameID][0].rightPlayerY, allGameStates[gameID][0].rightPlayerMoveSpeed,
				allGameStates[gameID][0].rightMoveSpeedUsesLeft, allGameStates[gameID][0].rightMoveSpeedColor, allGameStates[gameID][0].ballX,
				allGameStates[gameID][0].ballY, allGameStates[gameID][0].velocityX, allGameStates[gameID][0].velocityY, allGameStates[gameID][0].leftPlayerScore,
				allGameStates[gameID][0].rightPlayerScore, allGameStates[gameID][0].leftPlayerName, allGameStates[gameID][0].rightPlayerName]
		});
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("updateBall")
	updateBall(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].ballX = data[1];
		allGameStates[gameID][0].ballY = data[2];
		allGameStates[gameID][0].velocityX = data[3];
		allGameStates[gameID][0].velocityY = data[4];
		const response = JSON.stringify({ event: 'updateBall', data: data }); //data is different now
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("leftPlayerScored")
	leftPlayerScored(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].leftPlayerScore = data[1];
		const response = JSON.stringify({ event: 'leftPlayerScored', data: data }); //data is different now
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("rightPlayerScored")
	rightPlayerScored(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].rightPlayerScore = data[1];
		const response = JSON.stringify({ event: 'rightPlayerScored', data: data }); //data is different now
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("gameFinished")
	gameFinished(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].gameFinished = data[1];
		const response = JSON.stringify({event: 'gameFinished', data: data}); //data is different now
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("leftPlayerSpeedPowerUp")
	leftPlayerSpeedPowerUp(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].leftPlayerMoveSpeed = data[1];
		allGameStates[gameID][0].leftMoveSpeedUsesLeft = data[2];
		allGameStates[gameID][0].leftMoveSpeedColor = data[3];
		const response = JSON.stringify({event: 'leftPlayerSpeedPowerUp', data: data}) //data is different now
		connectedClients[gameID].forEach(c => {
			c.send(response);
		})
	}

	@SubscribeMessage("rightPlayerSpeedPowerUp")
	rightPlayerSpeedPowerUp(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].rightPlayerMoveSpeed = data[1];
		allGameStates[gameID][0].rightMoveSpeedUsesLeft = data[2];
		allGameStates[gameID][0].rightMoveSpeedColor = data[3];
		const response = JSON.stringify({event: 'rightPlayerSpeedPowerUp', data: data})
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("leftPlayerShotPowerUp")
	leftPlayerShotPowerUp(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].leftShotSpeedUsesLeft = data[1];
		allGameStates[gameID][0].leftShotSpeedColor = data[2];
		const response = JSON.stringify({event: 'leftPlayerShotPowerUp', data: data})
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("rightPlayerShotPowerUp")
	rightPlayerShotPowerUp(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].rightShotSpeedUsesLeft = data[1];
		allGameStates[gameID][0].rightShotSpeedColor = data[2];
		const response = JSON.stringify({event: 'rightPlayerShotPowerUp', data: data})
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("resetLeftPlayerShotPowerUp")
	resetLeftPlayerShotPowerUp(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].leftShotSpeedColor = data[1];
		const response = JSON.stringify({event: 'resetLeftPlayerShotPowerUp', data: data})
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("resetRightPlayerShotPowerUp")
	resetRightPlayerShotPowerUp(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].rightShotSpeedColor = data[1];
		const response = JSON.stringify({event: 'resetRightPlayerShotPowerUp', data: data})
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("setLeftPlayerName")
	setLeftPlayerName(client: any, data: any): void {
		console.log(data);

		let gameID = data[0];

		allGameStates[gameID][0].leftPlayerName = data[1];
	}

	@SubscribeMessage("setRightPlayerName")
	setRightPlayerName(client: any, data: any): void {
		let gameID = data[0];

		allGameStates[gameID][0].rightPlayerName = data[1];
	}

	@SubscribeMessage("leaveGame")
	leaveGame(client: any, data: any): void {
		let gameID = data[0];

		const response = JSON.stringify({event: 'leaveGame', data: data})
		connectedClients[gameID].forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("finishGame")
	finishGame(client: any, data: any): void {
		let gameID = data;

		allGameStates[gameID][0].leftPlayerName = "LEFT_PLAYER_NAME";
		allGameStates[gameID][0].leftPlayerY = 262.5;
		allGameStates[gameID][0].leftPlayerMoveSpeed = 7.5;
		allGameStates[gameID][0].leftMoveSpeedUsesLeft = 3;
		allGameStates[gameID][0].leftMoveSpeedColor = "red";
		allGameStates[gameID][0].leftShotSpeedUsesLeft = 3;
		allGameStates[gameID][0].leftShotSpeedColor = "red";
		allGameStates[gameID][0].rightPlayerName = "RIGHT_PLAYER_NAME";
		allGameStates[gameID][0].rightPlayerY = 262.5;
		allGameStates[gameID][0].rightPlayerMoveSpeed = 7.5;
		allGameStates[gameID][0].rightMoveSpeedUsesLeft = 3;
		allGameStates[gameID][0].rightMoveSpeedColor = "blue";
		allGameStates[gameID][0].rightShotSpeedUsesLeft = 3;
		allGameStates[gameID][0].rightShotSpeedColor = "blue";
		allGameStates[gameID][0].ballX = 400;
		allGameStates[gameID][0].ballY = 300;
		allGameStates[gameID][0].velocityX = 4;
		allGameStates[gameID][0].velocityY = 4;
		allGameStates[gameID][0].leftPlayerScore = 0;
		allGameStates[gameID][0].rightPlayerScore = 0;
		allGameStates[gameID][0].gameFinished = false;
	}
}
