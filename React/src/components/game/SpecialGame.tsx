import React, {Component} from 'react';
import Game from "./Game";
import './stylesheets/game.css';

class SpecialGame extends Component {
	render() {
		return (
			<Game
				specialGame={true}
			/>
		);
	}
}

export default SpecialGame;