let React = require('react');
let Deck = require('./zones/deck.js');
let Stack = require('./zones/stack.js');
let Hand = require('./zones/hand.js');

let Zone = (props) => {
    let type = props.type;
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
        <Element {...props} className={'zone ' + (props.className || '')}></Element>
    );
};

module.exports = Zone;