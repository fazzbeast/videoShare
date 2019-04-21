import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import './Home.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FaExternalLinkAlt, FaSyncAlt, FaDoorOpen, FaSave } from 'react-icons/fa';
class Home extends Component {
	render() {
		return (
			<div>
				{this.props.isLoggedIn === true ? <Redirect to="/Rooms" /> : null}
				<Jumbotron fluid className="jumbo mb-0">
					<Container fluid>
						<h1 className="display-3 px-3  font-weight-bold">Welcome to VidShare</h1>
					</Container>
				</Jumbotron>
				<div className="mainBody">
					<h1 className="text-light text-center p-5 mb-3 ">
						Watch videos together from anywhere in the world!
					</h1>
					<ul className="text-light text-center list-unstyled w-50 m-auto">
						<div className="row">
							<li className="col mr-5">
								<span>
									<FaSyncAlt size="3em" className="mb-2" />
								</span>
								<h3 className="mb-4 ">Stay Synced</h3>
								<p className="text-left">
									Videos stay synced no matter where you are watching from. Play, pause, skip, seek
									everyone will experience all those changes together.{' '}
								</p>
							</li>
							<li className="col">
								<span>
									<FaDoorOpen size="3em" className="mb-2" />
								</span>
								<h3 className="mb-4 ">Unlimted Private Rooms</h3>
								<p className="text-left">
									Create as many rooms as you want. Create one for cooking videos, another for sports
									plays, create one for any reason you want.
								</p>
							</li>

							<div className="w-100" />
							<li className="col mr-5">
								<span>
									<FaExternalLinkAlt size="3em" className="mb-2" />
								</span>
								<h3 className="mb-4 ">Share with Everyone... or not</h3>
								<p className="text-left">
									Each room comes with a shareable link. Send friends a link to one of your rooms and
									they can join with out having to create an account.
								</p>
							</li>
							<li className="col">
								<span>
									<FaSave size="3em" className="mb-2" />
								</span>
								<h3 className="mb-4 ">Come back to your playlist later</h3>
								<p className="text-left">
									Getting late and your friends have work the next day? Well don't worry, you can
									close the tab without losing what's in your room's queue.
								</p>
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
