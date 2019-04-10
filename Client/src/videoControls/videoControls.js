import React from 'react';
import { Button } from 'reactstrap';
import './videoControls.css';
export default function VideoControls(props) {
	return (
		<div className="containerControl">
			<Button className="btn-primary" onClick={props.onPlayPause}>
				{props.playing ? 'Pause' : 'Play'}
			</Button>
		</div>
	);
}
