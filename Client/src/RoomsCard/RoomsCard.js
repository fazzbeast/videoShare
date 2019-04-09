import React, { Component } from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
class RoomsCard extends Component {
	onClick = (id) => {
		this.props.history.push(`/VideoQueue/441e9d80-599f-11e9-90d2-611b326661a8`);
	};

	add = (id) => {
		const name = `http://localhost:3000/VideoQueue/${id}`;
		return <input type="text" value={name} className="float-right" readOnly onClick={(e) => e.stopPropagation()} />;
	};

	showShare = (e) => {
		e.stopPropagation();
		this.props.showShare();
	};
	render() {
		const shared = (id) =>
			this.props.valueShare ? (
				this.add(id)
			) : (
				<Button onClick={(e) => this.showShare(e)} className="float-right" color="primary" size="sm">
					Share
				</Button>
			);
		const data = this.props.roomData || [];
		const display = data.map((item) => (
			<ListGroupItem key={item.roomID} className="pointer" onClick={() => this.onClick(item.roomID)}>
				<h4 className="float-left">{item.roomName}</h4>
				<Button
					size="sm"
					className="ml-1 float-right btn-danger"
					onClick={(e) => this.props.onDeletes(e, item.roomID)}>
					Delete
				</Button>
				{shared(item.roomID)}
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
