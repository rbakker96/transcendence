import React, {Component} from 'react';

type ScoreboardProps = {
	leftPlayerScore: number
	rightPlayerScore: number
}

class Scoreboard extends Component<ScoreboardProps> {
	styleScore(): any {
		return {
			color: "white",
			textAlign: "center",
			fontSize: "40px",
			pointerEvents: "none",
			userSelect: "none"
		};
	}

	render() {
		const score = this.styleScore();
		return (
			<div style = {score}>
				{this.props.leftPlayerScore.toString()} - {this.props.rightPlayerScore.toString()}
			</div>
		);
	}
}

export default Scoreboard;