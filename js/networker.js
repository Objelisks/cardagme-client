/* globals fetch */

import actions from './actions.js';
import {cardId} from './ids.js';

let getCard = (host, id) => {
    return host + `/cards/${id}`;
};

let fetchHeaders = {
    method: 'GET',
    mode: 'cors'
};


let connect = (host, store) => {
    return new Promise((resolve, reject) => {
        // register service worker
        if(window.navigator.serviceWorker) {
            console.log('registering service worker...');
            window.navigator.serviceWorker.register('./cacher.js').then(() => {
                console.log('service worker registered');
            });
        }
        
        let fetchCardToDeck = (cardNumber) => {
            return fetch(getCard(host, cardNumber), fetchHeaders)
            .then((data) => data.json())
            .then((res) => {
                let state = store.getState();
                let newCardId = cardId();
                let deckId = Object.keys(state.zones).filter(id => state.zones[id].type === 'deck')[0];
                store.dispatch(actions.newCardAction({card: res.data.attributes, id: newCardId, target: deckId}));
            });
        };
        let drawCards = (n) => {
            let state = store.getState();
            let deckCards = state.zones[Object.keys(state.zones).filter(id => state.zones[id].type === 'deck')[0]].cards;
            let handId = Object.keys(state.zones).filter(id => state.zones[id].type === 'hand')[0];
            deckCards.slice(deckCards.length-n, deckCards.length).forEach((cardId) => {
                store.dispatch(actions.moveCardAction({id: cardId, target: handId}));
            });
        };
        
        // detect network disconnect
        // display information abt conn
        // cache requests (esp card data)
        
        // connect to peers
        
        // listen for events
        
        
        // start game
        
        // get a deck
        // draw some cards
        Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 1].map(id => fetchCardToDeck(id)))
            .then(() => drawCards(5));
        
        resolve();
    });
};

export default {connect};