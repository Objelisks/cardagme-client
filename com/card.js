let React = require('react');
let redux = require('react-redux');
let actions = require('../js/actions.js');

let handleMenu = (props) => {
    return (e) => {
        if(e.button === 2) {
            // rightclick opens context menu
            props.dispatch(actions.menuAction({card: props.card.id, pos: {x: e.clientX, y: e.clientY}, menuType: props.zone.type}));
            e.preventDefault();
            e.stopPropagation();
        }
    };
};

let handleActivate = (props) => {
    // todo: recognize a double click?
};

let handlePreviewEnter = (props) => {
    return (e) => {
        props.dispatch(actions.cardPreviewAction({id: props.card.id}));
    }
}

let handlePreviewLeave = (props) => {
    return (e) => {
        props.dispatch(actions.cardPreviewAction({id: props.card.id, cancel: true}));
    }
}

let Card = (props) => {
    return (
        <div {...props} onMouseEnter={handlePreviewEnter(props)} onMouseLeave={handlePreviewLeave(props)} onContextMenu={handleMenu(props)} data-gameid={props.card.id} className={'card ' + (props.className || '')}></div>
    );
};

let ActiveCard = redux.connect()(Card);

module.exports = ActiveCard;