import React, { useEffect, useState} from 'react';
import Game from "./Game";
import './stylesheets/game.css';
import axios from "axios";
import {Redirect} from "react-router-dom";

function SpecialGamePage (props: any) {
	const [role, setRole] = useState('');
	const [mapArray, setMapArray] = useState(['']);
	const [mapColorIndex, setmapColorIndex] = useState(0);
	const [playerColorIndex, setplayerColorIndex] = useState(0);
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

				if (mounted){
					if (data.id === props.location.state.gameData.playerOne)
						setRole('leftPlayer');
					else if (data.id === props.location.state.gameData.playerTwo)
						setRole('rightPlayer');
					else
						setRole('viewer');
				}
				if (mounted) setMapArray(["red", "blue", "green"]);
				if (mounted) setmapColorIndex(Math.floor(Math.random() * 3));
			}
			catch(err){if(mounted) setUnauthorized(true);}
		}
		getGameData();
		return () => {mounted = false;}
	}, [props]);

	useEffect(() => {
		let mounted = true;
		const calcPlayerColor = async (index: number) => {
			let color= ((index - 1 === -1) ? 2 : index - 1);
			if (mounted) setplayerColorIndex(color);
		}
		calcPlayerColor(mapColorIndex);
		return () => {mounted = false;}
	}, [mapColorIndex]);


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
			specialGame={true}
			mapStyle={mapArray[mapColorIndex]}
			color={mapArray[playerColorIndex]}
		/>
	);
}

export default SpecialGamePage;
