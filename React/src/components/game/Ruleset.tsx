import React, {Component, SyntheticEvent} from "react";
import './stylesheets/Ruleset.css';

type RulesetProps = {
    websocket: WebSocket;
    gameID: number;
    role: string;
}

class Ruleset extends Component<RulesetProps> {

    onClick = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log('leaveGame send');
        this.props.websocket.send(JSON.stringify({ event: 'leaveGame', data: [this.props.gameID, this.props.role]}))
    }

    render() {
        return (
            <div className="gameAddOn">
                <div className="leaveDiv">
                    <button onClick={this.onClick} type="button" className="w-100 btn btn-lg btn-primary leaveButton">Leave game</button>
                </div>
                <div className="ruleSet">
                    <h3>Rule set</h3>
                    <ul>
                        <li>First to 10 wins the game</li>
                        <li>If you leave, you lose the game</li>
                        <li>'W' key to move up</li>
                        <li>'S' key to move down</li>
                        <li>'J' key to increase peddle speed --DELUXE--</li>
                        <li>'K' key to increase shooting speed --DELUXE--</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Ruleset;