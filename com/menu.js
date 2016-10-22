let React = require('react');

let menuTypes = {
    'hand-context': [
        {text:'play card'},
        {text:'change zone'},
        {text:'reveal card'}
    ],
    'deck-context': [
        {text:'draw card'},
        {text:'shuffle deck'}
    ]
};


let Menu = (props) => {
    let menuData = menuTypes[props.type];
    let style = {
      transform: `translate(${props.pos.x}, ${props.pos.y})`  
    };
    return (
        <div className='menu' style={style}>
            {menuData.map(line => <p>{line.text}</p>)}
        </div>
    );
};

module.exports = Menu;