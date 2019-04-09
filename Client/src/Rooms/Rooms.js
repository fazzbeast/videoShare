import React, { Component } from 'react';
import { ListGroup, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './Rooms.css';
import RoomsCard from '../RoomsCard/RoomsCard';
import RoomModal from '../RoomModal/RoomModal';
import { connect } from 'react-redux';
import { getRooms, roomDelete } from '../actions/userActions';
class Rooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			form: {
				name: null
			},
			showShare: false
		};
	}
	onClickCreateRoom = () => {
		this.setState({ showModal: !this.state.showModal });
	};
	onCreateRoomSubmit = () => {
		this.props.getRooms(this.state.form.name);
		this.setState({ form: { name: '' }, showModal: !this.state.showModal });
	};

	onChange = (event) => {
		let updateForm = {
			...this.state.form
		};
		updateForm[event.target.name] = event.target.value;
		this.setState({ form: updateForm });
	};

	onDelete = (e, id) => {
		e.stopPropagation();
		this.props.deleteRoom(id);
	};

	onShare = () => {
		this.setState({ showShare: !this.state.showShare });
	};
	render() {
		return (
			<div className="m-5">
				<div className="my-2">
					<h1>Your Rooms</h1>
					<Button color="primary" size="sm" onClick={this.onClickCreateRoom}>
						Create New Room
					</Button>{' '}
				</div>
				<ListGroup className="clearfix">
					<RoomsCard
						roomData={this.props.data}
						onDeletes={this.onDelete}
						showShare={this.onShare}
						valueShare={this.state.showShare}
					/>
				</ListGroup>
				{this.state.showModal ? (
					<RoomModal
						onClickCreateRoom={this.onClickCreateRoom}
						updateValues={this.onChange}
						uploadForm={this.onCreateRoomSubmit}
						{...this.state}
					/>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.userReducer.createRoomData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getRooms: (roomInfo) => {
			dispatch(getRooms(roomInfo));
		},

		deleteRoom: (id) => {
			dispatch(roomDelete(id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Rooms));
