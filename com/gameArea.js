let React = require('react');
let redux = require('react-redux');
let actions = require('../js/actions.js');
let Zone = require('./zone.js');
let Card = require('./card.js');
let {Menu} = require('./menu.js');

let onClick = function(props) {
    return (e) => {
        // close all menus when clicking on the background
        props.dispatch(actions.menuCancelAction());
        e.preventDefault();
    };
};

let GameArea = (props) => {
    let {cards, zones, menus} = props;
    
    let zoneElements = Object.keys(zones).map(zoneId => {
        let zone = zones[zoneId];
        return <Zone {...zone} key={zone.id} cards={zone.cards.map(cardId => cards[cardId])}></Zone>;
    });
    
    let menuElements = Object.keys(menus).map(menuId => {
        let menu = menus[menuId];
        return <Menu {...menu} key={menu.id}></Menu>;
    });
    
    let cardPreviewId = Object.keys(cards).filter(id => cards[id].preview)[0];
    let cardPreview = undefined;
    if(cardPreviewId) {
        cardPreview = <Card card={cards[cardPreviewId]} style={{top: 8, left: 8}}></Card>;
    }
    
    return (
        <div onMouseDown={onClick(props)} onContextMenu={onClick(props)} className="game">
            {zoneElements}
            {menuElements}
            {cardPreview}
        </div>
    );
};

let ActiveGameArea = redux.connect(
    (state) => {
        return {
            cards: state.cards,
            zones: state.zones,
            menus: state.menus
        }
    })(GameArea);

module.exports = ActiveGameArea;