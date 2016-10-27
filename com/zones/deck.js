import React from 'react';
import Card from '../card.js';
import DraggableCard from '../drag.js';

let Deck = (props) => {
    let cards = props.cards;
    let topCard = cards[cards.length-1];
    let restCards = cards.slice(0, cards.length-1);
    
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
                {restCards.map((card, i) => <Card key={card.id} {...card} zone={props} style={{top: -i*2+8, left: -i*2+8}}></Card>)}
                <DraggableCard key={topCard.id} {...topCard} zone={props} pos={{y: -restCards.length*2+8, x: -restCards.length*2+8}}></DraggableCard>
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

export default Deck;