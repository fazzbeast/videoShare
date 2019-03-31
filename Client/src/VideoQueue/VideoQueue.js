import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactPlayer from "react-player";
import "./VideoQueue.css";
class VideoQueue extends Component {
  render() {
    return (
      <div className="container-fluid vh-50">
        <div className="row h-100">
          <div className="col-12 col-sm-8 video-holder">
            <div className="player-wrapper ">
              <ReactPlayer
                className="react-player"
                url="https://www.youtube.com/watch?v=rnP74z0n3Ms"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div className="col-12 col-sm-4">hi</div>
        </div>
      </div>
    );
  }
}

export default withRouter(VideoQueue);
