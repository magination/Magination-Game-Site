var React = require('react');
var ContainerStyle = require('../../../styles/Containers');
var GameAction = require('../../../actions/GameAction');
var LoginStore = require('../../../stores/LoginStore');
var TextStyle = require('../../../styles/Text');
var URLS = require('../../../config/config').urls;
var LoginAction = require('../../../actions/LoginAction');
var GlyphIcon = require('react-bootstrap').Glyphicon;
var Col = require('react-bootstrap').Col;

var ImageList = React.createClass({
	getInitialState: function () {
		return {
			images: LoginStore.getLoginProfile() ? LoginStore.getLoginProfile().images : [],
			feedbackMessage: undefined
		};
	},
	componentDidMount: function () {
		LoginStore.addChangeListener(this.onLoginStateChanged);
	},
	componentWillUnmount: function () {
		LoginStore.removeChangeListener(this.onLoginStateChanged);
	},
	render: function () {
		var images = [];
		for (var i = 0; i < this.state.images.length; i++) {
			var currentIteration = i;
			var imageUrl = this.state.images[currentIteration];
			images.push(
				<Col md={4}>
					<div style={ContainerStyle.imageList.droppableDiv} onClick={this.onImageSelected.bind(this, currentIteration)}>
						<div style={ContainerStyle.imageList.outer}>
							<div style={ContainerStyle.imageList.inner}>
								<img src={imageUrl} style={ContainerStyle.imageList.img}></img>
								<div style={ContainerStyle.imageList.upperRight} onClick={this.onDeleteClicked.bind(this, currentIteration)}>
									<GlyphIcon glyph='glyphicon glyphicon-remove' style={TextStyle.red} ></GlyphIcon>
								</div>
							</div>
						</div>
					</div>
				</Col>
			);
		}
		return (
			<div style={{padding: '10'}}>
				{this.state.feedbackMessage ? <h5>this.state.feedbackMessage</h5> : null}
				{LoginStore.getLoginProfile().images.length > 0 ? images : <h5 style={{width: '100%', textAlign: 'center'}}>It seems like you have no uploaded images, click the 'upload image' tab to upload an image!</h5>}
			</div>
		);
	},
	onImageSelected (position) {
		GameAction.addImageToLocalGame({
			image: this.state.images[position]
		});
		this.props.onSelected();
	},
	onLoginStateChanged: function () {
		if (LoginStore.getLoginProfile() === null) return;
		this.setState({
			images: LoginStore.getLoginProfile().images
		});
	},
	onDeleteClicked: function (position, e) {
		e.stopPropagation();
		$.ajax({
			type: 'DELETE',
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/images',
			data: {
				url: this.state.images[position]
			},
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.onRequestSuccess,
			error: this.onRequestError
		});
	},
	onRequestSuccess: function () {
		LoginAction.updateLoginProfile();
		this.setState({
			description: 'Image deleted.'
		});
	},
	onRequestError: function (data) {
		this.setState({
			description: 'Image not deleted, please try again.'
		});
	}
});
module.exports = ImageList;
