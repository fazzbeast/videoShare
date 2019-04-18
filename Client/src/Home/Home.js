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
				<Jumbotron fluid className="jumbo">
					<Container fluid>
						<h1 className="display-3 px-3 text-white font-weight-bold">Welcome to VidShare</h1>
						<p className="lead text-white">Watch videos with your friends synced across all devices!</p>
					</Container>
				</Jumbotron>
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
