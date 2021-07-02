import React, { Component } from 'react';
import LeftPlayer from "./LeftPlayer";
import RightPlayer from "./RightPlayer";
import Ball from "./Ball";
import './stylesheets/game.css';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 100;
const BALL_WIDTH = 10;
const BALL_HEIGHT = 10;

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
	gameWidth: number
	gameHeight: number
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
		velocityX: 4,
		velocityY: 4,
		role: "viewer",
		gameWidth: GAME_WIDTH,
		gameHeight: GAME_HEIGHT,
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
			this.sendLeftPlayerPositionToServer(this.state.leftPlayerY - 10);
		} else if (event.keyCode === sKeyCode && this.state.leftPlayerY + PLAYER_HEIGHT < GAME_HEIGHT) {
			this.sendLeftPlayerPositionToServer(this.state.leftPlayerY + 10);
		}
	}

	sendRightPlayerPositionToServer(position: number) {
		this.state.websocket.send(JSON.stringify({event: 'updateRightPlayer', data: position}));
	}

	onRightPlayerButtonPress(event: any) {
		const wKeyCode = 87
		const sKeyCode = 83

		if (event.keyCode === wKeyCode && this.state.rightPlayerY > 0) {
			this.sendRightPlayerPositionToServer(this.state.rightPlayerY - 10);
		} else if (event.keyCode === sKeyCode && this.state.rightPlayerY + PLAYER_HEIGHT < GAME_HEIGHT) {
			this.sendRightPlayerPositionToServer(this.state.rightPlayerY + 10);
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
			setInterval(this.ballMovement, 20);
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

		this.state.websocket.addEventListener('message', function (event) {
			// console.log('Message from server ', event.data);
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
			}
		});
	}

	detectYBorderCollision(): boolean {
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

	detectLeftPlayerCollision(): boolean {
		const player: coordinates = this.calcLeftPlayer();
		const ball: coordinates = this.calcBall();

		return (ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top);
	}

	detectRightPlayerCollision(): boolean {
		const player: coordinates = this.calcRightPLayer();
		const ball: coordinates = this.calcBall();

		return (ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top);
	}

	// NEEDS TO RESET THE BALL AND UPDATE THE SCORE
	detectScore(): boolean {
		// returns true if it bounces against the backboard
		return ((this.state.ballX + BALL_WIDTH > GAME_WIDTH) || (this.state.ballX < 0));
	}

	ballMovement(): void {
		let velocityX = this.state.velocityX;
		let velocityY = this.state.velocityY;

		if (this.detectYBorderCollision()) {
			velocityY = -velocityY;
		}
		if (this.detectLeftPlayerCollision()) {
			velocityX = -velocityX;
		} else if (this.detectRightPlayerCollision()) {
			velocityX = -velocityX;
		}
		if (this.detectScore()) {
			velocityX = -velocityX;
		}
		const newBallX = this.state.ballX + velocityX;
		const newBallY = this.state.ballY + velocityY;
		this.state.websocket.send(JSON.stringify({ event: 'updateBall', data: [newBallX, newBallY, velocityX, velocityY] }));
	}

	render() {
		return (
			<div className="game">
				<LeftPlayer
					playerX = { this.state.leftPlayerX }
					playerY = { this.state.leftPlayerY }
					playerWidth = { PLAYER_WIDTH }
					playerHeight = { PLAYER_HEIGHT }
					gameWidth = { this.state.gameWidth }
					gameHeight = { this.state.gameHeight }
				/>
				<RightPlayer
					playerX = { this.state.rightPlayerX }
					playerY = { this.state.rightPlayerY }
					playerWidth = { PLAYER_WIDTH }
					playerHeight = { PLAYER_HEIGHT }
					gameWidth = { this.state.gameWidth }
					gameHeight = { this.state.gameHeight }
				/>
				<Ball
					xPosition = { this.state.ballX }
					yPosition = { this.state.ballY }
					width = { BALL_WIDTH }
					height = { BALL_HEIGHT }
				/>
			</div>
		);
	}
}

export default Game;