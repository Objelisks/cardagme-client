let React = require('react');
let Draggable = require('react-draggable');

let Card = React.createClass({
    render: function() {
        
        return (
            <Draggable>
                <div className="card"></div>
            </Draggable>
        );
    }
});

module.exports = Card;