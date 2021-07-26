import React, {SyntheticEvent, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom"
import './stylesheets/Profile.css'
import axios from "axios";
import {GameModel} from "../../models/Game.model";
import {User} from "../../models/User.model";

const Profile = () => {
    const [privateGame, setprivateGame] = useState(false);
    const [games, setGames] = useState([]);
    const [wins, setWins] = useState(0);
    const [loses, setLoses] = useState(0);
    const [rank, setRank] = useState('');
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [unauthorized, setUnauthorized] = useState(false);
    const [pendingInvite, setPendingInvite] = useState(false);
    const [userFriends, setUserFriends] = useState([]);
    const [user, setUser] = useState({
        username: '',
        avatar: '',
        id: 0,
        pendingInvite: false,
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
                const {data} = await axios.get('userData')
                setUser(data);
            }
            catch (err) {setUnauthorized(true);}
        }
        getUser();
    }, []);

    useEffect(() => {
        const getUserFriends = async () => {
            try {
                const {data} = await axios.get('users/userWithFriends')
                setUserFriends(data.friends);
            }
            catch (err) {setUnauthorized(true);}
        }
        getUserFriends();
    }, [user]);

    useEffect(() => {
        const getPendingInvite = async () => {
            setPendingInvite(user.pendingInvite);
        }
        getPendingInvite();
    }, [user]);

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

    const acceptGameInvite = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.put('acceptGameInvite');
            setprivateGame(true);
        }
        catch (err) {setUnauthorized(true);}
    }

    const logout = async () => {
        await axios.post('logout', {});
    }

    const deleteFriend = async (e: SyntheticEvent, userID: number, friendID: number) => {
        e.preventDefault();

        try {
            const ret = await axios.post("users/deleteFriendToUser", {
                userID: userID,
                friendID: friendID,
            });
            if (ret.status === 201)
                alert("You've removed the user as friend");
            window.location.reload();
        }
        catch (err) { setUnauthorized(true); }
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

                        {   pendingInvite?
                            <div>
                                <button onClick={acceptGameInvite} type="button" className="btn btn-sm inviteButton">Accept Game invite</button>
                            </div>
                            :
                            <p/>  }

                        <div className="profile-userbuttons">
                            <Link to={`/PlayGame`} type="button" className="btn btn-success btn-sm">Play game</Link>
                            <Link to={`/WatchGame`} type="button" className="btn btn-success btn-sm">Watch game</Link>
                            <Link to={`/chat`} type="button" className="btn btn-success btn-sm">Chat</Link>
                            <Link to={`/update`} type="button" className="btn btn-success btn-sm">Update profile</Link>
                            <Link to={`/publicProfilesOverview`} type="button" className="btn btn-success btn-sm">See public profiles</Link>
                            <Link to="/" onClick={logout} type="button" className="btn btn-danger btn-sm">Log out</Link>
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

            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-md-12 title"><h3>FRIENDS</h3></div>
                    </div>
                    <div className="row friends">

                        <table>
                            <thead className="friendTable">
                                <td></td>
                                <td>Username</td>
                                <td>Status</td>
                                <td></td>
                            </thead>
                            <tbody>
                            {userFriends.map((friend: User) =>
                                <tr key={friend.id}>
                                    <td><img src={`${friend.avatar}`} className="img-responsive friendAvatar" alt=""/></td>
                                    <td>{friend.username}</td>
                                    <td>{friend.status}</td>
                                    <td><button onClick={(e) => {deleteFriend(e, user.id, friend.id)}} type="button" className="btn btn-danger btn-sm">Remove friend</button></td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>


        </div>
    )

}

export default Profile
