let React = require('react');
let redux = require('react-redux');
let actions = require('../js/actions.js');


let handleClick = function(props) {
    return function(e) {
        if(e.button === 2) {
            e.preventDefault();
            e.stopPropagation();
            props.dispatch(actions.menuAction({card: props.card.id, pos: {x: e.clientX, y: e.clientY}, menuType: 'hand-context'}));
        }
    };
};

let Card = (props) => {
    return (
        <div {...props} onContextMenu={handleClick(props)} data-gameid={props.card.id} className={'card ' + (props.className || '')}></div>
    );
};

let ActiveCard = redux.connect()(Card);

module.exports = ActiveCard;