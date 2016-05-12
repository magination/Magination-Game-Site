var React = require('react');
var LoginStore = require('../../../../stores/LoginStore');
var ContainerStyle = require('../../../../styles/Containers');
var URLS = require('../../../../config/config').urls;
var Button = require('react-bootstrap').Button;
var ButtonStyle = require('../../../../styles/Buttons');
var LoginAction = require('../../../../actions/LoginAction');
var Colors = require('../../../../styles/Colors');

var Images = React.createClass({
	getInitialState: function () {
		return {
			description: 'Select an image to upload',
			imageSrc: null,
			selectButtonText: 'Click here to upload an image'
		};
	},
	render: function () {
		return (
			<div style={{padding: '10'}}>
				<form onSubmit={this.onFormSubmitted}>
					{this.state.imageSrc
						? 	<div>
								<div style={ContainerStyle.imageList.outerBorderLess}>
									<div style={ContainerStyle.imageList.inner}>
										<img ref='preview' style={ContainerStyle.imageList.img} src={this.state.imageSrc} alt='your image'/>
									</div>
								</div>
							</div>
						: 	<h3>{this.state.description}</h3>}
					{this.state.imageSrc ? <Button style={ButtonStyle.MaginationFillParentCustom(Colors.green)} type='submit'>Submit image</Button> : null}
					<Button style={ButtonStyle.MaginationFillParent} onClick={this.onSelectImageClicked}>{this.state.selectButtonText}</Button>
					<input style={{height: '0'}} ref='fileInput' type='file' name='image' onChange={this.onSourceChanged} />
				</form>
			</div>
		);
	},
	onSourceChanged: function (e) {
		this.setState({
			description: e.target.files[0] ? 'Image preview' : 'Select an image to upload',
			imageSrc: URL.createObjectURL(e.target.files[0]),
			selectButtonText: 'Select another image to upload'
		});
	},
	onSelectImageClicked: function () {
		this.refs.fileInput.click();
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
		this.setState({
			imageSrc: null,
			selectButtonText: 'Click here to upload an image'
		});
		this.props.onImageSubmitted();
	},
	onRequestError: function (data) {
	}
});
module.exports = Images;
