import React, {Component, SyntheticEvent} from "react";
import axios from 'axios';

import './stylesheets/TwoFactor.css'
import logo from "./img/42_logo.svg";


class LoginTwoFactor extends Component {
    code = '';

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', {
            code: this.code,
        }).then(res => {
            console.log(res);
        });

    }

    render() {
        return (
            <main className="TwoFactor_component">
                <form onSubmit={this.submit}>
                    <img className="mb-4" src={logo} alt="logo" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal">Please enter validation code</h1>

                    <div className="form-floating">
                        <input required className="form-control" id="floatingInput" placeholder="12345"
                               onChange={e => this.code = e.target.value}/>
                        <label htmlFor="floatingInput">authentication code</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>
        )
    }
}

export default LoginTwoFactor
