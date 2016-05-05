var React = require('react');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;

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
			selectedImage: this.props.piece.length > 0 ? this.props.piece[0][0] : ''
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			selectedImage: nextProps.piece[0][0]
		});
	},
	render: function () {
		var that = this;
		var images = this.props.piece.map(function (color) {
			return (
				<div key={color[0]}><img width={100} height={62} onClick={that.onImageClick.bind(that, color[0])} src={color[0]}/></div>
			);
		});
		var Overlay = <Popover id='chooseImgVariation'>{images}</Popover>;
		return (
			<OverlayTrigger trigger='click' rootClose placement='right' overlay={Overlay}>
				<div style={imgDivStyle}>
					<img width={100} height={62} src={this.state.selectedImage} alt='' style={imgStyle}/>
				</div>
			</OverlayTrigger>
		);
	},
	onImageClick: function (url) {
		this.setState({
			selectedImage: url
		});
		GameCreatorAction.addPieceByUrl({
			url: url
		});
	}
});

module.exports = GameCreatorElement;
