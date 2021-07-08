import React, {Component} from 'react';

type PlayerProps = {
	color: string
	playerX: number
	playerY: number
	playerWidth: number
	playerHeight: number
	gameWidth: number
	gameHeight: number
}

class Player extends Component<PlayerProps> {
	stylePlayerPaddle(): any {
		return {
			width: `${this.props.playerWidth}px`,
			height: `${this.props.playerHeight}px`,
			backgroundColor: `${this.props.color}`,
			marginLeft: `${this.props.playerX}px`,
			position: "absolute",
			top: `${this.props.playerY}px`,
			content: ""
		};
	}

	render() {
		const paddleStyle = this.stylePlayerPaddle();
		return (
			<div>
				<div style = {paddleStyle} />
			</div>
		);
	}
}

export default Player;