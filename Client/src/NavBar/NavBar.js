import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import './NavBar.css';

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isLoggedIn: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	onClickSignUp = () => {};

	render() {
		const loginActions = (
			<React.Fragment>
				<NavItem className="optionalElements">
					<Button className="mr-2">Sign-up</Button>
				</NavItem>
				<NavItem className="optionalElements">
					<Button>Login</Button>
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
			</div>
		);
	}
}
