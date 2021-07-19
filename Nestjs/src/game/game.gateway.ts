import {
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from '@nestjs/websockets';

import { Server } from 'ws';

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

//ADD POWERUPS TO BACKEND

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
		this.numberOfPlayers++;
		console.log('new client connected');
	}

	handleDisconnect(client: any): any {
		this.numberOfPlayers--;
		if (this.numberOfPlayers === 2) {
			this.gameState = {
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
		}
		console.log('client disconnected');
	}

	afterInit(server: any): any {
		console.log('GameGateway init');
	}

	@SubscribeMessage("newConnection")
	handleNewConnection(client: any, data: any): WsResponse<number> {
		return ({ event: 'newConnection', data: this.numberOfPlayers });
	}

	@SubscribeMessage("updateLeftPlayer")
	updateLeftPlayer(client: any, data: any): void {
		this.gameState.leftPlayerY = data;
		const response = JSON.stringify({ event: 'updateLeftPlayer', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("updateRightPlayer")
	updateRightPlayer(client: any, data: any): void {
		this.gameState.rightPlayerY = data;
		const response = JSON.stringify({ event: 'updateRightPlayer', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("activateBall")
	activateBall(client: any, data: any): void {
		const response = JSON.stringify({
			event: 'activateBall',
			data: [ this.gameState.leftPlayerY, this.gameState.leftPlayerMoveSpeed, this.gameState.leftMoveSpeedUsesLeft,
					this.gameState.leftMoveSpeedColor, this.gameState.rightPlayerY, this.gameState.rightPlayerMoveSpeed,
					this.gameState.rightMoveSpeedUsesLeft, this.gameState.rightMoveSpeedColor, this.gameState.ballX,
					this.gameState.ballY, this.gameState.velocityX, this.gameState.velocityY, this.gameState.leftPlayerScore,
					this.gameState.rightPlayerScore, this.gameState.leftPlayerName, this.gameState.rightPlayerName]
		});
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("updateBall")
	updateBall(client: any, data: any): void {
		this.gameState.ballX = data[0];
		this.gameState.ballY = data[1];
		this.gameState.velocityX = data[2];
		this.gameState.velocityY = data[3];
		const response = JSON.stringify({ event: 'updateBall', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("leftPlayerScored")
	leftPlayerScored(client: any, data: any): void {
		this.gameState.leftPlayerScore = data;
		const response = JSON.stringify({ event: 'leftPlayerScored', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("rightPlayerScored")
	rightPlayerScored(client: any, data: any): void {
		this.gameState.rightPlayerScore = data;
		const response = JSON.stringify({ event: 'rightPlayerScored', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("gameFinished")
	gameFinished(client: any, data: any): void {
		this.gameState.gameFinished = data;
		const response = JSON.stringify({event: 'gameFinished', data: data});
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("leftPlayerSpeedPowerUp")
	leftPlayerSpeedPowerUp(client: any, data: any): void {
		this.gameState.leftPlayerMoveSpeed = data[0];
		this.gameState.leftMoveSpeedUsesLeft = data[1];
		this.gameState.leftMoveSpeedColor = data[2];
		const response = JSON.stringify({event: 'leftPlayerSpeedPowerUp', data: data})
		this.server.clients.forEach(c => {
			c.send(response);
		})
	}

	@SubscribeMessage("rightPlayerSpeedPowerUp")
	rightPlayerSpeedPowerUp(client: any, data: any): void {
		this.gameState.rightPlayerMoveSpeed = data[0];
		this.gameState.rightMoveSpeedUsesLeft = data[1];
		this.gameState.rightMoveSpeedColor = data[2];
		const response = JSON.stringify({event: 'rightPlayerSpeedPowerUp', data: data})
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("leftPlayerShotPowerUp")
	leftPlayerShotPowerUp(client: any, data: any): void {
		this.gameState.leftShotSpeedUsesLeft = data[0];
		this.gameState.leftShotSpeedColor = data[1];
		const response = JSON.stringify({event: 'leftPlayerShotPowerUp', data: data})
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("rightPlayerShotPowerUp")
	rightPlayerShotPowerUp(client: any, data: any): void {
		this.gameState.rightShotSpeedUsesLeft = data[0];
		this.gameState.rightShotSpeedColor = data[1];
		const response = JSON.stringify({event: 'rightPlayerShotPowerUp', data: data})
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("resetLeftPlayerShotPowerUp")
	resetLeftPlayerShotPowerUp(client: any, data: any): void {
		this.gameState.leftShotSpeedColor = data[0];
		const response = JSON.stringify({event: 'resetLeftPlayerShotPowerUp', data: data})
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("resetRightPlayerShotPowerUp")
	resetRightPlayerShotPowerUp(client: any, data: any): void {
		this.gameState.rightShotSpeedColor = data[0];
		const response = JSON.stringify({event: 'resetRightPlayerShotPowerUp', data: data})
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("setLeftPlayerName")
	setLeftPlayerName(client: any, data: any): void {
		this.gameState.leftPlayerName = data;
	}

	@SubscribeMessage("setRightPlayerName")
	setRightPlayerName(client: any, data: any): void {
		this.gameState.rightPlayerName = data;
	}
}