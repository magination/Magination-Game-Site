var React = require('react');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Glyphicon = require('react-bootstrap').Glyphicon;
// var TextStyles = require('../../styles/Text');
var Color = require('../../styles/Colors');

var GameCreatorAction = require('../../actions/GameCreatorAction');

var imgStyle = {
	maxHeight: '100%',
	maxWidth: '100%',
	padding: '10px'
};
var imgDivStyle = {
	position: 'relative',
	textAlign: 'center',
	marginTop: '20px',
	height: '100%',
	width: '100%%',
	border: '1px solid ' + Color.blue,
	borderRadius: '5'
};
var chevronDivStyle = {
	position: 'absolute',
	top: '5px',
	right: '5px',
	height: '100%'
};

var GameCreatorElement = React.createClass({
	propTypes: {
		piece: React.PropTypes.array
	},
	getDefaultProps: function () {
		return {
			noRotation: false
		};
	},
	getInitialState: function () {
		return {
			selectedImage: (this.props.noRotation) ? this.props.piece[0].url : this.props.piece[0][0].url
		};
	},
	render: function () {
		var that = this;
		var images = this.props.piece.map(function (color, index) {
			var url = (that.props.noRotation) ? color.url : color[0].url;
			return (
				<div key={url + '' + index}><img width={100} height={65} onClick={that.onImageClick.bind(that, url)} src={url}/></div>
			);
		});
		var Overlay = <Popover id='chooseImgVariation'>{images}</Popover>;
		var containerStyle = {};
		if (this.state.isPressingOnThis) {
			containerStyle['backgroundColor'] = Color.blueTransparent;
		}
		return (
			<div style={containerStyle} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseLeave={this.onMouseLeave}>
				<div style={imgDivStyle} onClick={this.onPieceClick}>
					<div style={{width: '80%'}}>
						<img src={this.state.selectedImage} alt='' style={imgStyle}/>
					</div>
					<div style={chevronDivStyle} onMouseDown={function (e) { e.stopPropagation(); }} onClick={function (e) { e.stopPropagation(); }}>
						<OverlayTrigger trigger='click' rootClose placement='right' overlay={Overlay}>
								<p style={{color: Color.blue, fontSize: '20px'}}><Glyphicon glyph='cog'/></p>
						</OverlayTrigger>
					</div>
				</div>
			</div>
		);
	},
	onMouseDown: function () {
		this.setState({
			isPressingOnThis: true
		});
	},
	onMouseUp: function () {
		this.setState({
			isPressingOnThis: false
		});
	},
	onMouseLeave: function () {
		this.setState({
			isPressingOnThis: false
		});
	},
	onImageClick: function (url) {
		this.setState({
			selectedImage: url
		});
	},
	onPieceClick: function () {
		GameCreatorAction.addPieceByUrl({
			piece: {
				url: this.state.selectedImage
			}
		});
	}
});

module.exports = GameCreatorElement;
