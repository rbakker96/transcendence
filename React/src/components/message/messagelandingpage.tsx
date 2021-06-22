import React, { Component } from "react";
import classes from "./stylesheets/Channel.module.css";
import './stylesheets/messagelandingpage.css';





class messagelandingpage extends Component{

    DummyData = [
        {
            channelID: 1,
            Name: "Epic first channel",
            admin: "thimo", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 2,
            Name: "Epic second chat",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 3,
            Name: "Epic third chat",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 4,
            Name: "Epic fourth chat",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 5,
            Name: "Epic fifth chat",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 6,
            Name: "Zieke chat ouwe",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        }
    ]

    DummyDirectMessage = [
        {
            channelID: 1,
            Name: "Epic first channel",
            admin: "thimo", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 2,
            Name: "Epic second chat",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 3,
            Name: "Epic third chat",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 4,
            Name: "Epic fourth chat",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 5,
            Name: "Epic fifth chat",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        },
        {
            channelID: 6,
            Name: "Zieke chat ouwe",
            admin: "Gijs", // this is going to become a UserID in the future
            participants: ["Thimo", "Roy", "Gijs", "Qing"],
        }
    ]

    renderChannels(){
        // hier moet de channel informatie gepast worden zodat het in een loop kan gebeure
        return (
            <ul className="list-group lijst">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {this.DummyData.map(item=>(
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                        <ul>
                            <li key={2}>{item.Name}</li>
                            <span className="badge badge-primary badge-pill">2</span>
                        </ul>
                        </div>
                    ))}
                </li>
            </ul>
        );
    }

    renderDirectMessage(){
        return (
            <ul className="list-group lijst">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {this.DummyDirectMessage.map(item=>(
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            <ul className={classes.directMessage}>
                                {item.participants.map(participants=>(
                                    <div>
                                    <li key={2}>{participants}</li>
                                    </div>))}
                            </ul>
                        </div>
                    ))}
                </li>
            </ul>
        );
    };

    render()
    {
		return (
		    <main>
			<div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
              <a href="http://localhost:8080/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <svg className="bi me-2" width="40" height="32"></svg>
                <span className="fs-4">Message options</span>
              </a>
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                    <a href="http://localhost:8080/" className="nav-link active" aria-current="page"> <svg className="bi me-2" width="16" height="16"></svg>Channels</a>
                      <div>
                          {this.renderChannels()}
                      </div>
                  </li>
                  <li>
                    <a href="http://localhost:8080/" className="nav-link text-white"><svg className="bi me-2" width="16" height="16"></svg>Direct messages</a>
                        <div>
                            {this.renderDirectMessage()}
                        </div>
                  </li>
                </ul>
            </div>
            </main>
		)
	}

}


export default messagelandingpage
