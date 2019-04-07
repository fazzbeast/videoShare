import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './../Home/Home';
import NavBar from './../NavBar/NavBar';
import Rooms from '../Rooms/Rooms';
import VideoQueue from '../VideoQueue/VideoQueue';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { loadUser } from '../actions/authActions';
import store from '../store/store';
import EmailConfirmed from '../EmailConfirmed/EmailConfirmed';
class Routes extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<div>
				<NavBar />
				<Switch>
					<Route exact path="/Home" component={Home} />
					<Route exact path="/">
						<Redirect to="/Home" />
					</Route>
					<PrivateRoute path="/Rooms" component={Rooms} />
					<PrivateRoute path="/VideoQueue/:id" component={VideoQueue} />
					<Route path="/user/confirmed/:id" component={EmailConfirmed} />
				</Switch>
			</div>
		);
	}
}

export default Routes;
