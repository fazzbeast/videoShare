import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import { ListGroup, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import ReactPlayer from 'react-player';
import './VideoQueue.css';
import VideoQueueList from './../VideoQueueList/VideoQueueList';
import VideoControls from '../videoControls/videoControls';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {
	addVideos,
	getVideos,
	deleteVideos,
	addToRecentlyPlayed,
	deleteRecentlyPlayed,
	updateRecentlyPlayed
} from '../actions/userActions';
import VideoRecentList from '../VideoRecentList/VideoRecentList';
import { FaAngleLeft } from 'react-icons/fa';

var socket;
class VideoQueue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			newVideo: { url: '' },
			queue: [],
			input: '',
			playing: false,
			played: 0,
			duration: 0,
			endpoint: 'http://localhost:5000/'
		};
		socket = io(this.endpoint);
	}
	static getDerivedStateFromProps(props, state) {
		if (props.videos !== state.videos) {
			return {
				videos: props.videos
			};
		} else {
			return null;
		}
	}
	componentDidMount() {
		this.props.getVideos(this.props.match.params.id);
		this.setState({ queue: this.state.videos.slice(1) });
		socket.emit('joinRoom', this.props.match.params.id);
		socket.on('NewCurrentTime', (playtime) => {
			this.setState({ played: playtime.time, playing: playtime.playing });
			this.player.seekTo(playtime.time);
		});
		socket.on('pauseplay', (pauseplay) => {
			this.setState({ playing: pauseplay.playing, played: pauseplay.played });
		});
		socket.on('addedNewVideo', () => {
			this.props.getVideos(this.props.match.params.id);
		});
		socket.on('videoDeleted', () => {
			this.props.getVideos(this.props.match.params.id);
		});
		socket.on('updatedRecentlyPlayed', (data) => {
			this.props.newRecentlyPlayed(data);
		});
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.videos.length !== this.state.videos.length) {
			this.setState({ queue: this.state.videos.slice(1) });
		}
	}

	onPlayPause = () => {
		this.setState({ playing: !this.state.playing });
		socket.emit('pauseplayemit', {
			playing: !this.state.playing,
			played: this.state.played
		});
	};
	onChange = (event) => {
		this.setState({ input: event.target.value });
	};
	handleKeyPress = (event) => {
		let oldVideosQueue = [ ...this.state.queue ];
		let oldVideosMain = [ ...this.state.videos ];
		if (event.key === 'Enter' && event.target.value.length > 0) {
			const url = event.target.value;
			const newData = { url: url, queueOrder: this.state.videos.length + 2 };
			oldVideosMain.push(newData);
			if (oldVideosMain.length >= 2) {
				oldVideosQueue.push(newData);
			}
			this.setState({ input: '' });
			this.props.updateVideos(oldVideosMain, this.props.match.params.id, socket);
		}
	};

	addToQueue = (event) => {
		let oldVideosQueue = [ ...this.state.queue ];
		let oldVideosMain = [ ...this.state.videos ];
		const url = this.state.input;
		if (url.length > 0) {
			const newData = { url: url, queueOrder: this.state.videos.length + 2 };
			oldVideosMain.push(newData);
			if (oldVideosMain.length >= 2) {
				oldVideosQueue.push(newData);
			}
			this.setState({ input: '' });
			this.props.updateVideos(oldVideosMain, this.props.match.params.id, socket);
		}
	};

	onClickRecentAdd = (event, videoInfo) => {
		event.stopPropagation();
		let oldVideosMain = [ ...this.state.videos ];
		oldVideosMain.push(videoInfo);
		let oldRecent = [ ...this.props.recentlyPlayed ];
		let index = oldRecent.indexOf(videoInfo);
		if (index !== -1) {
			oldRecent.splice(index, 1);
			this.props.updateVideos(oldVideosMain, this.props.match.params.id, socket);
			this.props.deleteRecent(oldRecent);
			socket.emit('newRecentlyPlayed', {
				recentlyPlayed: oldRecent
			});
		}
	};

	onClickFullScreen = () => {
		if (this.state.videos.length > 0) {
			screenfull.request(findDOMNode(this.player));
		}
	};
	onPause = () => {
		this.setState({ playing: false });
		socket.emit('pauseplayemit', {
			playing: false,
			played: this.state.played
		});
	};

	onPlay = () => {
		this.setState({ playing: true });
		socket.emit('pauseplayemit', {
			playing: true,
			played: this.state.played
		});
	};

	onSeekMouseDown = (e) => {
		this.setState({ seeking: true });
	};

	onSeekChange = (e) => {
		this.setState({ played: parseFloat(e.target.value) });
	};

	onSeekMouseUp = (e) => {
		this.setState({ seeking: false });
		this.player.seekTo(parseFloat(e.target.value));
		socket.emit('seekPlayTime', {
			time: e.target.value,
			playing: this.state.playing
		});
	};

	onProgress = (state) => {
		if (!this.state.seeking) {
			this.setState(state);
		}
	};

	onDuration = (duration) => {
		this.setState({ duration });
	};
	ref = (player) => {
		this.player = player;
	};

	onDelete = (videoID) => {
		this.props.deleteVideo(videoID, this.props.match.params.id, socket);
	};

	onNext = () => {
		if (this.state.videos.length > 0) {
			const temp = [ ...this.state.videos ];
			socket.emit('newVideo', {
				queue: this.state.videos.slice(1),
				main: this.state.videos
			});
			this.props.justPlayed(temp[0]);
			this.props.deleteVideo(this.state.videos[0].videoID, this.props.match.params.id, socket);
			let currentRecentlyPlayed = [ ...this.props.recentlyPlayed ];
			currentRecentlyPlayed.push(temp[0]);
			socket.emit('newRecentlyPlayed', {
				recentlyPlayed: currentRecentlyPlayed
			});
		}
	};

	onClickRedirect = () => {
		this.props.history.push('/Rooms');
	};
	render() {
		const moveCard = (dragIndex, hoverIndex) => {
			const dragCard = this.state.queue[dragIndex];
			let newState = update(this.state.queue, {
				$splice: [ [ dragIndex, 1 ], [ hoverIndex, 0, dragCard ] ]
			});

			this.setState({ queue: newState });
			let newList = this.state.videos.concat(newState);
			this.props.updateVideos(newList, this.props.match.params.id, socket);
		};

		let loop = this.state.queue.map((data, idx) => (
			<VideoQueueList
				Data={data}
				handleDrop={(idx) => this.deleteItem(idx)}
				key={data.videoID}
				index={idx}
				moveCard={moveCard}
				onDelete={this.onDelete}
			/>
		));
		const recentData = this.props.recentlyPlayed || [];
		let recent = recentData.map((data, idx) => (
			<VideoRecentList Data={data} changeRecent={this.onClickRecentAdd} key={data.videoID} index={idx} />
		));
		return (
			<div className="container-fluid vh-50 darktheme">
				<div className="pt-2 backToRoom" onClick={this.onClickRedirect}>
					<FaAngleLeft className="fa-angle-left" /> Back to Rooms
				</div>
				<div className="row h-100">
					<div className="col-12 col-sm-8 video-holder">
						<div className="player-wrapper ">
							{this.state.videos.length === 0 ? (
								<h3 className="noVideos">
									Add a video link to the 'Add to Queue' button to watch something here!
								</h3>
							) : null}
							<ReactPlayer
								ref={this.ref}
								className="react-player-main"
								url={this.state.videos.length > 0 ? this.state.videos[0].url : []}
								width="100%"
								height="100%"
								playing={this.state.playing}
								onPause={this.onPause}
								onPlay={this.onPlay}
								onProgress={this.onProgress}
								onDuration={this.onDuration}
								onEnded={this.onNext}
							/>
						</div>
						<VideoControls
							onPlayPause={this.onPlayPause}
							onClickFullScreen={this.onClickFullScreen}
							onSeekMouseDown={this.onSeekMouseDown}
							onSeekChange={this.onSeekChange}
							onSeekMouseUp={this.onSeekMouseUp}
							onNext={this.onNext}
							{...this.state}
						/>
						<div>
							<h2 className="mt-2 ">Recently Played</h2>
							<div className="VideoRecentMain">
								{recent.length > 0 ? recent : <h5>No Recently Played</h5>}
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-4">
						<h1>Up Next</h1>
						<div className="mb-2 mr-2">
							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<InputGroupText
										onClick={this.state.input.length > 0 ? this.addToQueue : null}
										className="queueButton">
										Add to Queue
									</InputGroupText>
								</InputGroupAddon>
								<Input
									onKeyPress={this.handleKeyPress}
									onChange={this.onChange}
									value={this.state.input}
								/>
							</InputGroup>
						</div>
						<ListGroup className="clearfix mr-2">
							{this.state.videos.length <= 1 ? <h3>No videos in queue</h3> : loop}
						</ListGroup>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		videos: state.userReducer.Videos,
		recentlyPlayed: state.userReducer.recentlyPlayed
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		updateVideos: (updateVideos, room, socket) => {
			dispatch(addVideos(updateVideos, room, socket));
		},
		getVideos: (room) => {
			dispatch(getVideos(room));
		},
		deleteVideo: (videoID, roomID, socket) => {
			dispatch(deleteVideos(videoID, roomID, socket));
		},
		justPlayed: (videoData) => {
			dispatch(addToRecentlyPlayed(videoData));
		},
		deleteRecent: (videos) => {
			dispatch(deleteRecentlyPlayed(videos));
		},
		newRecentlyPlayed: (videos) => {
			dispatch(updateRecentlyPlayed(videos));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VideoQueue));
