import React, {Component} from 'react';

type PowerUpProps = {
	name: string
	color: string
	usesLeft: number
}

class PowerUp extends Component<PowerUpProps> {

	stylePowerUp(): any {
		return {
			width: "120px",
			height: "60px",
			backgroundColor: `${this.props.color}`,
			display: "inline-block",
			marginLeft: "40px",
			marginRight: "40px",
			pointerEvents: "none",
			userSelect: "none",
			textAlign: "center"
		};
	}

	render() {
		const style = this.stylePowerUp();

		return (
			<div style={style}>
				<p>{this.props.name}</p>
				<p>{this.props.usesLeft}</p>
			</div>
		);
	}
}

export default PowerUp;