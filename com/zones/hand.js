let React = require('react');
let Card = require('../card.js');
let Draggable = require('../drag.js');
let DraggableCard = Draggable(Card);

module.exports = React.createClass({
    displayName:'Hand',
    render: function() {
        let cards = this.props.cards;
        let style = this.props.pos ? 
            {left: this.props.pos.x, top: this.props.pos.y, position: 'absolute'} : {};
            
        style = Object.assign(style, {
            width: cards.length * 30 + 16 + 175
        });
        
        return (
            <div className="hand" style={style}>
                {cards.map((card, i) => <DraggableCard key={card.key} data-card={card} pos={{x: i*30+8, y: 8}}></DraggableCard>)}
                <p style={{top: 250, left: 300, position: 'relative'}}>hand</p>
            </div>
        );
    }
})