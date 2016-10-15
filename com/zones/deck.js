let React = require('react');
let Card = require('../card.js');
let DraggableCard = require('../drag.js').DraggableCard;

let Deck = (props) => {
    let cards = props.cards;
    let topCard = cards[0];
    let restCards = cards.slice(1);
    
    let style = props.pos ? {left: props.pos.x, top: props.pos.y, position: 'absolute'} : {};
        
    let deckProps = {
        'data-gameid': props.id,
        'className': 'deck ' + (props.className || ''),
        'style': style
    };
        
    if(topCard) { // deck has at least one card in it
        return (
            <div {...deckProps} >
                {restCards.map((card, i) => <Card key={card.id} card={card} style={{top: -i*2+8, left: -i*2+8}}></Card>)}
                <DraggableCard key={topCard.id} card={topCard} pos={{y: -restCards.length*2+8, x: -restCards.length*2+8}}></DraggableCard>
                <p style={{top: 250, left: 90, position: 'relative'}}>deck</p>
            </div>
        );
    } else { // deck is empty
        return (
            <div {...deckProps} >
                <p style={{top: 250, left: 90, position: 'relative'}}>deck</p>
            </div>
        );
    }
};

module.exports = Deck;