import {Component} from "react";

function message(props: number)
{

}
class Message extends Component{
    constructor(props : number)
    {
        super(props);
        this.handleMessage = this.handleMessage.bind(this);
        this.setState({isLoggedIn: false});
    }

    handleMessage() {
        this.setState({isLoggedIn: true});
    }

    dummyRender()
    {
        return <div> test data</div>;
    };
    // channel id should be passed as a parameter
    render()
    {
        // @ts-ignore
        const isActive = this.state.isLoggedIn;
        let chatToRender;
        if (isActive)
            chatToRender = this.dummyRender();
        return (<div>
            {chatToRender};
        </div>);
    }
}

export default Message