import React, {Component, SyntheticEvent} from 'react';
import "./stylesheets/stats.css"

type StatsProps = {
	leftPlayerName: string
	leftPlayerScore: number
	rightPlayerName: string
	rightPlayerScore: number
	websocket: WebSocket
	gameID: number
	role: string
	winner: string
}

class Stats extends Component<StatsProps> {

	onClick = async (e: SyntheticEvent) => {
		e.preventDefault();
		console.log('leaveGame send');
		this.props.websocket.send(JSON.stringify({ event: 'closeGame', data: [this.props.gameID, this.props.role]}))
	}

	render() {
		return (
			<div className="stats">
				<div>
					<div className="playerData">
						<div className="playerStats">
							{this.props.leftPlayerName}<br></br>
							{this.props.leftPlayerScore}
						</div>
						<div className="playerStats">
							{this.props.rightPlayerName}<br></br>
							{this.props.rightPlayerScore}
						</div>
					</div>
					<div className="winner">{this.props.winner} has won the game!</div>
				</div>
				<div>
					<button onClick={this.onClick} type="button" className="w-100 btn btn-lg btn-primary">Close game</button>
				</div>
			</div>

		);
	}
}

export default Stats;