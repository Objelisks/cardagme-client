import React from 'react';
import {connect} from 'react-redux';
import actions from '../js/actions.js';

import {Menu} from './menu.js';

let handleMenu = (props) => {
    return (e) => {
        if(e.button === 2) {
            // rightclick opens context menu
            let rect = e.target.getBoundingClientRect();
            props.dispatch(actions.menuAction({card: props.id, pos: {x: e.clientX-rect.left, y: e.clientY-rect.top}, menuType: props.zone.type}));
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
        props.dispatch(actions.previewCardAction({id: props.id}));
    };
};

let handlePreviewLeave = (props) => {
    return (e) => {
        if(!props.held) {
            props.dispatch(actions.previewCardAction({id: props.id, cancel: true}));
        }
    };
};

let Card = (props) => {
    let handlers = {
        onMouseEnter: handlePreviewEnter(props),
        onMouseLeave: handlePreviewLeave(props),
        onContextMenu: handleMenu(props)
    };
    
    let menuElements = Object.keys(props.menus).filter(menuId => props.menus[menuId].card === props.id).map(menuId => {
        let menu = props.menus[menuId];
        return <Menu {...menu} key={menu.id}></Menu>;
    });
    
    if(props.isPreview) {
        return (
            <div {...props} data-gameid={props.id} className={'card ' + (props.className || '')}>
                {props.card.name}
            </div>
        );
    } else {
        return (
            <div {...props} {...handlers} data-gameid={props.id} className={'card ' + (props.className || '')}>
                {menuElements}
                {props.card.name}
            </div>
        );
    }
};

let ActiveCard = connect((state) => {
    return {
        menus: state.menus
    };
})(Card);

export default ActiveCard;