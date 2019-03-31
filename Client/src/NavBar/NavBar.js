import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import './NavBar.css';
import ModalClass from './../Modal/Modal';
import {withRouter} from 'react-router-dom';
class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			showModal: false,
			loginClicked: false,
			signupClicked: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	onClickSignUp = () => {
		this.setState({ showModal: !this.state.showModal, signupClicked: !this.state.signupClicked });
	};

	onClickLogin = () => {
		this.setState({ showModal: !this.state.showModal, loginClicked: !this.state.loginClicked });
	};

	render() {
		const loginActions = (
			<React.Fragment>
				<NavItem className="optionalElements">
					<Button className="mr-2" onClick={this.onClickSignUp}>
						Sign-up
					</Button>
				</NavItem>
				<NavItem className="optionalElements">
					<Button onClick={this.onClickLogin}>Login</Button>
				</NavItem>
			</React.Fragment>
		);

		const Account = <Button>Account</Button>;
		return (
			<div>
				
				<Navbar color="dark" light expand="md">
					<NavbarBrand href="/" className="text-white">
						VidShare
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar />
					</Collapse>
					{this.state.isLoggedIn ? Account : loginActions}
				</Navbar>
				{this.state.showModal ? (
					<ModalClass onClickSignUp={this.onClickSignUp} onClickLogin={this.onClickLogin} {...this.state} />
				) : null}
			</div>
		);
	}
}
export default withRouter(NavBar);