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
				<ModalHeader toggle={this.toggle} charCode="Y">
					Modal title
				</ModalHeader>
				<ModalBody>
					<div class="input-group flex-nowrap">
						<div class="input-group-prepend">
							<span class="input-group-text" id="addon-wrapping">
								@
							</span>
						</div>
						<input
							type="text"
							class="form-control"
							placeholder="Username"
							aria-label="Username"
							aria-describedby="addon-wrapping"
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.toggle}>
						Do Something
					</Button>{' '}
					<Button color="secondary" onClick={this.toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</React.Fragment>
		);

		const login = (
			<React.Fragment>
				<ModalHeader toggle={this.toggle} charCode="Y">
					Modal title
				</ModalHeader>
				<ModalBody>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.toggle}>
						Do Something
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
