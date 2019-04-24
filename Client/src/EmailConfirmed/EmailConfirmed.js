import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmailToken } from '../actions/userActions';
const EmailConfirmed = (props) => {
	const token = props.match.params.id;
	console.log(props.userExists);
	return (
		<div>
			{props.token(token)}
			{props.userExists ? <Redirect to="/" /> : <div>Error with Email Token</div>}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		token: (token) => dispatch(getEmailToken(token))
	};
};
const mapStateToProps = (state, ownProps) => {
	return {
		userExists: state.Auth.token
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmailConfirmed));
