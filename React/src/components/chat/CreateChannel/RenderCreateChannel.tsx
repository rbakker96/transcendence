import React, { SyntheticEvent, useEffect, useState} from "react";
import axios from 'axios';
import '../stylesheets/Register.css'
import {User} from "../../../Models/User.model";
import {Multiselect} from "multiselect-react-dropdown";
import {ChannelUser} from "../../../Models/ChannelUser.model";


const USER_DUMMY = [
    {
        "id" : 1,
        "username": "thimo",
    },
    {
        "id" : 2,
        "username": "bert",
    },
    {
        "id" : 3,
        "username": "henk",
    },
    {
        "id" : 4,
        "username": "piet",
    }
];


function RenderCreateChannel() {

    // states for data types

    const [channelName, setChannelName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    // states for data transfer
    const [users, setUsers] = useState<Array<User>>([]);
    const [createdChannel, setCreatedChannel] = useState([]);
    const [channelUsers, setChannelUsers] = useState<Array<ChannelUser>>([]);


    useEffect(() => {
        const getUser = async () => {
            const {data} = await axios.get('users')
            setUsers(data);
        }
        getUser();
    }, []);


// dit werkt volgens mij
    let submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const {data} = await axios.post('channels', {
            Name: channelName,
            IsPrivate: isPrivate,
            Users: channelUsers
        });
        setCreatedChannel(data.id);
        console.log(data.id);
    }


    function renderChannelName() {
        return (
            <div className="form-floating">
                <input required className="form-control" id="floatingInput" placeholder="name@example.com"
                       onChange={e => setChannelName( e.target.value)}/>
                <label htmlFor="floatingInput">ChannelName</label>
            </div>
        )
    }


    function renderChooseUsers() {

        function OnSelect(selectedList: any, SelectedItem: any) {
            setChannelUsers(selectedList);
        }

        return (
            <div>
                <Multiselect
                    options={users}
                    displayValue="username" // Property name to display in the dropdown options
                    placeholder="Choose Users"
                    onSelect={OnSelect}

                />
            </div>
        )
    }

    function renderChooseAdmin() {
        return (
            <div>
                <Multiselect
                    options={USER_DUMMY}
                    displayValue="username" // Property name to display in the dropdown options
                    placeholder="Choose Admins"
                />
            </div>
        )
    }

    function renderIsPrivate() {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                       onChange={e => setIsPrivate(true)}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Private
                </label>

                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                       onChange={e => setIsPrivate(false)}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Public
                </label>
            </div>
        )
    }

    function renderChannelCreation() {
        return (
            <div>
                {renderChannelName()}
                {renderChooseAdmin()}
                {renderChooseUsers()}
                {renderIsPrivate()}
            </div>
        )
    }

    return (
        <main className="Register_component">
            <form onSubmit={submit}>
                <img className="mb-4" src={"./img/42_logo.svg"} alt="./img/42_logo.svg" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Create new Channel</h1>

                {renderChannelCreation()}
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

            </form>
        </main>
    )
}

export default RenderCreateChannel