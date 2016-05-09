var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var URLS = require('../../../config/config').urls;
var LoginStore = require('../../../stores/LoginStore');
var FeedbackAction = require('../../../actions/FeedbackAction');
var Col = require('react-bootstrap').Col;
var ImgUrls = require('../../../config/config').urls.img;
var ButtonStyles = require('../../../styles/Buttons');
var LoginAction = require('../../../actions/LoginAction');
var Colors = require('../../../styles/Colors');

var ChangePassword = React.createClass({
	getInitialState () {
		var pieces = {
			singles: 0,
			doubles: 0,
			triples: 0
		};
		if (!LoginStore.getLoginState().isLoggedIn) {
			return pieces;
		}
		pieces = {
			singles: LoginStore.getLoginProfile().pieces.singles,
			doubles: LoginStore.getLoginProfile().pieces.doubles,
			triples: LoginStore.getLoginProfile().pieces.triples
		};
		return pieces;
	},
	componentDidMount: function () {
		LoginStore.addChangeListener(this.onLoginChange);
	},
	componentWillUnmount: function () {
		LoginStore.removeChangeListener(this.onLoginChange);
	},
	render: function () {
		return (
			<div>
				<Col md={12}>
					<Button onClick={this.onChangePiecesClicked} style={ButtonStyles.MaginationFillParent}><strong>My Pieces</strong></Button>
				</Col>
				<Collapse in={this.props.isShow}>
					<Col md={12}>
						<Well style={{marginBottom: '0'}}>
							<div>
								<form className='form-settings' onSubmit={this.onSubmit}>
									<Input value={this.state.singles} placeholder='Singles' type='number' onChange={this.onSinglesChanged} addonBefore={<img width={39} height={19} src={ImgUrls.pieceSingleBlue} alt='No img'/>}/>
									<Input value={this.state.doubles} placeholder='Doubles' type='number' onChange={this.onDoublesChanged} addonBefore={<img width={39} height={19} src={ImgUrls.pieceDoubleBlue} alt='No img'/>}/>
									<Input value={this.state.triples} placeholder='Triples' type='number' onChange={this.onTriplesChanged} addonBefore={<img width={39} height={19} src={ImgUrls.pieceTripleBlue} alt='No img'/>}/>
									<Button style={ButtonStyles.MaginationSettingsButton.customColor(Colors.green)} type='submit'><strong>Save changes</strong></Button>
								</form>
							</div>
						</Well>
					</Col>
				</Collapse>
			</div>
		);
	},
	onLoginChange: function () {
		if (LoginStore.getLoginState().isLoggedIn) {
			this.setState({
				singles: LoginStore.getLoginProfile().pieces.singles,
				doubles: LoginStore.getLoginProfile().pieces.doubles,
				triples: LoginStore.getLoginProfile().pieces.triples
			});
		}
	},
	onChangePiecesClicked: function (e) {
		this.props.onExpandChanged(this.props.isShow ? '' : 'myPieces');
	},
	onSinglesChanged: function (e) {
		this.setState({
			singles: e.target.value
		});
	},
	onDoublesChanged: function (e) {
		this.setState({
			doubles: e.target.value
		});
	},
	onTriplesChanged: function (e) {
		this.setState({
			triples: e.target.value
		});
	},
	onSubmit: function (e) {
		e.preventDefault();
		$.ajax({
			type: 'PUT',
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/pieces',
			data: JSON.stringify({
				pieces: {
					singles: this.state.singles,
					doubles: this.state.doubles,
					triples: this.state.triples
				}
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.onRequestSuccess
		});
	},
	onRequestSuccess: function (e) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success',
			message: 'Pieces updated'
		});
		LoginAction.updateLoginProfile();
	}

});
module.exports = ChangePassword;
