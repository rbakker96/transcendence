import React, { useEffect, useState} from 'react';
import Game from "./Game";
import './stylesheets/game.css';
import axios from "axios";
import {Redirect} from "react-router-dom";


function SpecialGamePage (props: any) {
	const [role, setRole] = useState('');
	const [mapArray, setMapArray] = useState(["red", "blue", "green"]);
	const [mapColorIndex, setmapColorIndex] = useState(Math.floor(Math.random() * 3));
	const [playerColorIndex, setplayerColorIndex] = useState(0);
	const [unauthorized, setUnauthorized] = useState(false);
	const [user, setUser] = useState({username: '', id: 0,});

	useEffect(() => {
		let mounted = true;

		const authorization = async () => {
			try { await axios.get('userData'); }
			catch(err){
				if(mounted)
					setUnauthorized(true);
			}
		}
		authorization();
		return () => {mounted = false;}
	}, []);

	useEffect(() => {
		const getUser = async () => {
			const {data} = await axios.get('userData')
			setUser(data);
			console.log(data);
		}
		getUser();
	}, []);

	useEffect(() => {
		const getGameData = async () => {
			if (user.id === props.playerOne) {
				setRole('leftPlayer');
			}
			else if (user.id === props.playerTwo) {
				setRole('rightPlayer');
			}
			else {
				setRole('viewer');
			}
		}
		getGameData();
	}, [user.id, props.playerOne, props.playerTwo]);

	useEffect(() => {
		const calcPlayerColor = async (index: number) => {
			let color= ((index - 1 === -1) ? 2 : index - 1);
			setplayerColorIndex(color);
		}
		calcPlayerColor(mapColorIndex);
	}, [mapColorIndex]);


	if (unauthorized)
		return <Redirect to={'/'}/>;

	return (
		<Game
			gameID={props.gameID}
			role={role}
			leftPlayerName={props.playerOneUsername}
			rightPlayerName={props.playerTwoUsername}
			specialGame={true}
			mapStyle={mapArray[mapColorIndex]}
			color={mapArray[playerColorIndex]}
		/>
	);
}

export default SpecialGamePage;


// class SpecialGamePage extends Component {
// 	calcPlayerColor(index: number): number {
// 		return ((index - 1 === -1) ? 2 : index - 1);
// 	}
//
// 	render() {
// 		const mapArray = ["red", "blue", "green"];
// 		const mapColorIndex = Math.floor(Math.random() * 3);
// 		const playerColorIndex = this.calcPlayerColor(mapColorIndex);
//
// 		return (
// 			<Game
// 				specialGame={true}
// 				mapStyle={mapArray[mapColorIndex]}
// 				color={mapArray[playerColorIndex]}
// 			/>
// 		);
// 	}
// }

