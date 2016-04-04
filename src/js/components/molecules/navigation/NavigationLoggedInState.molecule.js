var React = require('react');

var LoginAction = require('../../../actions/LoginAction');

var NavigationLoggedInState = React.createClass({
	getInitialState: function () {
		return {
			email: null
		};
	},
	componentWillMount: function () {
		this.setState({
			email: this.props.email
		});
	},
	componentWillReceiveProps: function (props) {
		this.setState({
			email: props.email
		});
	},
	render: function () {
		return (
			<ul className='nav navbar-nav navbar-right'>
				<li className='dropdown'>
					<a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>{this.state.email} <span className='caret'></span></a>
					<ul className='dropdown-menu'>
						<li><a href='#'><span className='glyphicon glyphicon-user'></span>  My Profile</a></li>
						<li><a href='#'><span className='glyphicon glyphicon-knight'></span>  My Games</a></li>
						<li role='separator' className='divider'></li>
						<li><a href='#'> <span className='glyphicon glyphicon-cog'></span>  Settings</a></li>
						<li role='separator' className='divider'></li>
						<li><a href='/' onClick={this.onLogoutClicked}><span className='glyphicon glyphicon-log-out'></span>  Log out</a></li>
					</ul>
				</li>
			</ul>
		);
	},
	onLogoutClicked: function () {
		LoginAction.logoutSuccess();
	}
});

module.exports = NavigationLoggedInState;
