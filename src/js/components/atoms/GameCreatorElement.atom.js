var React = require('react');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;

var GameCreatorAction = require('../../actions/GameCreatorAction');

var imgStyle = {
	maxHeight: '100%',
	maxWidth: '100%'
};
var imgDivStyle = {
	textAlign: 'center',
	marginTop: '20%',
	height: '100%',
	width: '100%'
};

var GameCreatorElement = React.createClass({
	propTypes: {
		piece: React.PropTypes.array
	},
	getInitialState: function () {
		return {
			selectedImage: this.props.piece.length > 0 ? this.props.piece[0][0].url : ''
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			selectedImage: nextProps.piece[0][0].url
		});
	},
	render: function () {
		var that = this;
		var images = this.props.piece.map(function (color, index) {
			return (
				<div key={color[0].url + '' + index}><img width={100} height={62} onClick={that.onImageClick.bind(that, color[0].url)} src={color[0].url}/></div>
			);
		});
		var Overlay = <Popover id='chooseImgVariation'>{images}</Popover>;
		return (
			<div>
				<div style={imgDivStyle} onClick={this.onPieceClick}>
					<img width={100} height={62} src={this.state.selectedImage} alt='' style={imgStyle}/>
				</div>
				<OverlayTrigger trigger='click' rootClose placement='right' overlay={Overlay}>
						<Button><Glyphicon glyph='chevron-right'/></Button>
				</OverlayTrigger>
			</div>
		);
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
