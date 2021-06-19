import React, { Component } from "react";
import './stylesheets/Login.css'
import logo from "./img/42_logo.svg";

class Login extends Component {
    render() {
        return (
            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" src={logo} alt="logo" width="72" height="57"/>
                <h1 className="display-5 fw-bold">ft_transcendence</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">In order to play you need to have an account. Only 42 students are allowed to play this awesome game.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Login with 42 OAuth</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login