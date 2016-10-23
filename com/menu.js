let React = require('react');
let redux = require('react-redux');
let actions = require('../js/actions.js');

let menuWidth = 84;

let menuTypes = {
    'hand-context': [
        {text:'play card', click: (props) => {
            return (e) => {
                console.log('play card', props.card);
            }
        }, default: true},
        {text:'change zone',
        over: (props) => {
            return (e) => {
                props.dispatch(actions.menuChildAction({
                    id: props.id,
                    card: props.card,
                    index: 1,
                    pos: {x: menuWidth, y: -23},
                    menuType: 'zone-context'}));
            }
        },
        out: (props) => {
            return (e) => {
                props.dispatch(actions.menuChildAction({
                    id: props.id,
                    cancel: true}));
            }
        },
        click: (props) => {
            return (e) => {
                e.preventDefault();
                e.stopPropagation();
            }
        }},
        {text:'reveal card', click: (props) => {
            return (e) => {
                console.log('reveal card', props.card);
            }
        }}
    ],
    'deck-context': [
        {text:'draw card', click: (props) => {
            return (e) => {
                console.log('play card');
            }
        }, default: true},
        {text:'shuffle deck', click: (props) => {
            return (e) => {
                console.log('play card');
            }
        }}
    ],
    'zone-context': [
        {text: 'deck', click: (props) => {
            return (e) => {
                console.log(`card ${props.card.id} to deck`);
                props.dispatch(actions.menuCancelAction());
            }
        }},
        {text: 'hand', click: (props) => {
            return (e) => {
                console.log(`card ${props.card.id} to hand`);
                props.dispatch(actions.menuCancelAction());
            }
        }},
    ]
};

let emptyMenu = [
    {text:'empty'}
];

let Menu = (props) => {
    let menuData = menuTypes[props.menuType] || emptyMenu;
    let style = {
      transform: `translate(${props.pos.x}px, ${props.pos.y}px)`
    };
    let menuChild = undefined;
    if(props.child) {
        menuChild = <ActiveMenu {...props.child} key={props.id+'sub'}></ActiveMenu>;
    }
    
    return (
        <div className='menu' style={style}>
            {menuData.map((line, i) => {
                let handlers = {};
                if(line.click) handlers.onMouseDown = line.click(props);
                if(line.over) handlers.onMouseEnter = line.over(props);
                if(line.out) handlers.onMouseLeave = line.out(props);
                if(props.child && i === props.child.index) {
                    return <div {...handlers} key={i}>{line.text}{menuChild}</div>;
                } else {
                    return <div {...handlers} key={i}>{line.text}</div>;
                }
            })}
        </div>
    );
};

let ActiveMenu = redux.connect()(Menu);

module.exports = ActiveMenu;