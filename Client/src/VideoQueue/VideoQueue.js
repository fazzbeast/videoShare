import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import update from "immutability-helper";
import {
  ListGroup,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";
import ReactPlayer from "react-player";
import "./VideoQueue.css";
import VideoQueueList from "./../VideoQueueList/VideoQueueList";
import VideoControls from "../videoControls/videoControls";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";

class VideoQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [
        { url: "https://www.youtube.com/watch?v=ajAfZEDZKCI", id: 1 },
        { url: "https://www.youtube.com/watch?v=rUg0bi74X2o", id: 2 },
        { url: "https://www.youtube.com/watch?v=W1FmNWPPTeM", id: 3 }
      ],
      newVideo: { url: "" },
      queue: [],
      input: "",
      playing: false,
      played: 0,
      duration: 0
    };
  }

  componentDidMount() {
    this.setState({ queue: this.state.videos.slice(1) });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.videos.length !== this.state.videos.length) {
      this.setState({ queue: this.state.videos.slice(1) });
    }
  }

  onPlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };
  onChange = event => {
    this.setState({ input: event.target.value });
  };
  handleKeyPress = event => {
    let oldVideosQueue = this.state.queue;
    let oldVideosMain = this.state.videos;
    if (event.key === "Enter") {
      const url = event.target.value;
      const newData = { url: url, id: this.state.videos.length + 2 };

      oldVideosMain.push(newData);
      newData.slice(1);
      oldVideosQueue.push(newData);
      this.setState({
        newVideo: { url },
        queue: oldVideosQueue,
        videos: oldVideosMain,
        input: ""
      });
    }
  };

  onClickFullScreen = () => {
    screenfull.request(findDOMNode(this.player));
  };
  onPause = () => {
    this.setState({ playing: false });
  };

  onPlay = () => {
    this.setState({ playing: true });
  };

  onSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  onNext = () => {
    let newVideos = this.state.videos;
    newVideos.shift();
    this.setState({ videos: newVideos, queue: newVideos.slice(1) });
  };
  onDuration = duration => {
    this.setState({ duration });
  };
  ref = player => {
    this.player = player;
  };

  render() {
    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = this.state.queue[dragIndex];
      let newState = update(this.state.queue, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
      });

      this.setState({ queue: newState });
    };
    let loop = this.state.queue.map((data, idx) => (
      <VideoQueueList
        Data={data}
        handleDrop={idx => this.deleteItem(idx)}
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
              {this.state.videos.length === 0 ? (
                <h3 className="noVideos">
                  Add a video link to the 'Add to Queue' button to watch
                  something here!
                </h3>
              ) : null}
              <ReactPlayer
                ref={this.ref}
                className="react-player-main"
                url={
                  this.state.videos.length > 0 ? this.state.videos[0].url : []
                }
                width="100%"
                height="100%"
                playing={this.state.playing}
                onPause={this.onPause}
                onPlay={this.onPlay}
                onProgress={this.onProgress}
                onDuration={this.onDuration}
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
          </div>
          <div className="col-12 col-sm-4">
            <h1>Up Next</h1>
            <div className="mb-2">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Add to Queue</InputGroupText>
                </InputGroupAddon>
                <Input
                  onKeyPress={this.handleKeyPress}
                  onChange={this.onChange}
                  value={this.state.input}
                />
              </InputGroup>
            </div>
            <ListGroup className="clearfix">
              {this.state.videos.length <= 1 ? (
                <h3>No videos in queue</h3>
              ) : (
                loop
              )}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(VideoQueue);
