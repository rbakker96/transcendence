import React, {Component} from 'react';

type ScoreboardProps = {
	leftPlayerScore: number
	leftPlayerName: string
	rightPlayerScore: number
	rightPlayerName: string
}

class Scoreboard extends Component<ScoreboardProps> {
	styleScore(): any {
		return {
			color: "white",
			textAlign: "center",
			fontSize: "40px",
			pointerEvents: "none",
			userSelect: "none",
			displayBlock: "inline",
			display: "flex",
			justifyContent: "space-between"
		};
	}

	render() {
		const score = this.styleScore();
		return (
			<div style = {score}>
				<p className={"playerName"}>{this.props.leftPlayerName}</p>
				<p>{this.props.leftPlayerScore.toString()} - {this.props.rightPlayerScore.toString()}</p>
				<p className={"playerName"}>{this.props.rightPlayerName}</p>
			</div>
		);
	}
}

export default Scoreboard;