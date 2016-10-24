let React = require('react');
let DraggableCard = require('../drag.js').DraggableCard;

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
    
    return (
        <div data-gameid={props.id} className={'hand ' + (props.className || '')} style={style}>
            {cards.map((card, i) => <DraggableCard key={card.id} card={card} zone={props} pos={{x: i*handCardSeparation + margin, y: margin}}></DraggableCard>)}
            <p>hand</p>
        </div>
    );
};

module.exports = Hand;