import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import './Modal.css';
import { connect } from 'react-redux';
import { registerUser, loginUser, resetForm, login_error_reset } from './../actions/userActions';
class ModalClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: true,
			login: false,
			register: false,
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
		};
	}
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			return;
		}
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

	onChangeEventRegister = (event) => {
		let formInputs = {
			...this.state.formValues
		};
		formInputs[event.target.name] = event.target.value;
		this.setState({ formValues: formInputs });
	};

	onChangeLogin = (event) => {
		let updatedLoginValues = {
			...this.state.loginValues
		};
		updatedLoginValues[event.target.name] = event.target.value;
		this.setState({ loginValues: updatedLoginValues });
	};

	onRegisterSubmit = (event) => {
		event.preventDefault();
		this.props.formSubmit(this.state.formValues);
	};

	onFormSubmitVerified = () => {
		this.props.reset();
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

	onLoginSubmit = (event) => {
		event.preventDefault();
		this.props.loginSubmit(this.state.loginValues);
	};
	render() {
		const register = (
			<React.Fragment>
				<ModalHeader toggle={this.toggle}>Register a New Account</ModalHeader>

				<ModalBody>
					{this.props.userExists ? (
						this.onFormSubmitVerified()
					) : this.props.errors !== undefined && this.props.errors.length ? (
						<div className="mb-3">
							{(this.props.errors || []).map((data) => (
								<Alert color="danger" className="mb-0">
									{data.msg}
								</Alert>
							))}
						</div>
					) : null}
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
					<div className="input-group flex-nowrap mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="addon-wrapping">
								Email
							</span>
						</div>
						<input
							name="email"
							type="text"
							className="form-control"
							placeholder="Email"
							aria-label="Username"
							aria-describedby="addon-wrapping"
							onChange={(event) => this.onChangeEventRegister(event)}
						/>
					</div>
					<div className="input-group flex-nowrap mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="addon-wrapping">
								Password
							</span>
						</div>
						<input
							name="password"
							type="password"
							className="form-control"
							placeholder="Password"
							aria-label="Username"
							aria-describedby="addon-wrapping"
							onChange={(event) => this.onChangeEventRegister(event)}
						/>
					</div>
					<div className="input-group flex-nowrap mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="addon-wrapping">
								Re-enter Password
							</span>
						</div>
						<input
							name="password2"
							type="password"
							className="form-control"
							placeholder="Password"
							aria-label="Username"
							aria-describedby="addon-wrapping"
							onChange={(event) => this.onChangeEventRegister(event)}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.onRegisterSubmit}>
						Sign-up
					</Button>{' '}
					<Button color="secondary" onClick={this.toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</React.Fragment>
		);

		const login = (
			<React.Fragment>
				<ModalHeader toggle={this.toggle}>Login</ModalHeader>
				<ModalBody>
					{this.props.userExists ? (
						this.onFormSubmitVerified()
					) : this.props.loginError ? (
						<div className="mb-3">
							<Alert color="danger" className="mb-0">
								{this.props.loginError.msg}
							</Alert>
						</div>
					) : null}
					<div className="input-group flex-nowrap mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="addon-wrapping">
								Email
							</span>
						</div>
						<input
							name="email"
							type="text"
							className="form-control"
							placeholder="Email"
							aria-label="Username"
							aria-describedby="addon-wrapping"
							onChange={(event) => this.onChangeLogin(event)}
						/>
					</div>
					<div className="input-group flex-nowrap mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="addon-wrapping">
								Password
							</span>
						</div>
						<input
							name="password"
							type="password"
							className="form-control"
							placeholder="Password"
							aria-label="Username"
							aria-describedby="addon-wrapping"
							onChange={(event) => this.onChangeLogin(event)}
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
					{this.props.loginClicked ? login : register}{' '}
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		uploadSuccess: state.userReducer.uploadSuccess,
		errors: state.errors.msg,
		userExists: state.Auth.isAuthenticated,
		loginError: state.Auth.error
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		formSubmit: (registerData) => {
			dispatch(registerUser(registerData));
		},
		loginSubmit: (loginData) => {
			dispatch(loginUser(loginData));
		},
		reset: () => {
			dispatch(resetForm());
			dispatch(login_error_reset());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalClass);
