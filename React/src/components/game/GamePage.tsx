import React, {Component} from 'react';
import Game from "./Game";

class GamePage extends Component {

	render() {
		return (


			<Game
				specialGame={false}
				mapStyle={"game"}
				color={"white"}
			/>
		);
	}
}

export default GamePage;