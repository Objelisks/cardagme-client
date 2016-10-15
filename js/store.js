let redux = require('redux');
let reducer = require('./reducer.js');

module.exports = redux.createStore(reducer);