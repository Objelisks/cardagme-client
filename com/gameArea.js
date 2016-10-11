let React = require('react');


let host = 'localhost:8082';

let networker = require('../js/networker.js');
networker.connect(host);

let GameArea = React.createClass({
    getInitialState: function() {
        return {cards:[], zones:[]};
    },
    render: function() {
        return (
            <div className="game">{this.props.children}</div>
        );
    }
});

module.exports = GameArea;