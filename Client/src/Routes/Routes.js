import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './../Home/Home';
import NavBar from './../NavBar/NavBar';
const Routes = () => {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/Home" component={Home} />
				<Route exact path="/">
					<Redirect to="/Home" />
				</Route>
			</Switch>
		</div>
	);
};

export default Routes;
