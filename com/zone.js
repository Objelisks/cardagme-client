import React from 'react';
import Deck from './zones/deck.js';
import Stack from './zones/stack.js';
import Hand from './zones/hand.js';

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

export default Zone;
