import React, { useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/PublicProfilesOverview.css'
import { User } from "../../models/User.model";

const PublicProfilesOverview = () => {
    const [users, setUsers] = useState([]);
    const [unauthorized, setUnauthorized] = useState(false);
    const [user, setUser] = useState({id: 0,});

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

        const getUsers = async () => {
            try {
                const {data} = await axios.get('users');
                setUsers(data);
            }
            catch (err) {setUnauthorized(true);}
        }
        getUsers();
    }, []);


    if (unauthorized)
        return <Redirect to={'/'}/>;

    return (
        <main className="PublicProfiles_component">
            <div className="publicProfiles">
                <img className="mb-4" src={logo} alt="logoGame" width="72" height="57"/>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        {users.filter((users: User) => users.id !== user.id).map((usersData: User) =>
                            <tr key={usersData.id} className="usertable">
                            <td><img src={`${usersData?.avatar}`} className="img-responsive avatarIMG" alt=""/></td>
                            <td>{usersData.username}</td>
                            <td><Link to={{pathname:"/publicProfile", state: {usersData}}} type="button" className="btn btn-success">See profile</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default PublicProfilesOverview
