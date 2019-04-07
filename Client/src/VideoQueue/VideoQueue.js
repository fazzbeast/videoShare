import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import { ListGroup, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import ReactPlayer from 'react-player';
import './VideoQueue.css';
import VideoQueueList from './../VideoQueueList/VideoQueueList';

class VideoQueue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'https://www.youtube.com/watch?v=ajAfZEDZKCI',
			videos: [
				{ url: 'https://www.youtube.com/watch?v=ajAfZEDZKCI', id: 1 },
				{ url: 'https://www.youtube.com/watch?v=rUg0bi74X2o', id: 2 },
				{ url: 'https://www.youtube.com/watch?v=W1FmNWPPTeM', id: 3 }
			]
		};
	}

	render() {
		const moveCard = (dragIndex, hoverIndex) => {
			const dragCard = this.state.videos[dragIndex];
			let newState = update(this.state.videos, {
				$splice: [ [ dragIndex, 1 ], [ hoverIndex, 0, dragCard ] ]
			});
			this.setState({ videos: newState });
		};
		let loop = this.state.videos.map((data, idx) => (
			<VideoQueueList
				Data={data}
				handleDrop={(idx) => this.deleteItem(idx)}
				key={data.id}
				index={idx}
				id={data.id}
				moveCard={moveCard}
			/>
		));
		return (
			<div className="container-fluid vh-50">
				<div className="row h-100">
					<div className="col-12 col-sm-8 video-holder">
						<div className="player-wrapper ">
							<ReactPlayer
								className="react-player-main"
								url="https://www.youtube.com/watch?v=rnP74z0n3Ms"
								width="100%"
								height="100%"
							/>
						</div>
					</div>
					<div className="col-12 col-sm-4">
						<h1>Up Next</h1>
						<div className="mb-2">
							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>Add to Queue</InputGroupText>
								</InputGroupAddon>
								<Input />
							</InputGroup>
						</div>
						<ListGroup className="clearfix">{loop}</ListGroup>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(VideoQueue);
