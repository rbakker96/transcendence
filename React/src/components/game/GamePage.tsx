import React, {useEffect, useState} from 'react';
import Game from "./Game";
import axios from "axios";
import {Redirect} from "react-router-dom";

function GamePage(props : any)
{
	const [role, setRole] = useState('');
	const [unauthorized, setUnauthorized] = useState(false);
	const [gameID, setGameID] = useState(0);
	const [leftPlayerID, setLeftPlayerID] = useState(0);
	const [leftPlayerName, setLeftPlayerName] = useState("");
	const [rightPlayerID, setRightPlayerID] = useState(0);
	const [rightPlayerName, setRightPlayerName] = useState("");

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

		const gameDataSetup = () => {
			try {
				if (mounted) {
					setGameID(props.location.state.gameData.gameID);
					setLeftPlayerID(props.location.state.gameData.playerOne);
					setLeftPlayerName(props.location.state.gameData.playerOneUsername);
					setRightPlayerID(props.location.state.gameData.playerTwo);
					setRightPlayerName(props.location.state.gameData.playerTwoUsername)
				}
			}
			catch(err){if(mounted) setUnauthorized(true);}
		}
		gameDataSetup();
		return () => {mounted = false;}
	}, [props]);

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
	}, [props]);

	if (unauthorized)
		return <Redirect to={'/'}/>;

	return (
		<Game
			gameID={gameID}
			role={role}
			leftPlayerID = {leftPlayerID}
			leftPlayerName={leftPlayerName}
			rightPlayerID = {rightPlayerID}
			rightPlayerName={rightPlayerName}
			specialGame={false}
			mapStyle={"game"}
			color={"white"}
		/>
	);
}

export default GamePage;
