import React from "react";
import { ListGroup } from "reactstrap";
import { DropTarget } from "react-dnd";

function collect(connect, monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver(),
    connectDropTarget: connect.dropTarget(),
    item: monitor.getItem()
  };
}

function VideoQueueDnDContainer(props) {
  const { highlighted, hovered, connectDropTarget } = props;
  return connectDropTarget(
    <div>
      {props.Data}</ListGroup>
    </div>
  );
}

export default DropTarget("item", {}, collect)(VideoQueueDnDContainer);
