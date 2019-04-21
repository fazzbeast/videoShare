import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import './Home.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Home extends Component {
	render() {
		return (
			<div>
				{this.props.isLoggedIn === true ? <Redirect to="/Rooms" /> : null}
				<Jumbotron fluid className="jumbo mb-0">
					<Container fluid>
						<h1 className="display-3 px-3  font-weight-bold">Welcome to VidShare</h1>
						{/* <p className="lead ">Watch videos with your friends synced across all devices!</p> */}
					</Container>
				</Jumbotron>
				<div className="mainBody">
					<h1 className="text-light text-center p-5">Watch videos together from anywhere in the world!</h1>
					<ul className="text-light text-center list-unstyled w-50 m-auto">
						<div className="row">
							<li className="col">
								<h3>Stay Synced</h3>
							</li>
							<li className="col">
								<h3>Unlimted Private Rooms</h3>
							</li>
							<div className="w-100" />
							<li className="col">
								<h3>Share with Everyone... or not</h3>
							</li>
						</div>
					</ul>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.Auth.isAuthenticated
	};
};
export default connect(mapStateToProps)(Home);
