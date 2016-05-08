var React = require('react');
var LoginStore = require('../../../stores/LoginStore');
var ContainerStyle = require('../../../styles/Containers');
var URLS = require('../../../config/config').urls;
var Button = require('react-bootstrap').Button;

var ButtonStyle = require('../../../styles/Buttons');
var LoginAction = require('../../../actions/LoginAction');

var Images = React.createClass({
	getInitialState: function () {
		return {
			description: 'Select an image to upload',
			imageSrc: null
		};
	},
	render: function () {
		return (
			<div style={ContainerStyle.paddingLess}>
				<form onSubmit={this.onFormSubmitted}>
					{this.state.description}
					<br/>
					{this.state.imageSrc ? <img ref='preview' style={ContainerStyle.image.uploadImage} src={this.state.imageSrc} alt='your image'/> : null}
					<input ref='fileInput' type='file' name='image' onChange={this.onSourceChanged}/>
					{this.state.imageSrc ? <Button style={ButtonStyle.MaginationFillParent} type='submit'>Submit image</Button> : null}
				</form>
			</div>
		);
	},
	onUploadClicked: function () {
		this.refs.fileInput.click();
	},
	onSourceChanged: function (e) {
		this.setState({
			description: e.target.files[0] ? 'Image preview' : 'Select an image to upload',
			imageSrc: URL.createObjectURL(e.target.files[0])
		});
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
	onRequestSuccess: function () {
		LoginAction.updateLoginProfile();
	},
	onRequestError: function (data) {
	}
});
module.exports = Images;
