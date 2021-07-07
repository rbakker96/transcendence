import React, {Component} from 'react';

type PlayerProps = {
	playerX: number
	playerY: number
	playerWidth: number
	playerHeight: number
	gameWidth: number
	gameHeight: number
}

class LeftPlayer extends Component<PlayerProps> {
	styleLeftPlayer(): any {
		return {
			width: `${this.props.playerWidth}px`,
			height: `${this.props.playerHeight}px`,
			backgroundColor: "white",
			marginLeft: `${this.props.playerX}px`,
			position: "absolute",
			top: `${this.props.playerY}px`,
			content: ""
		};
	}

	render() {
		const style = this.styleLeftPlayer();
		return (
			<div style = {style} >
			</div>
		);
	}
}

export default LeftPlayer;