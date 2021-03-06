import React, {Component} from 'react';
import Player from "./Player";
import Ball from "./Ball";
import Scoreboard from "./Scoreboard";
import Stats from "./Stats";
import PowerUpBar from "./PowerUpBar";

import './stylesheets/game.css';
import axios from "axios";
import Ruleset from "./Ruleset";
import {Redirect} from "react-router-dom";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 75;
const BALL_WIDTH = 10;
const BALL_HEIGHT = 10;
const LEFT_PLAYER_SCORED = 1;
const RIGHT_PLAYER_SCORED = 2;
const W_KEYCODE = 87;
const S_KEYCODE = 83;
const J_KEYCODE = 74;
const K_KEYCODE = 75;

type coordinates = {
	top: number
	bottom: number
	left: number
	right: number
}

type GameState = {
	client: any
	gameID: number
	leftPlayerName: string
	leftPlayerX: number
	leftPlayerY: number
	leftPlayerMoveSpeed: number
	leftMoveSpeedUsesLeft: number
	leftMoveSpeedColor: string
	leftShotSpeedUsesLeft: number
	leftShotSpeedColor: string
	rightPlayerName: string
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
	closeGame: boolean
	websocket: any
}

type GameProps = {
	gameID: number
	role: string
	leftPlayerID: number
	leftPlayerName: string
	rightPlayerID: number
	rightPlayerName: string
	specialGame: boolean
	mapStyle: string
	color: string
}

class Game extends Component<GameProps> {
	state: GameState = {
		client: null,											//userID from waiting room
		gameID: this.props.gameID,
		leftPlayerName: this.props.leftPlayerName,
		leftPlayerX: 10,
		leftPlayerY: GAME_HEIGHT / 2 - (PLAYER_HEIGHT / 2),
		leftPlayerMoveSpeed: 7.5,
		leftMoveSpeedUsesLeft: 3,
		leftMoveSpeedColor: "red",
		leftShotSpeedUsesLeft: 3,
		leftShotSpeedColor: "red",
		rightPlayerName: this.props.rightPlayerName,
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
		role: this.props.role,
		leftPlayerScore: 0,
		rightPlayerScore: 0,
		gameFinished: false,
		intervalID: 0,
		closeGame: false,
		websocket: new WebSocket( `ws://localhost:8000/game:${this.props.gameID}`)
	}

	wKeyPressed: boolean = false;
	sKeyPressed: boolean = false;
	jKeyPressed: boolean = false;
	kKeyPressed: boolean = false;
	isMountedVal: boolean = false;

	constructor(props: any) {
		super(props);

		this.keyDown = this.keyDown.bind(this);
		this.keyUp = this.keyUp.bind(this);
		this.ballMovement = this.ballMovement.bind(this);
		this.isMountedVal = false;
	}

	keyDown(event: any) {
		if (event.keyCode === W_KEYCODE) {
			this.wKeyPressed = true;
		} else if (event.keyCode === S_KEYCODE) {
			this.sKeyPressed = true;
		} else if (event.keyCode === J_KEYCODE) {
			this.jKeyPressed = true;
		} else if (event.keyCode === K_KEYCODE) {
			this.kKeyPressed = true;
		}
	}

	keyUp(event: any) {
		if (event.keyCode === W_KEYCODE) {
			this.wKeyPressed = false;
		} else if (event.keyCode === S_KEYCODE) {
			this.sKeyPressed = false;
		} else if (event.keyCode === J_KEYCODE) {
			this.jKeyPressed = false;
		} else if (event.keyCode === K_KEYCODE) {
			this.kKeyPressed = false;
		}
	}

	handleQuit() {
		if (this.props.role === 'leftPlayer') {
			this.resetBall(RIGHT_PLAYER_SCORED);
			this.state.websocket.send(JSON.stringify({event: 'rightPlayerScored', data: [this.state.gameID, 10]}))
			return ;
		} else if (this.props.role === 'rightPlayer') {
			this.resetBall(LEFT_PLAYER_SCORED);
			this.state.websocket.send(JSON.stringify({ event: 'leftPlayerScored', data: [this.state.gameID, 10] }));
			return ;
		}
	}

	componentDidMount() {
		this.isMountedVal = true;

		document.addEventListener("keydown", this.keyDown, false);
		document.addEventListener("keyup", this.keyUp, false);
		window.onpopstate = () => {
			this.handleQuit();
		}
		window.onbeforeunload = () => {
			this.handleQuit();
		}

		this.state.websocket.addEventListener("open", () => {
			this.state.websocket.send(JSON.stringify({event: 'newConnection', data: this.props.gameID})); //discuss this
		});

		this.state.websocket.addEventListener("close", () => {

		});

		const updateLeftPlayer = (data: any) => {
			if (this.isMountedVal)
				this.setState({leftPlayerY: data[1]});
		}

		const updateRightPlayer = (data: any) => {
			if (this.isMountedVal)
				this.setState({rightPlayerY: data[1]});
		}

		const activateBall = (data: any) => {
			if (this.isMountedVal) {
				this.setState({leftPlayerY: data[0]});
				this.setState({leftPlayerMoveSpeed: data[1]});
				this.setState({leftMoveSpeedUsesLeft: data[2]});
				this.setState({leftMoveSpeedColor: data[3]});
				this.setState({rightPlayerY: data[4]});
				this.setState({rightPlayerMoveSpeed: data[5]});
				this.setState({rightMoveSpeedUsesLeft: data[6]});
				this.setState({rightMoveSpeedColor: data[7]});
				this.setState({ballX: data[8]});
				this.setState({ballY: data[9]});
				this.setState({velocityX: data[10]});
				this.setState({velocityY: data[11]});
				this.setState({leftPlayerScore: data[12]});
				this.setState({rightPlayerScore: data[13]});
				this.setState({leftPlayerName: data[14]});
				this.setState({rightPlayerName: data[15]});
				this.setState({intervalID: setInterval(this.ballMovement, 20)});
			}
		}

		const updateBall = (data: any) => {
			if (this.isMountedVal) {
				this.setState({ballX: data[1]});
				this.setState({ballY: data[2]});
				this.setState({velocityX: data[3]});
				this.setState({velocityY: data[4]});
			}
		}

		const updateRoleStateVariable = (id: number) => {
			this.state.websocket.send(JSON.stringify({event: 'setLeftPlayerName', data: [this.state.gameID, this.state.leftPlayerName]}));
			this.state.websocket.send(JSON.stringify({event: 'setRightPlayerName', data: [this.state.gameID, this.state.rightPlayerName]}));
			if (id === 4)
				this.state.websocket.send(JSON.stringify({event: 'activateBall', data: this.state.gameID}));
		}

		const resetPowerUps = () => {
			if (this.isMountedVal) {
				this.setState({leftPlayerMoveSpeed: 7.5});
				this.setState({leftMoveSpeedColor: "red"});
				this.setState({rightPlayerMoveSpeed: 7.5});
				this.setState({rightMoveSpeedColor: "blue"});
			}
		}

		const updateLeftPlayerScore = (data: any) => {
			if (this.isMountedVal) {
				this.setState({leftPlayerScore: data[1]});
				resetPowerUps();
			}
		}

		const updateRightPlayerScore = (data: any) => {
			if (this.isMountedVal) {
				this.setState({rightPlayerScore: data[1]});
				resetPowerUps();
			}
		}

		const updateLeftPlayerMoveSpeed = (data: any) => {
			if (this.isMountedVal) {
				this.setState({leftPlayerMoveSpeed: data[1]});
				this.setState({leftMoveSpeedUsesLeft: data[2]});
				this.setState({leftMoveSpeedColor: data[3]});
			}
		}

		const updateLeftPlayerShotPowerUp = (data: any) => {
			if (this.isMountedVal) {
				this.setState({leftShotSpeedUsesLeft: data[1]});
				this.setState({leftShotSpeedColor: data[2]});
			}
		}

		const resetLeftPlayerShotPowerUp = (data: any) => {
			if (this.isMountedVal) {
				this.setState({leftShotSpeedColor: data[1]});
			}
		}

		const updateRightPlayerMoveSpeed = (data: any) => {
			if (this.isMountedVal) {
				this.setState({rightPlayerMoveSpeed: data[1]});
				this.setState({rightMoveSpeedUsesLeft: data[2]});
				this.setState({rightMoveSpeedColor: data[3]});
			}
		}

		const updateRightPlayerShotPowerUp = (data: any) => {
			if (this.isMountedVal) {
				this.setState({rightShotSpeedUsesLeft: data[1]});
				this.setState({rightShotSpeedColor: data[2]});
			}
		}

		const resetRightPlayerShotPowerUp = (data: any) => {
			if (this.isMountedVal) {
				this.setState({rightShotSpeedColor: data[1]});
			}
		}

		const leaveGame = (data: any) => {
			if (data[1] === 'leftPlayer') {
				this.resetBall(RIGHT_PLAYER_SCORED);
				this.state.websocket.send(JSON.stringify({ event: 'rightPlayerScored', data: [this.state.gameID, 10] }))
				return ;
			}
			else {
				this.resetBall(LEFT_PLAYER_SCORED);
				this.state.websocket.send(JSON.stringify({ event: 'leftPlayerScored', data: [this.state.gameID, 10] }));
				return ;
			}
		}

		const finishGame = async (data: any) => {
			if (this.isMountedVal)
				this.setState({gameFinished: data[1]});

			const winnerID = (this.state.leftPlayerScore === 10 ? this.props.leftPlayerID : this.props.rightPlayerID);
			const loserID = (this.state.leftPlayerScore === 10 ? this.props.rightPlayerID : this.props.leftPlayerID);

			await axios.post('/updatePlayerStatus', {id: this.props.leftPlayerID});
			await axios.post('/updatePlayerStatus', {id: this.props.rightPlayerID});

			await axios.post('/updateGameStats', {
				gameID: this.props.gameID,
				playerOneScore: this.state.leftPlayerScore,
				playerTwoScore: this.state.rightPlayerScore,
				winner: winnerID,
				loser: loserID,
				active: false,
			});
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
			} else if (object.event === 'leftPlayerShotPowerUp') {
				updateLeftPlayerShotPowerUp(object.data);
			} else if (object.event === 'resetLeftPlayerShotPowerUp') {
				resetLeftPlayerShotPowerUp(object.data);
			} else if (object.event === 'rightPlayerSpeedPowerUp') {
				updateRightPlayerMoveSpeed(object.data);
			} else if (object.event === 'rightPlayerShotPowerUp') {
				updateRightPlayerShotPowerUp(object.data);
			} else if (object.event === 'resetRightPlayerShotPowerUp') {
				resetRightPlayerShotPowerUp(object.data);
			} else if (object.event === 'leaveGame') {
				leaveGame(object.data);
			} else if (object.event === 'gameFinished') {
				finishGame(object.data);
			}
		});
	}

	componentWillUnmount(){
		this.isMountedVal = false;

		document.removeEventListener("keydown", this.keyDown, false);
		document.removeEventListener("keyup", this.keyUp, false);
		if (this.state.gameFinished)
			this.state.websocket.close();
	}

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
			left: this.state.ballX + this.state.velocityX,
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
		let position = this.state.ballX;
		if (position + this.state.velocityX > GAME_WIDTH) {
			this.resetBall(LEFT_PLAYER_SCORED);
			return (LEFT_PLAYER_SCORED);
		} else if (position < 0) {
			this.resetBall(RIGHT_PLAYER_SCORED);
			return (RIGHT_PLAYER_SCORED);
		}
		return (0);
	}

	changeVelocityX(velocityX: number): number {
		// increase speed after first bounce
		if (velocityX === 4 || velocityX === -4) {
			velocityX = velocityX * 2;
		}
		// Remove speed increase from powerUp
		if (velocityX === 16 || velocityX === -16) {
			velocityX = velocityX / 2;
		}
		velocityX = -velocityX;
		return (velocityX);
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
		this.state.websocket.send(JSON.stringify({ event: 'updateBall', data: [this.state.gameID, GAME_WIDTH / 2, GAME_HEIGHT / 2, velocityX, velocityY] }));
	}

	sendPlayerPositionToServer(eventName: string, playerY: number): void {
		this.state.websocket.send(JSON.stringify({event: eventName, data: [this.state.gameID, playerY]}));
	}

	sendPlayerMoveSpeedToServer(eventName: string, newMoveSpeed: number, newMoveSpeedUsesLeft: number, color: string): void {
		this.state.websocket.send(JSON.stringify({event: eventName, data: [this.state.gameID, newMoveSpeed, newMoveSpeedUsesLeft, color]}));
	}

	sendShotPowerUpToServer(eventName: string, newShotPowerUpUsesLeft: number, color: string): void {
		this.state.websocket.send(JSON.stringify({event: eventName, data: [this.state.gameID, newShotPowerUpUsesLeft, color]}));
	}

	handleLeftPlayerMovement(): void {
		if (this.wKeyPressed && this.state.leftPlayerY > 0) {
			this.sendPlayerPositionToServer("updateLeftPlayer", this.state.leftPlayerY - this.state.leftPlayerMoveSpeed);
		} else if (this.sKeyPressed && this.state.leftPlayerY + PLAYER_HEIGHT + this.state.leftPlayerMoveSpeed < GAME_HEIGHT) {
			this.sendPlayerPositionToServer("updateLeftPlayer",this.state.leftPlayerY + this.state.leftPlayerMoveSpeed);
		}
		if (this.jKeyPressed && this.state.leftMoveSpeedUsesLeft > 0 && this.state.leftMoveSpeedColor !== "green") {
			this.sendPlayerMoveSpeedToServer("leftPlayerSpeedPowerUp",
				this.state.leftPlayerMoveSpeed + 7.5, this.state.leftMoveSpeedUsesLeft - 1, "green");
		}
		if (this.kKeyPressed && this.state.leftShotSpeedUsesLeft > 0 && this.state.leftShotSpeedColor !== "green") {
			this.sendShotPowerUpToServer("leftPlayerShotPowerUp", this.state.leftShotSpeedUsesLeft - 1, "green");
		}
	}

	handleRightPlayerMovement(): void {
		if (this.wKeyPressed && this.state.rightPlayerY > 0) {
			this.sendPlayerPositionToServer("updateRightPlayer", this.state.rightPlayerY - this.state.rightPlayerMoveSpeed);
		} else if (this.sKeyPressed && this.state.rightPlayerY + PLAYER_HEIGHT + this.state.rightPlayerMoveSpeed < GAME_HEIGHT) {
			this.sendPlayerPositionToServer("updateRightPlayer",this.state.rightPlayerY + this.state.rightPlayerMoveSpeed);
		}
		if (this.jKeyPressed && this.state.rightMoveSpeedUsesLeft > 0 && this.state.rightMoveSpeedColor !== "green") {
			this.sendPlayerMoveSpeedToServer("rightPlayerSpeedPowerUp",
				this.state.rightPlayerMoveSpeed + 7.5, this.state.rightMoveSpeedUsesLeft - 1, "green");
		}
		if (this.kKeyPressed && this.state.rightShotSpeedUsesLeft > 0 && this.state.rightShotSpeedColor !== "green") {
			this.sendShotPowerUpToServer("rightPlayerShotPowerUp", this.state.rightShotSpeedUsesLeft - 1, "green");
		}
	}

	applyShotPowerUp(velocityX: number, player: string): number {
		let newVelocityX: number;

		if (velocityX < 0) {
			newVelocityX = 16;
		} else {
			newVelocityX = -16;
		}
		if (player === "left") {
			this.state.websocket.send(JSON.stringify({event: 'resetLeftPlayerShotPowerUp', data: [this.state.gameID, "red"]}));
		} else if (player === "right") {
			this.state.websocket.send(JSON.stringify({event: 'resetRightPlayerShotPowerUp', data: [this.state.gameID, "blue"]}));
		}
		return (newVelocityX)
	}

	ballMovement(): void {
		let velocityX = this.state.velocityX;
		let velocityY = this.state.velocityY;

		if (this.props.role === "leftPlayer") {
			this.handleLeftPlayerMovement();
		} else if (this.props.role === "rightPlayer") {
			this.handleRightPlayerMovement();
		}
		if (this.state.leftPlayerScore === 10 || this.state.rightPlayerScore === 10) {
			clearInterval(this.state.intervalID);
			this.state.websocket.send(JSON.stringify({ event: 'gameFinished', data: [this.state.gameID, true] }));
			return ;
		}
		if (this.bouncedAgainstTopOrBottom()) {
			velocityY = -velocityY;
		}
		if (this.bouncedAgainstLeftPlayer()) {
			if (this.state.leftShotSpeedColor === "green") {
				velocityX = this.applyShotPowerUp(velocityX, "left");
			} else {
				velocityX = this.changeVelocityX(velocityX);
			}
			velocityY = this.changeVelocityY(this.state.leftPlayerY);
		} else if (this.bouncedAgainstRightPlayer()) {
			if (this.state.rightShotSpeedColor === "green") {
				velocityX = this.applyShotPowerUp(velocityX, "right");
			} else {
				velocityX = this.changeVelocityX(velocityX);
			}
			velocityY = this.changeVelocityY(this.state.rightPlayerY);
		}
		if (this.hasScored() === LEFT_PLAYER_SCORED) {
			this.state.websocket.send(JSON.stringify({ event: 'leftPlayerScored', data: [this.state.gameID, this.state.leftPlayerScore + 1] }));
			return ;
		} else if (this.hasScored() === RIGHT_PLAYER_SCORED) {
			this.state.websocket.send(JSON.stringify({ event: 'rightPlayerScored', data: [this.state.gameID, this.state.rightPlayerScore + 1] }))
			return ;
		}
		const newBallX = this.state.ballX + velocityX;
		const newBallY = this.state.ballY + velocityY;
		this.state.websocket.send(JSON.stringify({ event: 'updateBall', data: [this.state.gameID, newBallX, newBallY, velocityX, velocityY] }));
	}

	render() {
		const winner = (this.state.leftPlayerScore === 10 ? this.state.leftPlayerName : this.state.rightPlayerName);

		if (this.state.closeGame) {
			return <Redirect to={'/profile'}/>;
		}
		else if (this.state.gameFinished) {
			this.state.websocket.send(JSON.stringify({event: 'finishGame', data: [this.state.gameID]}));
			return (
				<Stats
					leftPlayerName = { this.state.leftPlayerName }
					leftPlayerScore = { this.state.leftPlayerScore }
					rightPlayerName = { this.state.rightPlayerName}
					rightPlayerScore = { this.state.rightPlayerScore }
					winner = { winner }
				/>
			);
		} else {
			return (
				<div>
					<div className={this.props.mapStyle}>
						<Player
							color = { this.props.color }
							playerX = { this.state.leftPlayerX }
							playerY = { this.state.leftPlayerY }
							playerWidth = { PLAYER_WIDTH }
							playerHeight = { PLAYER_HEIGHT }
							gameWidth = { GAME_WIDTH }
							gameHeight = { GAME_HEIGHT }
						/>
						<Player
							color = { this.props.color }
							playerX = { this.state.rightPlayerX }
							playerY = { this.state.rightPlayerY }
							playerWidth = { PLAYER_WIDTH }
							playerHeight = { PLAYER_HEIGHT }
							gameWidth = { GAME_WIDTH }
							gameHeight = { GAME_HEIGHT }
						/>
						<Ball
							color = { this.props.color }
							xPosition = { this.state.ballX }
							yPosition = { this.state.ballY }
							width = { BALL_WIDTH }
							height = { BALL_HEIGHT }
						/>
						<Scoreboard
							leftPlayerScore = { this.state.leftPlayerScore }
							leftPlayerName= { this.state.leftPlayerName }
							rightPlayerScore = { this.state.rightPlayerScore }
							rightPlayerName= { this.state.rightPlayerName }
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
					<div>
						<Ruleset
							websocket={this.state.websocket}
							gameID={this.state.gameID}
							role={this.props.role}
						/>
					</div>
				</div>
			);
		}
	}
}

export default Game;