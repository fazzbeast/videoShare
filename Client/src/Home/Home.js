import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: true,
		};
	}
	componentDidUpdate(prevState){
		console.log('prevState',prevState)
		console.log('state',this.state.isLoggedIn)
		if(this.state.isLoggedIn===true){
			this.props.history.push('/Rooms')
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
