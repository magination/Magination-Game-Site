var React = require('react');

var LoginAction = require('../../../actions/LoginAction');

var NavigationLoggedInState = React.createClass({
	getInitialState: function(){
		return{
			email: null
		}
	},
	componentWillMount: function(){
		this.setState({
			email: this.props.email
		});
	},
	componentWillReceiveProps: function(props){
		this.setState({
			email: props.email
		});
	},
	render: function(){
		return(
			<ul className="nav navbar-nav navbar-right">
				<li className="dropdown">
          		<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.email} <span className="caret"></span></a>
	          		<ul className="dropdown-menu">
			            <li><a href="#">Action</a></li>
			            <li><a href="#">Another action</a></li>
			            <li><a href="#">Something else here</a></li>
			            <li role="separator" className="divider"></li>
			            <li><a href="#">Separated link</a></li>
			            <li role="separator" className="divider"></li>
			            <li><a onClick={this._onLogoutClicked}>Logout</a></li>
			        </ul>
		        </li>
			</ul>
		)
	},
	_onLogoutClicked: function(){
		console.log('Hei');
		LoginAction.logoutSuccess();
	}
});

module.exports = NavigationLoggedInState;