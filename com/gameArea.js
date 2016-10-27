import React from 'react';
import {connect} from 'react-redux';
import actions from '../js/actions.js';
import Zone from './zone.js';
import Card from './card.js';

let onClick = function(props) {
    return (e) => {
        // close all menus when clicking on the background
        props.dispatch(actions.menuCancelAction());
        e.preventDefault();
    };
};

let GameArea = (props) => {
    let {cards, zones} = props;
    
    let zoneElements = Object.keys(zones).map(zoneId => {
        let zone = zones[zoneId];
        return <Zone {...zone} key={zone.id} cards={zone.cards.map(cardId => cards[cardId])}></Zone>;
    });
    
    let cardPreviewId = Object.keys(cards).filter(id => cards[id].preview)[0];
    let cardPreview = undefined;
    if(cardPreviewId) {
        cardPreview = <Card isPreview={true} card={cards[cardPreviewId].card} style={{top: 8, left: 8}}></Card>;
    }
    
    return (
        <div onMouseDown={onClick(props)} onContextMenu={onClick(props)} className="game">
            {zoneElements}
            {cardPreview}
        </div>
    );
};

let ActiveGameArea = connect(
    (state) => {
        return {
            cards: state.cards,
            zones: state.zones,
            menus: state.menus
        }
    })(GameArea);

export default ActiveGameArea;