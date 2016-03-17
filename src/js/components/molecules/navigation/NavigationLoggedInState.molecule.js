var React = require('react');

var NavigationLoggedInState = React.createClass({
	render: function(){
		return(
			<ul className="nav navbar-nav navbar-right">
				<li className="dropdown">
          		<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
	          		<ul className="dropdown-menu">
			            <li><a href="#">Action</a></li>
			            <li><a href="#">Another action</a></li>
			            <li><a href="#">Something else here</a></li>
			            <li role="separator" className="divider"></li>
			            <li><a href="#">Separated link</a></li>
			            <li role="separator" className="divider"></li>
			            <li><a href="#">Logout</a></li>
			        </ul>
		        </li>
			</ul>
		)
	}
});

module.exports = NavigationLoggedInState;