var React = require('react');
var Link = require('react-router').Link;
var LoginForm = React.createClass({
	render: function(){
		return(
			<div className="col-md-4 col-md-offset-4">
				<form className="form-signin">
		        	<h2 className="form-signin-heading">Please sign in</h2>
		        	<label htmlFor="inputEmail" className="sr-only">Username/Email</label>
		        	<input type="text" id="inputEmail" className="form-control" placeholder="Username/Email" required autofocus/>
		        	<label htmlFor="inputPassword" className="sr-only">Password</label>
		        	<input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
			        <Link to="register">Register</Link>
		        	<button className="btn btn-lg btn-primary btn-block" type="submit">Login </button>
		        </form>
	        </div>
		);
	}
});
module.exports = LoginForm;