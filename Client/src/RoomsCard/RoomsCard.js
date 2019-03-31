import React, { Component } from "react";
import { ListGroupItem, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
class RoomsCard extends Component {
  onClick = () => {
    this.props.history.push(`/VideoQueue/${this.props.Data.divName}`);
  };
  render() {
    return (
      <React.Fragment>
        <ListGroupItem
          key={this.props.Data}
          className="pointer"
          onClick={this.onClick}>
          <h4 className="float-left">{this.props.Data.divName}</h4>
          <Button size="sm" className="ml-1 float-right btn-danger">
            Delete
          </Button>
          <Button
            onClick={this.onClick2}
            className="float-right"
            color="primary"
            size="sm">
            Share
          </Button>
        </ListGroupItem>
      </React.Fragment>
    );
  }
}
export default withRouter(RoomsCard);
