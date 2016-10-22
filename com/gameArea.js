let React = require('react');
let redux = require('react-redux');
let Zone = require('./zone.js');

let host = 'localhost:8082';

let networker = require('../js/networker.js');
networker.connect(host);

let GameArea = ({cards, zones, menus}) => {
    let zoneElements = Object.keys(zones).map(zoneId => {
        let zone = zones[zoneId];
        return <Zone {...zone} key={zone.id} cards={zone.cards.map(cardId => cards[cardId])}></Zone>;
    });
    
    let menuElements = Object.keys(menus).map(menuId => {
        let menu = menus[menuId];
        return <Menu {...menu} key={menu.id}></Menu>;
    });
    
    return (
        <div className="game">
            {zoneElements}
            {menuElements}
        </div>
    );
};

let ConnectedGameArea = redux.connect(
    (state) => {
        return {
            cards: state.cards,
            zones: state.zones,
            menus: state.menus
        }
    })(GameArea);

module.exports = ConnectedGameArea;