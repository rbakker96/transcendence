import React, {SyntheticEvent, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom"
import './stylesheets/Profile.css'
import axios from "axios";
import {GameModel} from "../../models/Game.model";

const PublicProfile = (props: any) => {
    const [notAvailable, setNotAvailable] = useState(false);
    const [privateGame, setprivateGame] = useState(false);
    const [games, setGames] = useState([]);
    const [wins, setWins] = useState(0);
    const [loses, setLoses] = useState(0);
    const [rank, setRank] = useState('');
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [unauthorized, setUnauthorized] = useState(false);
    const [user, setUser] = useState({
        username: '',
        avatar: '',
        id: 0,
    });

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
            try {
                const {data} = await axios.post('publicUserData', {id: props.location.state.usersData.id});
                setUser(data);
            }
            catch (err) {setUnauthorized(true);}
        }
        getUser();
    }, [props.location.state.usersData.id]);

    useEffect(() => {
        const getGameData = async () => {
            try {
                const {data} = await axios.get('/allGameData');
                setGames(data);
            }
            catch (err) {setUnauthorized(true);}
        }
        getGameData();
    }, []);

    useEffect(() => {
        let counter = 0;

        const getPlayedGames = async () => {
            games.filter((game: GameModel) => !game.active && (game.playerOne === user.id || game.playerTwo === user.id)).map((gameData: GameModel) =>
                counter++
            )
            setGamesPlayed(counter);
        }
        getPlayedGames();
    }, [user.id, games]);

    useEffect(() => {
        let counter = 0;

        const getGamesWon = async () => {
            games.filter((game: GameModel) => !game.active && game.winner === user.id ).map((gameData: GameModel) =>
                counter++
            )
            setWins(counter);
        }
        getGamesWon();
    }, [user.id, games]);

    useEffect(() => {
        let counter = 0;

        const getGamesLost = async () => {
            games.filter((game: GameModel) => !game.active && game.loser === user.id ).map((gameData: GameModel) =>
                counter++
            )
            setLoses(counter);
        }
        getGamesLost();
    }, [user.id, games]);

    useEffect(() => {
        let rank = 'ROOKIE'

        const getRank = async () => {
            if (wins >= 5)
                rank = 'CHALLENGER';
            if (wins >= 10)
                rank = 'RISING STAR';
            if (wins >= 15)
                rank = 'ENDBOSS';
            setRank(rank);
        }
        getRank();
    }, [user.id, games, wins]);


    const sendGameInvite = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();

        try {
            await axios.put('sendGameInvite', {id});
            setprivateGame(true);
        }
        catch (err) { setNotAvailable(true); }
    }


    if (unauthorized)
        return <Redirect to={'/'}/>;

    if (privateGame)
        return <Redirect to={{pathname:"/WaitingRoom", state: "private"}}/>;

    return (
        <div className="container profilepage">
            <div className="row profile">
                <div className="col-md-12">
                    <div className="profile-sidebar">
                        <div className="profile-userpic">
                            <img src={`${user?.avatar}`} className="img-responsive" alt=""/>
                        </div>

                        <div className="profile-usertitle">
                            <div className="profile-usertitle-job">{user?.username}</div>
                        </div>

                        {   notAvailable?
                            <div>
                                <p className="notAvailable" >Sorry the private game room is full, please try again later.</p>
                            </div>
                            :
                            <p/>  }


                        <div className="profile-userbuttons">
                            <Link to={`/profile`} type="button" className="btn btn-success btn-sm">Return to own profile</Link>
                            <button onClick={(e) => {sendGameInvite(e, user.id)}} type="button" className="btn btn-success btn-sm">Invite for private game</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="row profile-content">
                        <div className="col-md-4 box-info">
                            <div className="row">
                                <div className="col-md-12 title"><h3>PLAYER STATISTICS</h3></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-5 value"><p>{rank}</p></div>
                                <div className="col-md-7 desc"><p>Rank</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>{wins}</p></div>
                                <div className="col-md-10 desc"><p>Wins</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>{loses}</p></div>
                                <div className="col-md-10 desc"><p>Loses</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>{gamesPlayed}</p></div>
                                <div className="col-md-10 desc"><p>Games played</p></div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-7 ">
                            <div className="row">
                                <div className="col-md-12 title"><h3>MATCH HISTORY</h3></div>
                            </div>
                            <div className="row ranking">

                                <table>
                                    <thead>
                                    <tr>
                                        <th>GAME ID</th>
                                        <th>Player</th>
                                        <th> - </th>
                                        <th>player</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {games.filter((game: GameModel) => !game.active && (game.playerOne === user.id || game.playerTwo === user.id)).map((gameData: GameModel) =>
                                        <tr key={gameData.gameID}>
                                            <td>#{gameData.gameID}</td>
                                            <td>{gameData.playerOneUsername} - {gameData.playerOneScore}</td>
                                            <td> vs </td>
                                            <td>{gameData.playerTwoScore} - {gameData.playerTwoUsername}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PublicProfile
