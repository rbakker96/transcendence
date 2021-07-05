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

// NEED TO KEEP TRACK OF THE GAME STATE ON THE BACKEND AS WELL TO MAKE SURE THAT NEW VIEWERS WILL SEE THE LIVE VERSION

type gameState = {
	leftPlayerPosition: number
	rightPlayerPosition: number
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
		leftPlayerPosition: 42,
		rightPlayerPosition: 42,
		ballX: 400,
		ballY: 300,
		velocityX: 8,
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
				leftPlayerPosition: 42,
				rightPlayerPosition: 42,
				ballX: 400,
				ballY: 300,
				velocityX: 8,
				velocityY: 4,
				leftPlayerScore: 0,
				rightPlayerScore: 0,
				gameFinished: false
			}
		}
		console.log('client disconnected');
	}

	afterInit(server: any): any {
		console.log('init');
	}

	@SubscribeMessage("newConnection")
	handleNewConnection(client: any, data: any): WsResponse<number> {
		return ({ event: 'newConnection', data: this.numberOfPlayers });
	}

	@SubscribeMessage("updateLeftPlayer")
	updateLeftPlayer(client: any, data: any): void {
		this.gameState.leftPlayerPosition = data;
		const response = JSON.stringify({ event: 'updateLeftPlayer', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("updateRightPlayer")
	updateRightPlayer(client: any, data: any): void {
		this.gameState.rightPlayerPosition = data;
		const response = JSON.stringify({ event: 'updateRightPlayer', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("activateBall")
	activateBall(client: any, data: any): void {
		const response = JSON.stringify({ event: 'activateBall', data: [this.gameState.leftPlayerPosition,
																				this.gameState.rightPlayerPosition,
																				this.gameState.ballX,
																				this.gameState.ballY,
																				this.gameState.velocityX,
																				this.gameState.velocityY,
																				this.gameState.leftPlayerScore,
																				this.gameState.rightPlayerScore] });
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
		})
	}
}