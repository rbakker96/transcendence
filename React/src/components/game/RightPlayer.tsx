import React, {Component} from 'react';

type PlayerProps = {
	playerPos: number
	gameWidth: number
	gameHeight: number
}

class RightPlayer extends Component<PlayerProps> {
	styleRightPlayer(): any {
		return {
			width: "10px",
			height: "100px",
			backgroundColor: "white",
			marginLeft: `${this.props.gameWidth - 20}` + "px",
			position: "absolute",
			top: `${(this.props.playerPos / 100) * this.props.gameHeight}` + "px",
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