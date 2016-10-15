let React = require('react');

let Card = (props) => {
    return (
        <div {...props} data-gameid={props.card.id} className={'card ' + (props.className || '')}></div>
    );
};

module.exports = Card;