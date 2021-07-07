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

class RightPlayer extends Component<PlayerProps> {
	styleRightPlayer(): any {
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
		const style = this.styleRightPlayer();
		return (
			<div style = {style} >
			</div>
		);
	}
}

export default RightPlayer;