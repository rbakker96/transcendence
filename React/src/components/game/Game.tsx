import React, { Component } from 'react';
import LeftPlayer from "./LeftPlayer";
import RightPlayer from "./RightPlayer";
import Ball from "./Ball";
import './stylesheets/game.css';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BALL_RADIUS = 5;

type GameState = {
	leftPlayerPosition: number
	rightPlayerPosition: number
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
		leftPlayerPosition: 42,
		rightPlayerPosition: 42,
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

	sendLeftPlayerPositionToServer(position: number) {
		this.state.websocket.send(JSON.stringify({event: 'updateLeftPlayer', data: position}));
	}

	onLeftPlayerButtonPress(event: any) {
		const upperBoundary = 0
		const lowerBoundary = 84
		const wKeyCode = 87
		const sKeyCode = 83

		if (event.keyCode === wKeyCode && this.state.leftPlayerPosition > upperBoundary) {
			this.sendLeftPlayerPositionToServer(this.state.leftPlayerPosition - 2);
		} else if (event.keyCode === sKeyCode && this.state.leftPlayerPosition < lowerBoundary) {
			this.sendLeftPlayerPositionToServer(this.state.leftPlayerPosition + 2);
		}
	}

	sendRightPlayerPositionToServer(position: number) {
		this.state.websocket.send(JSON.stringify({event: 'updateRightPlayer', data: position}));
	}

	onRightPlayerButtonPress(event: any) {
		const upperBoundary = 0
		const lowerBoundary = 84
		const wKeyCode = 87
		const sKeyCode = 83

		if (event.keyCode === wKeyCode && this.state.rightPlayerPosition > upperBoundary) {
			this.sendRightPlayerPositionToServer(this.state.rightPlayerPosition - 2);
		} else if (event.keyCode === sKeyCode && this.state.rightPlayerPosition < lowerBoundary) {
			this.sendRightPlayerPositionToServer(this.state.rightPlayerPosition + 2);
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
			this.setState({leftPlayerPosition: position});
		}

		const updateRightPlayer = (position: number) => {
			this.setState({rightPlayerPosition: position});
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
		return ((this.state.ballY + BALL_RADIUS > GAME_HEIGHT) || (this.state.ballY - BALL_RADIUS < 0));

	}

	// NEEDS TO CHECK IF THE BALL HAS TOUCHED A PADDLE
	detectPlayerCollision(): boolean {
		return ((this.state.ballX + BALL_RADIUS > GAME_WIDTH) || (this.state.ballX - BALL_RADIUS < 0));
	}

	// NOW PASSING VELOCITY X & Y (DIRECTION) BACK TO SERVER, SO IT CAN BE UPDATED IN ALL CLIENTS
	ballMovement(): void {
		let speed = 5;
		let velocityX = this.state.velocityX;
		let velocityY = this.state.velocityY;

		if (this.detectYBorderCollision()) {
			velocityY =-velocityY;
		}
		if (this.detectPlayerCollision()) {
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
					playerPos = { this.state.leftPlayerPosition }
					gameWidth = { this.state.gameWidth }
					gameHeight = { this.state.gameHeight }
				/>
				<RightPlayer
					playerPos = { this.state.rightPlayerPosition }
					gameWidth = { this.state.gameWidth }
					gameHeight = { this.state.gameHeight }
				/>
				<Ball
					xPosition = { this.state.ballX }
					yPosition= { this.state.ballY }
				/>
			</div>
		);
	}
}

export default Game;