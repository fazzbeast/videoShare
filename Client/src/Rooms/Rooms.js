import React, { Component } from 'react';
import { ListGroup, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './Rooms.css';
import RoomsCard from '../RoomsCard/RoomsCard';
import RoomModal from '../RoomModal/RoomModal';
class Rooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
	}
	onClickCreateRoom = () => {
		this.setState({ showModal: !this.state.showModal });
	};
	onClick = (e) => {
		e.stopPropagation();
		this.props.history.push('/VideoQueue/1');
	};
	onClick2 = (e, d) => {
		e.stopPropagation();
	};
	render() {
		const arr = { divName: 'Gaming Videos' };
		return (
			<div className="m-5">
				<div className="my-2">
					<h1>Your Rooms</h1>
					<Button color="primary" size="sm" onClick={this.onClickCreateRoom}>
						Create New Room
					</Button>{' '}
				</div>
				<ListGroup className="clearfix">
					<RoomsCard Data={arr} />
				</ListGroup>
				{this.state.showModal ? <RoomModal onClickCreateRoom={this.onClickCreateRoom} {...this.state} /> : null}
			</div>
		);
	}
}
export default withRouter(Rooms);
