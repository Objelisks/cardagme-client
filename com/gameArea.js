let React = require('react');
let redux = require('react-redux');
let actions = require('../js/actions.js');
let Zone = require('./zone.js');
let Menu = require('./menu.js');

let host = 'localhost:8082';

let networker = require('../js/networker.js');
networker.connect(host);

let onClick = function(props) {
    return (e) => {
        e.preventDefault();
        props.dispatch(actions.menuCancelAction());
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
    
    return (
        <div onMouseDown={onClick(props)} onContextMenu={onClick(props)} className="game">
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