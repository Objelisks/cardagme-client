import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './store.js';

import GameArea from '../com/gameArea.js';
import networker from '../js/networker.js';


//let host = 'https://localhost:8082';
let host = 'https://' + window.location.hostname + ':8082';

networker.connect(host, store);

ReactDOM.render(
    <Provider store={store}><GameArea></GameArea></Provider>,
    document.getElementById('cardgame')
);