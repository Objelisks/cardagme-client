import React from 'react';
import DraggableCard from '../drag.js';

let handCardSeparation = 30;
let margin = 8;
let minWidth = 175;

let Hand = (props) => {
    let cards = props.cards;
    let style = props.pos ? 
        {left: props.pos.x, top: props.pos.y, position: 'absolute'} : {};
        
    style = Object.assign(style, {
        width: cards.length * handCardSeparation + margin*2 + minWidth,
    });
    
    // find the preview card, move other cards out of the way
    let previewAside = 0;
    
    return (
        <div data-gameid={props.id} className={'hand ' + (props.className || '')} style={style}>
            {cards.map((card, i) => {
                let render = <DraggableCard key={card.id} {...card} zone={props} pos={{x: i*handCardSeparation + margin + previewAside, y: margin}}></DraggableCard>;
                if(card.preview) {
                    previewAside = minWidth;
                }
                return render;
            })}
            <p>hand</p>
        </div>
    );
};

export default Hand;