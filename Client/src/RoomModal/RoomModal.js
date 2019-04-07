import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './RoomModal.css';
import { connect } from 'react-redux';
import { registerUser, loginUser } from './../actions/userActions';

class RoomModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: true,
			login: false,
			register: false,
			formValues: {
				roomName: ''
			}
		};
	}

	toggle = () => {
		this.setState((prevState) => ({
			modal: !prevState.modal
		}));
		if (this.props.signupClicked) {
			this.props.onClickSignUp();
		}
		if (this.props.loginClicked) {
			this.props.onClickLogin();
		}
	};

	onRoomEventRegister = (event) => {
		let formInputs = {
			...this.state.formValues
		};
		formInputs[event.target.name] = event.target.value;
		this.setState({ formValues: formInputs });
	};

	onRegisterSubmit = (event) => {
		event.preventDefault();
		this.props.formSubmit(this.state.formValues);
		this.setState({
			formValues: {
				name: '',
				email: '',
				password: '',
				password2: ''
			},
			loginValues: {
				email: '',
				password: ''
			}
		});
		this.toggle();
	};
	toggle = () => {
		this.setState((prevState) => ({
			modal: !prevState.modal
		}));
		this.props.onClickCreateRoom();
	};
	onLoginSubmit = (event) => {
		event.preventDefault();
		this.props.loginSubmit(this.state.loginValues);
		this.toggle();
	};
	render() {
		const addRoom = (
			<React.Fragment>
				<ModalHeader toggle={this.toggle}>Add New Room!</ModalHeader>
				<ModalBody>
					<div className="input-group flex-nowrap mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="addon-wrapping">
								Name
							</span>
						</div>
						<input
							name="name"
							type="text"
							className="form-control"
							placeholder="Name"
							aria-label="Username"
							aria-describedby="addon-wrapping"
							onChange={(event) => this.onChangeEventRegister(event)}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.onLoginSubmit}>
						Login
					</Button>{' '}
					<Button color="secondary" onClick={this.toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</React.Fragment>
		);
		return (
			<div>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					{' '}
					{addRoom}
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		formSubmit: (registerData) => {
			dispatch(registerUser(registerData));
		},
		loginSubmit: (loginData) => {
			dispatch(loginUser(loginData));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomModal);
