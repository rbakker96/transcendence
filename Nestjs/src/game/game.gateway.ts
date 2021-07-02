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
	leftPlayerPosition: number,
	rightPlayerPosition: number,
	ballX: number,
	ballY: number,
	velocityX: number,
	velocityY: number
}

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	numberOfPlayers: number = 0;
	gameState: gameState = {
		leftPlayerPosition: 0,
		rightPlayerPosition: 0,
		ballX: 0,
		ballY: 0,
		velocityX: 0,
		velocityY: 0
	}

	handleConnection(client: any, ...args: any[]): any {
		this.numberOfPlayers++;
		console.log('new client connected');
	}

	handleDisconnect(client: any): any {
		this.numberOfPlayers--;
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
		console.log(this.gameState.leftPlayerPosition);
		const response = JSON.stringify({ event: 'updateLeftPlayer', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("updateRightPlayer")
	updateRightPlayer(client: any, data: any): void {
		this.gameState.rightPlayerPosition = data;
		console.log(this.gameState.rightPlayerPosition);
		const response = JSON.stringify({ event: 'updateRightPlayer', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("activateBall")
	activateBall(client: any, data: any): void {
		const response = JSON.stringify({ event: 'activateBall', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}

	@SubscribeMessage("updateBall")
	updateBall(client: any, data: any): void {
		const response = JSON.stringify({ event: 'updateBall', data: data });
		this.server.clients.forEach(c => {
			c.send(response);
		});
	}
}