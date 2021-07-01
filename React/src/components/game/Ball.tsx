import React, {Component} from 'react';

type BallProps = {
	xPosition: number,
	yPosition: number
}

class Ball extends Component<BallProps> {
	styleBall(): any {
		return {
			width: "10px",
			height: "10px",
			backgroundColor: "white",
			marginLeft: `${this.props.xPosition}` + "px",
			top: `${this.props.yPosition}` + "px",
			borderRadius: "50%",
			position: "absolute",
			content: "",
		};
	}

	render() {
		const style = this.styleBall();
		return (
			<div style = {style} >
			</div>
		);
	}
}

export default Ball;