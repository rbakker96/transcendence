import React, {useEffect, useState} from 'react';
import Game from "./Game";
import axios from "axios";
import {Redirect} from "react-router-dom";

function GamePage(props : any)
{
	const [role, setRole] = useState('');
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
			if (user.id === props.location.state.gameData.playerOne) {
				setRole('leftPlayer');
			}
			else if (user.id === props.location.state.gameData.playerTwo) {
				setRole('rightPlayer');
			}
			else {
				setRole('viewer');
			}
		}
		getGameData();
	}, [user.id, props.location.state.gameData.playerOne, props.location.state.gameData.playerTwo]);

	if (unauthorized)
		return <Redirect to={'/'}/>;

	// console.log('role', role);
	// console.log('gameID', props.location.state.gameData.gameID);
	// console.log('leftPlayerName', props.location.state.gameData.playerOneUsername);
	// console.log('rightPlayerName', props.location.state.gameData.playerTwoUsername);
	// console.log('gameID', props.location.state.gameData.gameID);

	return (
		<Game
			gameID={props.location.state.gameData.gameID}
			role={role}
			leftPlayerName={props.location.state.gameData.playerOneUsername}
			rightPlayerName={props.location.state.gameData.playerTwoUsername}
			specialGame={false}
			mapStyle={"game"}
			color={"white"}
		/>
	);
}


// class GamePage extends Component {
//
// 	render() {
// 		return (
// 			<Game
// 				specialGame={false}
// 				mapStyle={"game"}
// 				color={"white"}
// 			/>
// 		);
// 	}
// }

export default GamePage;