import React, {Component} from "react";
import PowerUp from "./PowerUp";
import './stylesheets/game.css';

type SpecialGameProps = {
	specialGame: boolean
	leftMoveSpeedUsesLeft: number
	leftMoveSpeedColor: string
	leftShotSpeedUsesLeft: number
	leftShotSpeedColor: string
	rightMoveSpeedUsesLeft: number
	rightMoveSpeedColor: string
	rightShotSpeedUsesLeft: number
	rightShotSpeedColor: string
}

class PowerUpBar extends Component<SpecialGameProps> {

	render() {
		if (this.props.specialGame) {
			return (
				<div className="powerUpsBar">
					<PowerUp
						name={"+ move speed (J)"}
						color={this.props.leftMoveSpeedColor}
						usesLeft={this.props.leftMoveSpeedUsesLeft}
					/>
					<PowerUp
						name={"+ shot speed (K)"}
						color={this.props.leftShotSpeedColor}
						usesLeft={this.props.leftShotSpeedUsesLeft}
					/>
					<PowerUp
						name={"+ move speed (J)"}
						color={this.props.rightMoveSpeedColor}
						usesLeft={this.props.rightMoveSpeedUsesLeft}
					/>
					<PowerUp
						name={"+ shot speed (K)"}
						color={this.props.rightShotSpeedColor}
						usesLeft={this.props.rightShotSpeedUsesLeft}
					/>
				</div>
			);
		} else {
			return null
		}
	}
}

export default PowerUpBar;