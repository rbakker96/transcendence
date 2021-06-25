import React, {Component, SyntheticEvent} from "react";
import axios from 'axios';

import './stylesheets/Register.css'
import logo from "./img/42_logo.svg";


class Register extends Component {
    username = '';
    email = '';
    phonenumber = '';

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', {
            username: this.username,
            email: this.email,
            phonenumber: this.phonenumber,
        }, {withCredentials: true}).then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <main className="Register_component">
            <form onSubmit={this.submit}>
                <img className="mb-4" src={logo} alt="logo" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <div className="form-floating">
                    <input required className="form-control" id="floatingInput" placeholder="name@example.com"
                           onChange={e => this.username = e.target.value}/>
                    <label htmlFor="floatingInput">User name</label>
                </div>

                <div className="form-floating">
                    <input required type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                           onChange={e => this.email = e.target.value}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input type="phonenumber" className="form-control" id="floatingPassword" placeholder="Password"
                           onChange={e => this.phonenumber = e.target.value}/>
                    <label htmlFor="floatingPassword">Phonenumber</label>
                </div>

                {/*<div className="form-check">*/}
                {/*    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"*/}
                {/*           onChange={e => this.authentication = e.target.checked}/>*/}
                {/*    <label className="form-check-label" htmlFor="flexCheckDefault"><b>Two-factor authentication</b></label>*/}
                {/*</div>*/}

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
            </main>
        )
    }
}

export default Register