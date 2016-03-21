var React = require('react');
var URLS = require('../../config/config').urls;
var browserHistory = require('react-router').browserHistory;
var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');

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
            <form className="form-signin" onSubmit={this._postGame}>
                <label htmlFor="inputForTitle" className="sr-only">Enter a name for your game</label>
                <input value={this.state.title} onChange={this._ontitleChanged} type="text" id="inputForTitle" className="form-control" placeholder="Game name" required/>
                <label htmlFor="inputGameDescription" className="sr-only">Enter a description for your game</label>
                <textarea value={this.state.description} onChange={this._onDescriptionChanged} type="text" id="inputGameDescription" className="form-control" placeholder="Game description" required/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Upload game</button>
            </form>
        </div>
        );
    },
    _ontitleChanged: function(e){
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
        console.log(getLoginProfile());
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: URLS.api.games,
            data: JSON.stringify({
                owner: getLoginProfile()._id,
                title: this.state.title,
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
            title: "",
            description: ""
        })
    },
    errorPosting: function(data){
        this.setState({
            message : "Error!!!",
            showMessage : true
        })
    }
});


module.exports = GameForm;