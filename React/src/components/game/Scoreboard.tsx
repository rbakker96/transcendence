import React, {Component} from 'react';

type ScoreboardProps = {
	leftPlayerScore: number
	leftPlayerName: string
	rightPlayerScore: number
	rightPlayerName: string
}

class Scoreboard extends Component<ScoreboardProps> {
	render() {
		return (
			<div className={"scoreBoard"}>
				<p className={"playerName"}>{this.props.leftPlayerName}</p>
				<p>{this.props.leftPlayerScore.toString()} - {this.props.rightPlayerScore.toString()}</p>
				<p className={"playerName"}>{this.props.rightPlayerName}</p>
			</div>
		);
	}
}

export default Scoreboard;