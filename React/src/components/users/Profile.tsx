import React, { Component } from "react";
import egg from "./img/egg.jpeg";

import './stylesheets/Profile.css'

class Profile extends Component {
    render() {
        return (
            <div className="container profilepage">
                <div className="row profile">
                    <div className="col-md-12">
                        <div className="profile-sidebar">
                            <div className="profile-userpic">
                                <img src={egg} className="img-responsive" alt=""/>
                            </div>

                            <div className="profile-usertitle">
                                <div className="profile-usertitle-job">-username-</div>
                            </div>

                            <div className="profile-userbuttons">
                                <button type="button" className="btn btn-success btn-sm">Game invite</button>
                                <button type="button" className="btn btn-success btn-sm">Update profile</button>
                                <button type="button" className="btn btn-success btn-sm">Message</button>
                                <button type="button" className="btn btn-danger btn-sm">Log out</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="row profile-content">
                            <div className="col-md-1"></div>
                            <div className="col-md-4 box-info">
                                <div className="row">
                                    <div className="col-md-12 title"><h3>PLAYER STATISTICS</h3></div>
                                </div>
                                <div className="row stat">
                                    <div className="col-md-2 value"><p>6</p></div>
                                    <div className="col-md-10 desc"><p>Rank</p></div>
                                </div>
                                <div className="row stat">
                                    <div className="col-md-2 value"><p>2</p></div>
                                    <div className="col-md-10 desc"><p>Wins</p></div>
                                </div>
                                <div className="row stat">
                                    <div className="col-md-2 value"><p>5</p></div>
                                    <div className="col-md-10 desc"><p>Loses</p></div>
                                </div>
                                <div className="row stat">
                                    <div className="col-md-2 value"><p>7</p></div>
                                    <div className="col-md-10 desc"><p>Games played</p></div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-4 ">
                                <div className="row">
                                    <div className="col-md-12 title"><h3>RANKING</h3></div>
                                </div>
                                <div className="row ranking">
                                    <p>1. Player x</p>
                                    <p>2. Player x</p>
                                    <p>3. Player x</p>
                                    <p>4. Player x</p>
                                    <p>5. Player x</p>
                                    <p>6. Player x</p>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Profile