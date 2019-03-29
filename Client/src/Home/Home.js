import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './Home.css';

export default class Home extends Component {
	render() {
		return (
			<div>
				<Jumbotron fluid className="jumbo">
					<Container fluid>
						<h1 className="display-3 px-3 text-white">Welcome to VidShare</h1>
						<p className="lead text-white">Watch videos with your friends synced across all deviced!</p>
					</Container>
				</Jumbotron>
			</div>
		);
	}
}
