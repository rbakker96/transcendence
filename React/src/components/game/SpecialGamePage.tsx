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
		const getGameData = async () => {
			const {data} = await axios.get('userData')

			if (data.id === props.location.state.gameData.playerOne)
				setRole('leftPlayer');
			else if (data.id === props.location.state.gameData.playerTwo)
				setRole('rightPlayer');
			else
				setRole('viewer');
			setMapArray(["red", "blue", "green"]);
			setmapColorIndex(Math.floor(Math.random() * 3));
		}
		getGameData();
	}, [props.location.state.gameData.playerOne, props.location.state.gameData.playerTwo]);

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
			gameID={props.location.state.gameData.gameID}
			role={role}
			leftPlayerID = {props.location.state.gameData.playerOne}
			leftPlayerName={props.location.state.gameData.playerOneUsername}
			rightPlayerID = {props.location.state.gameData.playerTwo}
			rightPlayerName={props.location.state.gameData.playerTwoUsername}
			specialGame={true}
			mapStyle={mapArray[mapColorIndex]}
			color={mapArray[playerColorIndex]}
		/>
	);
}

export default SpecialGamePage;
