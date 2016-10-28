import React from 'react';
import {connect} from 'react-redux';
import actions from '../js/actions.js';
import {doDefaultAction} from './menu.js';


let handleMenu = (props) => {
    return (e) => {
        if(e.button === 2) {
            // rightclick opens context menu
            //let rect = e.target.getBoundingClientRect();
            props.dispatch(actions.menuAction({card: props.id, pos: {x: e.clientX, y: e.clientY}, menuType: props.zone.type}));
            e.preventDefault();
            e.stopPropagation();
        }
    };
};

let handleActivate = (props) => {
    return (e) => {
        doDefaultAction({dispatch: props.dispatch, menuType: props.zone.type, zones: props.zones, card: props.id});
    };
};

let handlePreviewEnter = (props) => {
    return (e) => {
        props.dispatch(actions.previewCardAction({id: props.id}));
    };
};

let handlePreviewLeave = (props) => {
    return (e) => {
        if(!props.held) {
            props.dispatch(actions.previewCardAction({cancel: true}));
        }
    };
};

let Card = (props) => {
    let handlers = {
        onDoubleClick: handleActivate(props),
        onMouseEnter: handlePreviewEnter(props),
        onMouseLeave: handlePreviewLeave(props),
        onContextMenu: handleMenu(props)
    };

    if(props.isPreview) {
        return (
            <div {...props} data-gameid={props.id} className={'card ' + (props.className || '')}>
                {props.card.name}
            </div>
        );
    } else {
        return (
            <div {...props} {...handlers} data-gameid={props.id} className={'card ' + (props.className || '')}>
                {props.card.name}
            </div>
        );
    }
};

let ActiveCard = connect((state) => {
    return {zones: state.zones}
})(Card);

export default ActiveCard;
