let React = require('react');
let Card = require('../card.js');
let Draggable = require('../drag.js');
let DraggableCard = Draggable(Card);

module.exports = React.createClass({
    displayName:'Deck',
    render: function() {
        let cards = this.props.cards;
        let topCard = cards[0];
        let restCards = cards.slice(1);
        
        let style = this.props.pos ? 
            {left: this.props.pos.x, top: this.props.pos.y, position: 'absolute'} : {};
        
        return (
            <div className="deck" style={style}>
                {restCards.map((card, i) => <Card key={card.key} data-card={card} style={{top: -i*2+8, left: -i*2+8}}></Card>)}
                <DraggableCard key={topCard.key} data-card={topCard} pos={{y: -restCards.length*2+8, x: -restCards.length*2+8}}></DraggableCard>
                <p style={{top: 250, left: 90, position: 'relative'}}>deck</p>
            </div>
        );
    }
})