import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import './Home.css';
import { connect } from 'react-redux';

class Home extends Component {
	componentDidMount() {
		if (this.props.isLoggedIn === true) {
			this.props.history.push('/Rooms');
		}
	}
	render() {
		return (
			<div>
				<Jumbotron fluid className="jumbo">
					<Container fluid>
						<h1 className="display-3 px-3 text-white font-weight-bold">Welcome to VidShare</h1>
						<p className="lead text-white">Watch videos with your friends synced across all deviced!</p>
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
