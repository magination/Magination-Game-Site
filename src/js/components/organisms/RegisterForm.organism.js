var React = require('react');

var RegisterForm = React.createClass({
	render: function(){
		return(
			<div className="col-md-4 col-md-offset-4">
				<form className="form-signin">
		        	<h2 className="form-signin-heading">Register</h2>
		        	<label htmlFor="inputEmail" className="sr-only">Username/Email</label>
		        	<input type="text" id="inputUsername" className="form-control" placeholder="Email address" required autofocus/>
		        	<label htmlFor="inputPassword" className="sr-only">Password</label>
		        	<input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
		        	<label htmlFor="inputPassword" className="sr-only">Confirm Password</label>
		        	<input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required/>
		        	<button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
		        </form>
	        </div>	
		);
	}
});

module.exports = RegisterForm;