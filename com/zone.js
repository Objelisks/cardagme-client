import React from 'react';
import Deck from './zones/deck.js';
import Stack from './zones/stack.js';
import Hand from './zones/hand.js';

let zones = {
    'deck': Deck,
    'stack': Stack,
    'hand': Hand
}

let Zone = (props) => {
    let type = props.type;
    let Element = zones[type];

    return (
        <Element {...props} className={'zone ' + (props.className || '')}></Element>
    );
};

export default Zone;
