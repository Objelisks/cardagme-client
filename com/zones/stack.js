import React from 'react';
import Card from '../card.js';
import DraggableCard from '../drag.js';

let minWidth = 175;

let Stack = (props) => {
    let cards = props.cards;

    let style = props.pos ? {left: props.pos.x, top: props.pos.y, position: 'absolute'} : {};

    let stackProps = {
        'data-gameid': props.id,
        'className': 'stack ' + (props.className || ''),
        'style': style
    };

    let previewAside = 0;

    // todo: render a number of cards, don't map actual card ids to card divs
    return (
        <div {...stackProps} >
            {props.cards.map((card, i) => {
              let render = <DraggableCard key={card.id} {...card} zone={props} pos={{x: i*16+8+previewAside, y: i*16+8}}></DraggableCard>;
              if(card.preview) {
                  previewAside = minWidth;
              }
              return render;
            })}
        </div>
    );
};

export default Stack;
