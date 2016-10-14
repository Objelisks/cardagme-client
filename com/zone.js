let React = require('react');
let Deck = require('./zones/deck.js');
let Stack = require('./zones/stack.js');
let Hand = require('./zones/hand.js');

let Zone = React.createClass({
    dropHandler: function(obj) {
        console.log('dropped here', obj);
    },
    render: function() {
        let type = this.props.type;
        let Element = Stack;
        switch(type) {
            case "deck":
                Element = Deck;
                break;
            case "stack":
                Element = Stack;
                break;
            case "hand":
                Element = Hand;
                break;
        }
        return (
            <Element {...this.props} key={this.props.id}></Element>
        );
    }
});

module.exports = Zone;