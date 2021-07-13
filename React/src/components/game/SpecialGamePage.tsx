import React, {Component} from 'react';
import Game from "./Game";
import './stylesheets/game.css';

class SpecialGamePage extends Component {
	calcPlayerColor(index: number): number {
		return ((index - 1 === -1) ? 2 : index - 1);
	}

	render() {
		const mapArray = ["red", "blue", "green"];
		const mapColorIndex = Math.floor(Math.random() * 3);
		const playerColorIndex = this.calcPlayerColor(mapColorIndex);

		return (
			<Game
				specialGame={true}
				mapStyle={mapArray[mapColorIndex]}
				color={mapArray[playerColorIndex]}
			/>
		);
	}
}

export default SpecialGamePage;