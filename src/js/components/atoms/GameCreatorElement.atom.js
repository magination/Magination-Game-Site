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
	top: '0px',
	right: '0px',
	height: '100%'
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
				<div key={color[0].url + '' + index}><img width={100} height={65} onClick={that.onImageClick.bind(that, color[0].url)} src={color[0].url}/></div>
			);
		});
		var Overlay = <Popover id='chooseImgVariation'>{images}</Popover>;
		return (
			<div>
				<div style={imgDivStyle} onClick={this.onPieceClick}>
					<div style={{width: '80%'}}>
						<img src={this.state.selectedImage} alt='' style={imgStyle}/>
					</div>
					<div style={chevronDivStyle} onClick={function (e) { e.stopPropagation(); }}>
						<OverlayTrigger trigger='click' rootClose placement='right' overlay={Overlay}>
								<p style={{color: Color.blue, lineHeight: '65px', fontSize: '20px'}}><Glyphicon glyph='chevron-right'/></p>
						</OverlayTrigger>
					</div>
				</div>
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
