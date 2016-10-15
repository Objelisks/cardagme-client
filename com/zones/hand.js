let React = require('react');
let DraggableCard = require('../drag.js').DraggableCard;

let Hand = (props) => {
    let cards = props.cards;
    let style = props.pos ? 
        {left: props.pos.x, top: props.pos.y, position: 'absolute'} : {};
        
    style = Object.assign(style, {
        width: cards.length * 30 + 16 + 175
    });
    
    return (
        <div data-gameid={props.id} className={'hand ' + (props.className || '')} style={style}>
            {cards.map((card, i) => <DraggableCard key={card.id} card={card} pos={{x: i*30+8, y: 8}}></DraggableCard>)}
            <p style={{top: 250, left: 300, position: 'relative'}}>hand</p>
        </div>
    );
};

module.exports = Hand;