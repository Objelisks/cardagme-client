let React = require('react');
let ReactDOM = require('react-dom');

let GameArea = require('../com/gameArea.js');
let Card = require('../com/card.js');
let Zone = require('../com/zone.js');

ReactDOM.render(
    <GameArea>
        <Zone name="hand" ownedBy="player1"></Zone>
        <Card ownedBy="player1"></Card>
    </GameArea>,
    document.getElementById('cardgame')
);