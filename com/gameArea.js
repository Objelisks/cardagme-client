let React = require('react');
let Zone = require('./zone.js');

let host = 'localhost:8082';

let networker = require('../js/networker.js');
networker.connect(host);

let gameLogic = require('../js/logic/game.js');

let GameArea = React.createClass({
    displayName:'GameArea',
    getInitialState: function() {
        return {
            cards: {
                1: {key: 1, name:'hello'},
                2: {key: 2, name:'hello'},
                3: {key: 3, name:'hello'},
                4: {key: 4, name:'hello'},
                5: {key: 5, name:'hello'},
                6: {key: 6, name:'hello'},
                7: {key: 7, name:'hello'},
                8: {key: 8, name:'hello'},
                9: {key: 9, name:'hello'}
            },
            zones: {
                10: {key: 10, name:'deck', type:'deck', pos:{x: 100, y: 400}, cards: [1, 2, 3, 4]},
                11: {key: 11, name:'hand', type:'hand', pos:{x: 400, y: 450}, cards: [5, 6, 7, 8, 9]}
            }};
    },
    componentDidMount: function() {
        /*networker.addEventListener('command', (cmd) => {
            this.applyCommand(cmd);
        });*/
        
    },
    render: function() {
        let zones = Object.keys(this.state.zones).map(zoneId => {
            let zone = this.state.zones[zoneId];
            return <Zone {...zone} cards={zone.cards.map(cardId => this.state.cards[cardId])}></Zone>;
        });
        
        return (
            <div className="game">
                {zones}
            </div>
        );
    }
});

module.exports = GameArea;