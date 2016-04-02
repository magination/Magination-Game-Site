var React = require('react');
var URLS = require('../../config/config').urls;
var NavigationAction = require('../../actions/NavigationAction');
var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');
var GameCreator = require('../molecules/GameCreator.molecule');

function getLoginProfile(){
    return LoginStore.getLoginProfile();
}

var GameForm = React.createClass({
    getInitialState: function() {
        return {
            title : "",
            description : ""
        };
    },
    componentWillMount: function(){ /*Redirects to login if the user is not logged in*/
        if(!LoginStore.getLoginState()){
            NavigationAction.navigate({
                destination: "/login"
            });
        }
    },
    render: function(){
        return(
        <div className="col-md-4 col-md-offset-4">
            <h2 className="text-center form-uploadGame-heading">Upload game</h2>
            <form className="form-signin" onSubmit={this._postGame}>
                <label htmlFor="inputForTitle" className="sr-only">Enter a name for your game</label>
                <input value={this.state.title} onChange={this._onTitleChanged} type="text" id="inputForTitle" className="form-control" placeholder="Game name" required/>
                <label htmlFor="inputGameDescription" className="sr-only">Enter a description for your game</label>
                <textarea value={this.state.description} onChange={this._onDescriptionChanged} type="text" id="inputGameDescription" className="form-control" placeholder="Game description" required/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Upload game</button>
            </form>
        </div>
        );
    },
    _onTitleChanged: function(e){
        this.setState({
            title: e.target.value
        });
    },
    _onDescriptionChanged: function(e){
        this.setState({
            description: e.target.value
        });
    },
    _postGame: function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: URLS.api.games,
            data: JSON.stringify({
                title: this.state.title,
                shortDescription: this.state.description,
                mainDescription: this.state.description
            }),
            headers: {
                "Authorization": LoginStore.getToken()
            },
            contentType: "application/json",
            dataType: "json",
            success: this.didPost
        });
    },
    didPost: function(){
        alert("success");
    }
});


module.exports = GameForm;