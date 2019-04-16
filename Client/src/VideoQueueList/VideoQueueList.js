import React, { useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";

import { ListGroupItem, Button } from "reactstrap";
import ReactPlayer from "react-player";
import "./VideoQueueList.css";

const VideoQueueList = React.forwardRef(
  (
    { Data, isDragging, connectDragSource, connectDropTarget, onDelete },
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));
    return (
      <div ref={elementRef} style={{ opacity: opacity }}>
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
          <Button className="delete" onClick={() => onDelete(Data.videoID)}>
            X
          </Button>
        </ListGroupItem>
      </div>
    );
  }
);

export default DropTarget(
  "item",
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    "item",
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(VideoQueueList)
);
