import React from 'react';
import {connect} from 'react-redux';
import actions from '../js/actions.js';

let menuWidth = 86;
let menuItemHeight = 20;

let changeZone = (props) => {
    return {
        text:'change zone',
        onMouseEnter: (e) => {
            props.dispatch(actions.menuChildAction({
                id: props.id,
                card: props.card,
                index: 1,
                pos: {x: menuWidth, y: -menuItemHeight},
                zones: props.zones,
                menuType: 'zone-context'}));
        },
        onMouseLeave: (e) => {
            props.dispatch(actions.menuChildAction({
                id: props.id,
                cancel: true}));
        },
        onMouseDown: (e) => {
            e.preventDefault();
            e.stopPropagation();
        }
    };
};

let menuTypes = (props) => {
    return {
    'hand': [
        {text:'play card',
        onMouseDown: (e) => {
            console.log('play card', props.card);
            props.dispatch(actions.menuCancelAction());
            e.stopPropagation();
        }, default: true},
        
        changeZone(props),
        
        {text:'reveal card',
        onMouseDown: (e) => {
            console.log('reveal card', props.card);
            props.dispatch(actions.menuCancelAction());
            e.stopPropagation();
        }}
    ],
    
    'deck': [
        {text:'draw card',
        onMouseDown: (e) => {
            console.log('draw card');
            // gets first hand zone (todo: get first hand zone owned by player)
            let handZoneId = Object.keys(props.zones).filter(id => props.zones[id].type === 'hand')[0];
            props.dispatch(actions.moveCardAction({id: props.card, target: handZoneId}));
            props.dispatch(actions.menuCancelAction());
            e.stopPropagation();
        }, default: true},
        
        changeZone(props),
        
        {text:'shuffle deck',
        onMouseDown: (e) => {
            console.log('shuffle deck');
            props.dispatch(actions.menuCancelAction());
            e.stopPropagation();
        }}
    ],
    
    // dynamic submenu contains each available zone
    'zone-context': (() => {
        let movableZones = Object.keys(props.zones)
            .filter(zId => props.zones[zId].moveToAble && props.zones[zId].cards.indexOf(props.card) === -1)
            .map(zId => props.zones[zId]);
        return movableZones.map(zone => {
            return {
                text: zone.name,
                onMouseDown: (e) => {
                    console.log(`card ${props.card} to ${zone.name}`);
                    props.dispatch(actions.moveCardAction({id: props.card, target: zone.id}));
                    props.dispatch(actions.menuCancelAction());
                    e.stopPropagation();
                }
            }
        })
    })()
}};

let emptyMenu = [
    {text:'empty'}
];

let Menu = (props) => {
    let menuData = menuTypes(props)[props.menuType] || emptyMenu;
    
    let style = {
      transform: `translate(${props.pos.x}px, ${props.pos.y}px)`
    };
    let menuChild = undefined;
    if(props.child) {
        menuChild = <ActiveMenu {...props.child}></ActiveMenu>;
    }
    
    return (
        <div className='menu' style={style}>
            {menuData.map((line, i) => {
                // submenu is a child of the menu option that created it (so that mouseOver works correctly)
                if(props.child && i === props.child.index) {
                    return <div {...line} key={i}>{line.text}{menuChild}</div>;
                } else {
                    return <div {...line} key={i}>{line.text}</div>;
                }
            })}
        </div>
    );
};

let ActiveMenu = connect(
    (state => {
        return {
            zones: state.zones
        }
    }))(Menu);

let doDefaultAction = (props) => {
    let menuData = menuTypes(props)[props.menuType] || emptyMenu;
    menuData[0].onMouseDown();
};

export {
    ActiveMenu as Menu,
    doDefaultAction
}