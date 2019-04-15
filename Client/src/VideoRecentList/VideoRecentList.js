import React from "react";

import { ListGroupItem } from "reactstrap";
import ReactPlayer from "react-player";
import "./VideoRecentList.css";

const VideoQueueList = ({ Data, changeRecent }) => {
  return (
    <div onClick={event => changeRecent(event, Data)}>
      <ListGroupItem style={{ height: "102px" }} className="items ">
        <div className="thumbnail m-auto">
          <ReactPlayer
            light={true}
            className="react-player-sub"
            url={Data.url}
            height="94px"
            width="168px"
            config={{
              youtube: {
                playerVars: { modestbranding: 0 }
              }
            }}
          />
        </div>
      </ListGroupItem>
    </div>
  );
};

export default VideoQueueList;
