import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { FaShareSquare, FaTrashAlt } from 'react-icons/fa';
class RoomsCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isItemContentVisible: {}
		};
	}

	onClick = (id) => {
		this.props.history.push(`/VideoQueue/${id}`);
	};

	add = (id) => {
		const name = window.location.origin + `/VideoQueue/${id}`;
		return <input type="text" value={name} className="float-right" readOnly onClick={(e) => e.stopPropagation()} />;
	};

	showShare = (e) => {
		e.stopPropagation();
		this.props.showShare();
	};

	showContent = (e, id) => {
		e.stopPropagation();
		this.setState({
			isItemContentVisible: {
				...this.state.isItemContentVisible,
				[id]: true
			}
		});
	};
	render() {
		const shared = (id) =>
			this.state.isItemContentVisible[id] ? (
				this.add(id)
			) : (
				<FaShareSquare
					color="white"
					onClick={(e) => this.showContent(e, id)}
					className="float-right"
					size="1.5em"
				/>
			);
		const data = this.props.roomData || [];
		const display = data.map((item) => (
			<ListGroupItem key={item.roomID} className="pointer" onClick={() => this.onClick(item.roomID)}>
				<h4 className="float-left">{item.roomName}</h4>
				<FaTrashAlt
					color="white"
					size="1.5em"
					className="ml-1 float-right"
					onClick={(e) => this.props.onDeletes(e, item.roomID)}
				/>
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
