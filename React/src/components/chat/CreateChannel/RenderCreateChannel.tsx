import React, {Component, SyntheticEvent} from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Register.css'
import {User} from "../../../Models/User.model";

class RenderCreateChannel extends Component {

    ChannelName = '';
    Admin = '';
    ChannelType = true;

    res = 0;
    // adding the entire channel
    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("Kanker ding")
        this.res = await axios.post('localhost:8000/api/channels', {
            Name: this.ChannelName,
            Admin: this.Admin,
            IsPrivate: this.ChannelType
        })

    }
    // adding the channel user to the channel users class
    addChannelUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('channelusers', {
            ChannelId: this.res,
            user: this
        })

    }

    renderChannelName() {
        return (
            <div className="form-floating">
                <input required className="form-control" id="floatingInput" placeholder="name@example.com"
                       onChange={e => this.ChannelName = e.target.value}/>
                <label htmlFor="floatingInput">ChannelName</label>
            </div>
        )
    }
    renderChooseUsers() {
        return (
            <div>
                <form onSubmit={this.addChannelUser} >
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Choose Admins</option>
                        <option value="1">Harry</option> // dit moeten alle users die bestaan worden
                        <option value="2">Bert</option>
                        <option value="3">Piet</option>
                    </select>
                </form>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Add user</button>
            </div>
        )
    }

    renderChooseAdmin() {
        return (
            <div>
                <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option selected>Choose participants</option>
                    <option value="1">Harry</option>
                    <option value="2">Bert</option>
                    <option value="3">Piet</option>
                </select>
            </div>
        )
    }

    renderIsPrivate() {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                       onChange={e => this.ChannelType = false}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Private
                </label>

                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                       onChange={e => this.ChannelType = false}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Public
                </label>
            </div>
        )
    }

    renderChannelCreation() {
        return (
            <div>
                {this.renderChannelName()}
                {this.renderChooseAdmin()}
                {this.renderChooseUsers()}
                {this.renderIsPrivate()}
            </div>
        )
    }

    render() {
        return (
            <main className="Register_component">
                <form onSubmit={this.submit}>
                    <img className="mb-4" src={"./img/42_logo.svg"} alt="./img/42_logo.svg" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal">Create new Channel</h1>

                    {this.renderChannelCreation()}
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

                </form>
            </main>
        )
    }
}

export default RenderCreateChannel