import React, {Component} from 'react';

type PlayerProps = {
	playerPos: number
	gameWidth: number
	gameHeight: number
}

class LeftPlayer extends Component<PlayerProps> {
	styleLeftPlayer(): any {
		return {
			width: "10px",
			height: "100px",
			backgroundColor: "white",
			marginLeft: "10px",
			position: "absolute",
			top: `${(this.props.playerPos / 100) * this.props.gameHeight}` + "px",
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