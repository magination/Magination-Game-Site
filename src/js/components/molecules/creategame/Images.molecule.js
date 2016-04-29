var React = require('react');
var GameStore = require('../../../stores/GameStore');
var LoginStore = require('../../../stores/LoginStore');
var ContainerStyle = require('../../../styles/Containers');
var URLS = require('../../../config/config').urls;
var Image = require('react-bootstrap').Image;

var Images = React.createClass({
	getInitialState: function () {
		return {
			images: []
		};
	},
	componentDidMount: function () {
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	componentWillUnmount: function () {
		GameStore.removeChangeListener(this.onGameStateChanged);
	},
	render: function () {
		var images = [];
		for (var i = 0; i < this.state.images.length; i++) {
			var currentIteration = i;
			images.push(
				<Image key={i} width='200' src={URL.createObjectURL(this.state.images[currentIteration])} thumbnail />
			);
		}
		return (
			<div style={ContainerStyle.paddingLess}>
				<form onSubmit={this.onFormSubmitted}>
					Select an image to upload:
					<input ref='fileInput' type='file' name='image'/>
					<input type='submit' value='Upload Image'/>
				</form>
            </div>
		);
	},
	onUploadClicked: function () {
		this.refs.fileInput.click();
	},
	onGameStateChanged: function () {
	},
	onFormSubmitted: function (e) {
		e.preventDefault();
		var formData = new FormData();
		formData.append('image', this.refs.fileInput.files[0]);
		$.ajax({
			type: 'POST',
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/images',
			data: formData,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: false,
			processData: false,
			success: this.onRequestSuccess,
			error: this.onRequestError
		});
	},
	onRequestSuccess: function (data) {
		console.log(data);
	},
	onRequestError: function (data) {
		console.log(data);
	}
});
module.exports = Images;
