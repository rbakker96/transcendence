import React, { Component } from 'react';
import LeftPlayer from "./LeftPlayer";
import RightPlayer from "./RightPlayer";
import Ball from "./Ball";
import Scoreboard from "./Scoreboard";
import Stats from "./Stats";
import PowerUpBar from "./PowerUpBar";

import './stylesheets/game.css';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 75;
const BALL_WIDTH = 10;
const BALL_HEIGHT = 10;
const LEFT_PLAYER_SCORED = 1;
const RIGHT_PLAYER_SCORED = 2;

type coordinates = {
	top: number
	bottom: number
	left: number
	right: number
}

type GameState = {
	leftPlayerX: number
	leftPlayerY: number
	leftPlayerMoveSpeed: number
	leftMoveSpeedUsesLeft: number
	leftMoveSpeedColor: string
	leftShotSpeedUsesLeft: number
	leftShotSpeedColor: string
	rightPlayerX: number
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
	role: string
	leftPlayerScore: number
	rightPlayerScore: number
	gameFinished: boolean
	intervalID: any
	websocket: any
}

type GameProps = {
	specialGame: boolean
}

class Game extends Component<GameProps> {
	state: GameState = {
		leftPlayerX: 10,
		leftPlayerY: GAME_HEIGHT / 2 - (PLAYER_HEIGHT / 2),
		leftPlayerMoveSpeed: 7.5,
		leftMoveSpeedUsesLeft: 3,
		leftMoveSpeedColor: "red",
		leftShotSpeedUsesLeft: 3,
		leftShotSpeedColor: "red",
		rightPlayerX: GAME_WIDTH - 20,
		rightPlayerY: GAME_HEIGHT / 2 - (PLAYER_HEIGHT / 2),
		rightPlayerMoveSpeed: 7.5,
		rightMoveSpeedUsesLeft: 3,
		rightMoveSpeedColor: "blue",
		rightShotSpeedUsesLeft: 3,
		rightShotSpeedColor: "blue",
		ballX: GAME_WIDTH / 2,
		ballY: GAME_HEIGHT / 2,
		velocityX: 4,
		velocityY: 4,
		role: "viewer",
		leftPlayerScore: 0,
		rightPlayerScore: 0,
		gameFinished: false,
		intervalID: 0,
		websocket: new WebSocket("ws://localhost:8000/game")
	}

	constructor(props: any) {
		super(props);

		this.keyDown = this.keyDown.bind(this);
		this.ballMovement = this.ballMovement.bind(this);
	}

	sendPlayerPositionToServer(eventName: string, playerY: number) {
		this.state.websocket.send(JSON.stringify({event: eventName, data: playerY}));
	}

	sendPlayerMoveSpeedToServer(eventName: string, newMoveSpeed: number, newMoveSpeedUsesLeft: number, color: string) {
		this.state.websocket.send(JSON.stringify({event: eventName, data: [newMoveSpeed, newMoveSpeedUsesLeft, color]}));
	}

	onLeftPlayerButtonPress(event: any) {
		const wKeyCode = 87;
		const sKeyCode = 83;
		const jKeyCode = 74;

		if (event.keyCode === wKeyCode && this.state.leftPlayerY > 0) {
			this.sendPlayerPositionToServer("updateLeftPlayer", this.state.leftPlayerY - this.state.leftPlayerMoveSpeed);
		}
		if (event.keyCode === sKeyCode && this.state.leftPlayerY + PLAYER_HEIGHT + this.state.leftPlayerMoveSpeed < GAME_HEIGHT) {
			this.sendPlayerPositionToServer("updateLeftPlayer",this.state.leftPlayerY + this.state.leftPlayerMoveSpeed);
		}
		if (event.keyCode === jKeyCode && this.state.leftMoveSpeedUsesLeft > 0 && this.state.leftPlayerMoveSpeed < 15) {
			this.sendPlayerMoveSpeedToServer("leftPlayerSpeedPowerUp",
				this.state.leftPlayerMoveSpeed + 7.5, this.state.leftMoveSpeedUsesLeft - 1, "green");
		}
	}

	onRightPlayerButtonPress(event: any) {
		const wKeyCode = 87;
		const sKeyCode = 83;
		const jKeyCode = 74;

		if (event.keyCode === wKeyCode && this.state.rightPlayerY > 0) {
			this.sendPlayerPositionToServer("updateRightPlayer", this.state.rightPlayerY - this.state.rightPlayerMoveSpeed);
		}
		if (event.keyCode === sKeyCode && this.state.rightPlayerY + PLAYER_HEIGHT + this.state.rightPlayerMoveSpeed < GAME_HEIGHT) {
			this.sendPlayerPositionToServer("updateRightPlayer", this.state.rightPlayerY + this.state.rightPlayerMoveSpeed);
		}
		if (event.keyCode === jKeyCode && this.state.rightMoveSpeedUsesLeft > 0 && this.state.rightPlayerMoveSpeed < 15) {
			this.sendPlayerMoveSpeedToServer("rightPlayerSpeedPowerUp",
				this.state.rightPlayerMoveSpeed + 7.5, this.state.rightMoveSpeedUsesLeft - 1, "green");
		}
	}

	// NEED TO CHECK HOW TO SUPPORT MULTIPLE KEYDOWNS AT THE SAME TIME
	keyDown(event: any) {
		if (this.state.role === "leftPlayer") {
			this.onLeftPlayerButtonPress(event);
		} else if (this.state.role === "rightPlayer") {
			this.onRightPlayerButtonPress(event);
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.keyDown, false);

		this.state.websocket.addEventListener("open", () => {
			this.state.websocket.send(JSON.stringify({event: 'newConnection'}));
		});

		this.state.websocket.addEventListener("close", () => {
			this.state.websocket.send(JSON.stringify({event: 'closeConnection'}));
		});

		// implement error?

		const updateLeftPlayer = (position: number) => {
			this.setState({leftPlayerY: position});
		}

		const updateRightPlayer = (position: number) => {
			this.setState({rightPlayerY: position});
		}

		const activateBall = (data: any) => {
			this.setState({leftPlayerPosition: data[0]});
			this.setState({rightPlayerPosition: data[1]});
			this.setState({ballX: data[2]});
			this.setState({ballY: data[3]});
			this.setState({velocityX: data[4]});
			this.setState({velocityY: data[5]});
			this.setState({leftPlayerScore: data[6]});
			this.setState({rightPlayerScore: data[7]})
			this.setState({intervalID: setInterval(this.ballMovement, 20)});
		}

		const updateBall = (data: any) => {
			this.setState({ ballX: data[0] });
			this.setState({ ballY: data[1] });
			this.setState({ velocityX: data[2] });
			this.setState({ velocityY: data[3] });
		}

		// THIS NEEDS A GOOD IMPLEMENTATION, NEED TO WORK THIS OUT LATER
		const updateRoleStateVariable = (id: number) => {
			if (id == 2) {
				this.setState({role: "leftPlayer"});
			} else if (id == 4) {
				this.setState({role: "rightPlayer"});
				this.state.websocket.send(JSON.stringify({event: 'activateBall'}));
			} else {
				this.setState({role: "viewer"});
				this.state.websocket.send(JSON.stringify({event: 'activateBall'}));
			}
		}

		const updateLeftPlayerScore = (score: number) => {
			this.setState({leftPlayerScore: score});
			this.setState({leftPlayerMoveSpeed: 7.5});
			this.setState({leftMoveSpeedColor: "red"});
			this.setState({rightPlayerMoveSpeed: 7.5});
			this.setState({rightMoveSpeedColor: "blue"});
		}

		const updateRightPlayerScore = (score: number) => {
			this.setState({rightPlayerScore: score});
			this.setState({leftPlayerMoveSpeed: 7.5});
			this.setState({leftMoveSpeedColor: "red"});
			this.setState({rightPlayerMoveSpeed: 7.5});
			this.setState({rightMoveSpeedColor: "blue"});

		}

		const updateLeftPlayerMoveSpeed = (data: any) => {
			this.setState({leftPlayerMoveSpeed: data[0]});
			this.setState({leftMoveSpeedUsesLeft: data[1]});
			this.setState({leftMoveSpeedColor: data[2]});
		}

		const updateRightPlayerMoveSpeed = (data: any) => {
			this.setState({rightPlayerMoveSpeed: data[0]});
			this.setState({rightMoveSpeedUsesLeft: data[1]});
			this.setState({rightMoveSpeedColor: data[2]});
		}

		const finishGame = (data: boolean) => {
			this.setState({gameFinished: data});
		}

		this.state.websocket.addEventListener('message', function (event: { data: string; }) {
			const object = JSON.parse(event.data);
			if (object.event === 'newConnection') {
				updateRoleStateVariable(object.data);
			} else if (object.event === 'updateLeftPlayer') {
				updateLeftPlayer(object.data);
			} else if (object.event === 'updateRightPlayer') {
				updateRightPlayer(object.data);
			} else if (object.event === 'activateBall') {
				activateBall(object.data);
			} else if (object.event === 'updateBall') {
				updateBall(object.data);
			} else if (object.event === 'leftPlayerScored') {
				updateLeftPlayerScore(object.data);
			} else if (object.event === 'rightPlayerScored') {
				updateRightPlayerScore(object.data);
			} else if (object.event === 'leftPlayerSpeedPowerUp') {
				updateLeftPlayerMoveSpeed(object.data);
			} else if (object.event === 'rightPlayerSpeedPowerUp') {
				updateRightPlayerMoveSpeed(object.data);
			} else if (object.event === 'gameFinished') {
				finishGame(object.data);
			}
		});
	}

	// returns true if it bounces against to top or bottom of the playing field
	bouncedAgainstTopOrBottom(): boolean {
		return ((this.state.ballY + BALL_HEIGHT > GAME_HEIGHT) || (this.state.ballY < 0));
	}

	calcLeftPlayer(): coordinates {
		let newPlayer: coordinates = {
			top: this.state.leftPlayerY,
			bottom: this.state.leftPlayerY + PLAYER_HEIGHT,
			left: this.state.leftPlayerX,
			right: this.state.leftPlayerX + PLAYER_WIDTH
		}
		return (newPlayer);
	}

	calcRightPLayer(): coordinates {
		let newPlayer: coordinates = {
			top: this.state.rightPlayerY,
			bottom: this.state.rightPlayerY + PLAYER_HEIGHT,
			left: this.state.rightPlayerX,
			right: this.state.rightPlayerX + PLAYER_WIDTH
		}
		return (newPlayer);
	}

	calcBall(): coordinates {
		let newBall: coordinates = {
			top: this.state.ballY,
			bottom: this.state.ballY + BALL_HEIGHT,
			left: this.state.ballX,
			right: this.state.ballX + BALL_WIDTH
		}
		return (newBall);
	}

	bouncedAgainstLeftPlayer(): boolean {
		const player: coordinates = this.calcLeftPlayer();
		const ball: coordinates = this.calcBall();

		return (ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top);
	}

	bouncedAgainstRightPlayer(): boolean {
		const player: coordinates = this.calcRightPLayer();
		const ball: coordinates = this.calcBall();

		return (ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top);
	}

	hasScored(): number {
		if (this.state.ballX + BALL_WIDTH >= GAME_WIDTH) {
			return (LEFT_PLAYER_SCORED);
		} else if (this.state.ballX <= 0) {
			return (RIGHT_PLAYER_SCORED);
		}
		return (0);
	}

	changeVelocityY(playerY: number) {
		const collidePoint = (this.state.ballY - (playerY + PLAYER_HEIGHT / 2));
		const normalizeCollidePoint = collidePoint / (PLAYER_HEIGHT / 2);
		const angle = normalizeCollidePoint * Math.PI / 4;
		return (8 * Math.sin(angle));
	}

	resetBall(playerThatScored: number): void {
		let velocityX: number = 0;
		let velocityY: number = 0;

		if (playerThatScored === LEFT_PLAYER_SCORED) {
			velocityX = 4;
			velocityY = 4;
		} else if (playerThatScored === RIGHT_PLAYER_SCORED) {
			velocityX = -4;
			velocityY = -4;
		}
		this.state.websocket.send(JSON.stringify({ event: 'updateBall', data: [GAME_WIDTH / 2, GAME_HEIGHT / 2, velocityX, velocityY] }));
	}

	ballMovement(): void {
		let velocityX = this.state.velocityX;
		let velocityY = this.state.velocityY;

		if (this.state.leftPlayerScore === 10 || this.state.rightPlayerScore === 10) {
			clearInterval(this.state.intervalID);
			this.state.websocket.send(JSON.stringify({ event: 'gameFinished', data: [true] }));
			return ;
		}
		if (this.bouncedAgainstTopOrBottom()) {
			velocityY = -velocityY;
		}
		if (this.bouncedAgainstLeftPlayer()) {
			// increase speed after first bounce
			if (velocityX === 4 || velocityX === -4) {
				velocityX *= 2;
			}
			velocityX = -velocityX;
			velocityY = this.changeVelocityY(this.state.leftPlayerY);
		} else if (this.bouncedAgainstRightPlayer()) {
			// increase speed after first bounce
			if (velocityX === 4 || velocityX === -4) {
				velocityX *= 2;
			}
			velocityX = -velocityX;
			velocityY = this.changeVelocityY(this.state.rightPlayerY);
		}
		if (this.hasScored() === LEFT_PLAYER_SCORED) {
			this.state.websocket.send(JSON.stringify({ event: 'leftPlayerScored', data: this.state.leftPlayerScore + 1 }));
			this.resetBall(LEFT_PLAYER_SCORED);
			return ;
		} else if (this.hasScored() === RIGHT_PLAYER_SCORED) {
			this.state.websocket.send(JSON.stringify({ event: 'rightPlayerScored', data: this.state.rightPlayerScore + 1 }))
			this.resetBall(RIGHT_PLAYER_SCORED);
			return ;
		}
		const newBallX = this.state.ballX + velocityX;
		const newBallY = this.state.ballY + velocityY;
		this.state.websocket.send(JSON.stringify({ event: 'updateBall', data: [newBallX, newBallY, velocityX, velocityY] }));
	}

	render() {
		if (this.state.gameFinished) {
			return (
				<Stats
					leftPlayerName = { "LEFT_PLAYER_NAME" } // NEEDS LEFT PLAYER NAME
					leftPlayerScore = { this.state.leftPlayerScore }
					rightPlayerName = { "RIGHT_PLAYER_NAME" } // NEEDS RIGHT PLAYER NAME
					rightPlayerScore = { this.state.rightPlayerScore }
					winner = { "WINNER" } // NEEDS WINNER NAME
				/>
			);
		} else {
			return (
				<div className="game">
					<LeftPlayer
						playerX = { this.state.leftPlayerX }
						playerY = { this.state.leftPlayerY }
						playerWidth = { PLAYER_WIDTH }
						playerHeight = { PLAYER_HEIGHT }
						gameWidth = { GAME_WIDTH }
						gameHeight = { GAME_HEIGHT }
					/>
					<RightPlayer
						playerX = { this.state.rightPlayerX }
						playerY = { this.state.rightPlayerY }
						playerWidth = { PLAYER_WIDTH }
						playerHeight = { PLAYER_HEIGHT }
						gameWidth = { GAME_WIDTH }
						gameHeight = { GAME_HEIGHT }
					/>
					<Ball
						xPosition = { this.state.ballX }
						yPosition = { this.state.ballY }
						width = { BALL_WIDTH }
						height = { BALL_HEIGHT }
					/>
					<Scoreboard
						leftPlayerScore = { this.state.leftPlayerScore }
						rightPlayerScore = { this.state.rightPlayerScore }
					/>
					<PowerUpBar
						specialGame = {this.props.specialGame}
						leftMoveSpeedUsesLeft={this.state.leftMoveSpeedUsesLeft}
						leftMoveSpeedColor={this.state.leftMoveSpeedColor}
						leftShotSpeedUsesLeft={this.state.leftShotSpeedUsesLeft}
						leftShotSpeedColor={this.state.leftShotSpeedColor}
						rightMoveSpeedUsesLeft={this.state.rightMoveSpeedUsesLeft}
						rightMoveSpeedColor={this.state.rightMoveSpeedColor}
						rightShotSpeedUsesLeft={this.state.rightShotSpeedUsesLeft}
						rightShotSpeedColor={this.state.rightShotSpeedColor}
					/>
				</div>
			);
		}
	}
}

export default Game;
