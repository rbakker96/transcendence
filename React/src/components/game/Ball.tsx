import React, {Component} from 'react';

type BallProps = {
	color: string
	xPosition: number
	yPosition: number
	width: number
	height: number
}

class Ball extends Component<BallProps> {
	styleBall(): any {
		return {
			width: `${this.props.width}px`,
			height: `${this.props.height}px`,
			backgroundColor: `${this.props.color}`,
			marginLeft: `${this.props.xPosition}px`,
			top: `${this.props.yPosition}px`,
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