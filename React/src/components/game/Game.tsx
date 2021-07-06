import React, { Component } from 'react';
import LeftPlayer from "./LeftPlayer";
import RightPlayer from "./RightPlayer";
import Ball from "./Ball";
import Scoreboard from "./Scoreboard";
import Stats from "./Stats";
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
	rightPlayerX: number
	rightPlayerY: number
	ballX: number
	ballY: number
	velocityX: number
	velocityY: number
	role: string
	leftPlayerScore: number
	rightPlayerScore: number
	gameFinished: boolean
	intervalID: any
	websocket: WebSocket
}

class Game extends Component<GameState> {
	//VARIABLES NEED TO BE INITIALIZED WITH THE CURRENT VALUE OF THE GAME, NOT ALWAYS THE DEFAULT
	state: GameState = {
		leftPlayerX: 10,
		leftPlayerY: GAME_HEIGHT / 2 - (PLAYER_HEIGHT / 2),
		rightPlayerX: GAME_WIDTH - 20,
		rightPlayerY: GAME_HEIGHT / 2 - (PLAYER_HEIGHT / 2),
		ballX: GAME_WIDTH / 2,
		ballY: GAME_HEIGHT / 2,
		velocityX: 8,
		velocityY: 4,
		role: "viewer",
		leftPlayerScore: 0,
		rightPlayerScore: 0,
		gameFinished: false,
		intervalID: 0,
		websocket: new WebSocket('ws://localhost:8000')
	}

	constructor(props: any) {
		super(props);

		this.keyDown = this.keyDown.bind(this);
		this.ballMovement = this.ballMovement.bind(this);
	}

	sendLeftPlayerPositionToServer(playerY: number) {
		this.state.websocket.send(JSON.stringify({event: 'updateLeftPlayer', data: playerY}));
	}

	onLeftPlayerButtonPress(event: any) {
		const wKeyCode = 87
		const sKeyCode = 83

		if (event.keyCode === wKeyCode && this.state.leftPlayerY > 0) {
			this.sendLeftPlayerPositionToServer(this.state.leftPlayerY - 8);
		} else if (event.keyCode === sKeyCode && this.state.leftPlayerY + PLAYER_HEIGHT + 8 < GAME_HEIGHT) {
			this.sendLeftPlayerPositionToServer(this.state.leftPlayerY + 8);
		}
	}

	sendRightPlayerPositionToServer(position: number) {
		this.state.websocket.send(JSON.stringify({event: 'updateRightPlayer', data: position}));
	}

	onRightPlayerButtonPress(event: any) {
		const wKeyCode = 87
		const sKeyCode = 83

		if (event.keyCode === wKeyCode && this.state.rightPlayerY > 0) {
			this.sendRightPlayerPositionToServer(this.state.rightPlayerY - 8);
		} else if (event.keyCode === sKeyCode && this.state.rightPlayerY + PLAYER_HEIGHT + 8 < GAME_HEIGHT) {
			this.sendRightPlayerPositionToServer(this.state.rightPlayerY + 8);
		}
	}

	keyDown(event: any) {
		if (this.state.role === "leftPlayer") {
			this.onLeftPlayerButtonPress(event);
		} else if (this.state.role === "rightPlayer") {
			this.onRightPlayerButtonPress(event);
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.keyDown, false);

		this.state.websocket.addEventListener("open", function (event) {
			this.send(JSON.stringify({event: 'newConnection'}));
		});

		this.state.websocket.addEventListener("close", function (event) {
			this.send(JSON.stringify({event: 'closeConnection'}));
		});

		// implement error

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
		}

		const updateRightPlayerScore = (score: number) => {
			this.setState({rightPlayerScore: score});
		}

		const finishGame = (data: boolean) => {
			this.setState({gameFinished: data});
		}

		this.state.websocket.addEventListener('message', function (event) {
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
			} else if (object.event === 'gameFinished') {
				finishGame(object.data);
			}
		});
	}

	bouncedAgainstTopOrBottom(): boolean {
		// returns true if it bounces against to top or bottom of the playing field
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
				leftPlayerName = { "LEFT_PLAYER_NAME" }
				leftPlayerScore = { this.state.leftPlayerScore }
				rightPlayerName = { "RIGHT_PLAYER_NAME" }
				rightPlayerScore = { this.state.rightPlayerScore }
				winner = { "WINNER" }
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
				</div>
			);
		}
	}
}

export default Game;