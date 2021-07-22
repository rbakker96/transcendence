import React, {Component} from 'react';
import {Link} from "react-router-dom"
import "./stylesheets/stats.css"

type StatsProps = {
	leftPlayerName: string
	leftPlayerScore: number
	rightPlayerName: string
	rightPlayerScore: number
	winner: string
}

class Stats extends Component<StatsProps> {

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
					<Link to={'/profile'} type="button" className="w-100 btn btn-lg btn-primary">Close game</Link>
				</div>
			</div>

		);
	}
}

export default Stats;