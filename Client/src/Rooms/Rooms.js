import React, { Component } from "react";
import { ListGroup, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import "./Rooms.css";
import RoomsCard from "../RoomsCard/RoomsCard";
class Rooms extends Component {
  onClick = e => {
    e.stopPropagation();
    this.props.history.push("/VideoQueue/1");
  };
  onClick2 = (e, d) => {
    e.stopPropagation();
  };
  render() {
    const arr = { divName: "Gaming Videos" };
    return (
      <div className="m-5">
        <div className="my-2">
          <h1>Your Rooms</h1>
          <Button color="primary" size="sm">
            Create New Room
          </Button>{" "}
        </div>
        <ListGroup className="clearfix">
          <RoomsCard Data={arr} />
        </ListGroup>
      </div>
    );
  }
}
export default withRouter(Rooms);
