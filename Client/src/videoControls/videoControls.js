import React from 'react';
import { Button } from 'reactstrap';
import './videoControls.css';
export default function VideoControls(props) {
	return (
		<div className="containerControl">
			<div className="slider-container">
				<input
					className="sliders"
					type="range"
					min={0}
					max={1}
					step="any"
					onMouseDown={props.onSeekMouseDown}
					onChange={props.onSeekChange}
					onMouseUp={props.onSeekMouseUp}
					value={props.played}
				/>
				<div className="ml-1">
					{timeFormat(props.played * props.duration)}/{timeFormat(props.duration)}
				</div>
			</div>
			<div className="mt-2">
				<Button className="btn-primary" onClick={props.onPlayPause}>
					{props.playing ? 'Pause' : 'Play'}
				</Button>
				<Button className="btn-primary ml-2" onClick={props.onClickFullScreen}>
					Fullscreen
				</Button>
				<Button className="btn-primary ml-2" onClick={props.onNext}>
					Next
				</Button>
			</div>
		</div>
	);
}

function timeFormat(time) {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	seconds = Math.floor(seconds);
	let hours = Math.floor(minutes / 60);

	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (hours > 0) {
		return hours + ':' + minutes + ':' + seconds;
	} else {
		return minutes + ':' + seconds;
	}
}
