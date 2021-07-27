import React, {useEffect, useState} from 'react';
import Game from "./Game";
import axios from "axios";
import {Redirect} from "react-router-dom";

function GamePage(props : any)
{
	const [role, setRole] = useState('');
	const [unauthorized, setUnauthorized] = useState(false);

	useEffect(() => {
		let mounted = true;

		const authorization = async () => {
			try { await axios.get('userData'); }
			catch(err){if(mounted) setUnauthorized(true);}
		}
		authorization();
		return () => {mounted = false;}
	}, []);

	useEffect(() => {
		let mounted = true;

		const getGameData = async () => {
			try {
				const {data} = await axios.get('userData')
				if (mounted) {
					if (data.id === props.location.state.gameData.playerOne)
						setRole('leftPlayer');
					else if (data.id === props.location.state.gameData.playerTwo)
						setRole('rightPlayer');
					else
						setRole('viewer');
				}
			}
			catch(err){if(mounted) setUnauthorized(true);}
		}
		getGameData();
		return () => {mounted = false;}
	}, [props.location.state.gameData.playerOne, props.location.state.gameData.playerTwo]);

	if (unauthorized)
		return <Redirect to={'/'}/>;

	return (
		<Game
			gameID={props.location.state.gameData.gameID}
			role={role}
			leftPlayerID = {props.location.state.gameData.playerOne}
			leftPlayerName={props.location.state.gameData.playerOneUsername}
			rightPlayerID = {props.location.state.gameData.playerTwo}
			rightPlayerName={props.location.state.gameData.playerTwoUsername}
			specialGame={false}
			mapStyle={"game"}
			color={"white"}
		/>
	);
}

export default GamePage;
