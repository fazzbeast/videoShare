import React, { Component } from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
class RoomsCard extends Component {
	onClick = (id) => {
		this.props.history.push(`/VideoQueue/${id}`);
	};
	render() {
		const data = this.props.roomData || [];
		const display = data.map((item) => (
			<ListGroupItem key={item.roomID} className="pointer" onClick={(event) => this.onClick(item.roomID)}>
				<h4 className="float-left">{item.roomName}</h4>
				<Button
					size="sm"
					className="ml-1 float-right btn-danger"
					onClick={(e) => this.props.onDeletes(e, item.roomID)}>
					Delete
				</Button>
				<Button onClick={this.onClick2} className="float-right" color="primary" size="sm">
					Share
				</Button>
			</ListGroupItem>
		));
		const noVids = (
			<div>
				<h3>No Rooms</h3>
			</div>
		);
		return <React.Fragment>{this.props.roomData ? display : noVids}</React.Fragment>;
	}
}
export default withRouter(RoomsCard);
