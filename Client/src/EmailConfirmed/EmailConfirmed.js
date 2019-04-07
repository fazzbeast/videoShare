import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmailToken } from '../actions/userActions';
const EmailConfirmed = (props) => {
	console.log(props);
	const token = props.match.params.id;

	return (
		<div>
			{props.token(token)}
			<Redirect to="/" />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		token: (token) => dispatch(getEmailToken(token))
	};
};
export default connect(null, mapDispatchToProps)(withRouter(EmailConfirmed));
