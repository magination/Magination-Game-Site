var React = require('react');

var GameForm = React.createClass({
    render: function(){
        return(
        <div className="col-md-4 col-md-offset-4">
            <h2 className="text-center form-uploadGame-heading">Upload game</h2>
            <div>
                {this.state.showMessage ?
                    <h6 className ="text-center">Game was uploaded!</h6> : null}
            </div>
            <form className="form-signin" onSubmit={this._postGame}>
                <label htmlFor="inputUsername" className="sr-only">Enter your username</label>
                <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus/>
                <label htmlFor="inputGameName" className="sr-only">Enter a name for your game</label>
                <input type="text" id="inputGameName" className="form-control" placeholder="Game name" required/>
                <label htmlFor="inputGameDescription" className="sr-only">Enter a description for your game</label>
                <textarea type="text" id="inputGameDescription" className="form-control" placeholder="Game description" required/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Upload game</button>
            </form>
        </div>
        );
    },
    getInitialState: function() {
        return { showMessage: false };
    },
    _postGame: function(e) {
        e.preventDefault();

        this.setState({
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