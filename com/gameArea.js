let React = require('react');
let redux = require('react-redux');
let Zone = require('./zone.js');

let host = 'localhost:8082';

let networker = require('../js/networker.js');
networker.connect(host);

let gameLogic = require('../js/logic/game.js');

let GameArea = ({cards, zones}) => {
    let zoneElements = Object.keys(zones).map(zoneId => {
        let zone = zones[zoneId];
        return <Zone {...zone} key={zone.id} cards={zone.cards.map(cardId => cards[cardId])}></Zone>;
    });
    
    return (
        <div className="game">
            {zoneElements}
        </div>
    );
};

let ConnectedGameArea = redux.connect(
    (state) => {
        return {
            cards: state.cards,
            zones: state.zones
        }
    })(GameArea);

module.exports = ConnectedGameArea;