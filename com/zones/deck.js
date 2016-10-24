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
    
    // todo: render a number of cards, don't map actual card ids to card divs
    if(topCard) { // deck has at least one card in it
        return (
            <div {...deckProps} >
                {restCards.map((card, i) => <Card key={card.id} card={card} zone={props} style={{top: -i*2+8, left: -i*2+8}}></Card>)}
                <DraggableCard key={topCard.id} card={topCard} zone={props} pos={{y: -restCards.length*2+8, x: -restCards.length*2+8}}></DraggableCard>
                <p>deck</p>
            </div>
        );
    } else { // deck is empty
        return (
            <div {...deckProps} >
                <p>deck</p>
            </div>
        );
    }
};

module.exports = Deck;