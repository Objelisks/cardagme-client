let React = require('react');
let ReactDOM = require('react-dom');

let Provider = require('react-redux').Provider;
let store = require('./store.js');

let GameArea = require('../com/gameArea.js');


let host = 'localhost:8082';

let networker = require('../js/networker.js');
networker.connect(host, store);

ReactDOM.render(
    <Provider store={store}><GameArea></GameArea></Provider>,
    document.getElementById('cardgame')
);