import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmailToken } from '../actions/userActions';
const EmailConfirmed = (props) => {
	const token = props.match.params.id;
	console.log(props.userExists);
	return (
		<div>
			{props.token(token)}
			{props.userExists ? (
				<h1 className="text-center pt-5 bg-secondary text-white vh-100">Email Confirmed! Now you can login</h1>
			) : (
				<h1 className="text-center pt-5 bg-secondary text-white vh-100">Error with Email Token</h1>
			)}
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
		userExists: state.userReducer.confirmationToken
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmailConfirmed));
