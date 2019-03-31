import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Modal.css';
class ModalClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: true,
			login: false,
			register: false
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState((prevState) => ({
			modal: !prevState.modal
		}));
		if (this.props.signupClicked) {
			this.props.onClickSignUp();
		}
		if (this.props.loginClicked) {
			this.props.onClickLogin();
		}
	}

	render() {
		const register = (
			<React.Fragment>
				<ModalHeader toggle={this.toggle}>
					Register a New Account
				</ModalHeader>
				<ModalBody>
					<div class="input-group flex-nowrap mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="addon-wrapping">
								Name
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Name"
							aria-label="Username"
							aria-describedby="addon-wrapping"
						/>
					</div>
					<div class="input-group flex-nowrap mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="addon-wrapping">
								Email
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Email"
							aria-label="Username"
							aria-describedby="addon-wrapping"
						/>
					</div>
					<div class="input-group flex-nowrap mb-3" >
						<div class="input-group-prepend">
							<span class="input-group-text" id="addon-wrapping">
								Password
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Password"
							aria-label="Username"
							aria-describedby="addon-wrapping"
						/>
					</div>
					<div class="input-group flex-nowrap mb-3" >
						<div class="input-group-prepend">
							<span class="input-group-text" id="addon-wrapping">
								Re-enter Password
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Password"
							aria-label="Username"
							aria-describedby="addon-wrapping"
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.toggle}>
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
				<ModalHeader toggle={this.toggle} >
					Login
				</ModalHeader>
				<ModalBody>
				<div class="input-group flex-nowrap mb-3" >
						<div class="input-group-prepend">
							<span class="input-group-text" id="addon-wrapping">
								Email
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Password"
							aria-label="Username"
							aria-describedby="addon-wrapping"
						/>
					</div>
					<div class="input-group flex-nowrap mb-3" >
						<div class="input-group-prepend">
							<span class="input-group-text" id="addon-wrapping">
								Password
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Password"
							aria-label="Username"
							aria-describedby="addon-wrapping"
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.toggle}>
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

export default ModalClass;
