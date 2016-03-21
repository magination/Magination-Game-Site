var React = require('react');
var URLS = require('../../config/config').urls;
var browserHistory = require('react-router').browserHistory;
var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');

var GameForm = React.createClass({
    getInitialState: function() {
        return {
            username : "",
            gameName : "",
            description : "",
            message : "",
            showMessage: false
        };
    },
    componentWillMount: function(){ /*Redirects to login if the user is not logged in*/
        if(!LoginStore.getLoginState()){
            LoginAction.setOnLoginRedirectDestination({
                destination: 'upload'
            });
            browserHistory.push('login');
        }
    },
    render: function(){
        return(
        <div className="col-md-4 col-md-offset-4">
            <h2 className="text-center form-uploadGame-heading">Upload game</h2>
            <div>
                {this.state.showMessage ?
                    <h6 className ="text-center">{this.state.message}</h6> : null}
            </div>
            <form className="form-signin" onSubmit={this._postGame}>
                <label htmlFor="inputUsername" className="sr-only">Enter your username</label>
                <input value={this.state.username} onChange={this._onUsernameChanged} type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus/>
                <label htmlFor="inputGameName" className="sr-only">Enter a name for your game</label>
                <input value={this.state.title} onChange={this._onGameNameChanged} type="text" id="inputGameName" className="form-control" placeholder="Game name" required/>
                <label htmlFor="inputGameDescription" className="sr-only">Enter a description for your game</label>
                <textarea value={this.state.description} onChange={this._onDescriptionChanged} type="text" id="inputGameDescription" className="form-control" placeholder="Game description" required/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Upload game</button>
            </form>
        </div>
        );
    },
    _onUsernameChanged: function(e){
        this.setState({
            username: e.target.value
        });
    },
    _onGameNameChanged: function(e){
        this.setState({
            gameName: e.target.value
        });
    },
    _onDescriptionChanged: function(e){
        this.setState({
            description: e.target.value
        });
    },
    _postGame: function(e) {
        console.log("owner: "+this.state.username+". title"+ this.state.gameName+" descr. "+this.state.description);
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: URLS.api.games,
            data: JSON.stringify({
                owner: this.state.username,
                title: this.state.gameName,
                description: this.state.description
            }),
            contentType: "application/json",
            dataType: "json",
            success: this.didPost,
            error: this.errorPosting
        });
    },
    didPost: function(){
        this.setState({
            message : "Game was uploaded!",
            showMessage : true
        })
    },
    errorPosting: function(data){
        this.setState({
            message : "Error!!!",
            showMessage : true
        })
    },
    _hideMessage: function(e) {
        e.preventDefault();

        this.setState({
            showMessage : false
        })
    }
});


module.exports = GameForm;