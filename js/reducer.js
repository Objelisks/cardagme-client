import {combineReducers} from 'redux';
import actions from './actionTypes.js';
import {menuId} from './ids.js';

let initialCards = {
};
let initialZones = {
   10: {id: '10', name:'deck', type:'deck', pos:{x: 100, y: 400}, cards: [], moveToAble: true},
   11: {id: '11', name:'hand', type:'hand', pos:{x: 400, y: 450}, cards: [], moveToAble: true}
};
let initialMenus = {
   // 12: {id: '12', menuType: 'card', pos:{x:100, y:200}}
};

let cards = (state = initialCards, action) => {
   let newState = null;
   switch(action.type) {
      
      case actions.CARD_NEW:
         newState = Object.assign({}, state,
            {[action.id]: {id: action.id, card: action.card}});
         return newState;
         
      case actions.CARD_PREVIEW:
         newState = Object.assign({}, state,
            Object.keys(state).reduce((pre, cardId) => {
               if(!action.cancel && cardId === action.id) {
                  pre[cardId] = Object.assign({}, state[cardId], {preview: true});
               } else {
                  pre[cardId] = Object.assign({}, state[cardId], {preview: undefined});
               }
               return pre;
            }, {}));
         return newState;
   }
   
   return state;
};

let zones = (state = initialZones, action) => {
   let newState = null;
   switch(action.type) {
      
      case actions.CARD_NEW: // cardnew reuses same props from move to initialize position
      case actions.CARD_MOVE:
         newState = Object.assign({}, state, 
            Object.keys(state).reduce((pre, zoneId) => {
               let zone = state[zoneId];
               if(zoneId !== action.target) {
                  // remove card from any zones that shouldn't contain it
                  pre[zoneId] = Object.assign({}, zone, {cards: zone.cards.filter(id => id !== action.id)});
               } else {
                  // add card to target zone if not already there
                  if(zone.cards.indexOf(action.id) === -1) {
                     pre[zoneId] = Object.assign({}, zone, {cards: zone.cards.concat(action.id)});
                  }
               }
               return pre;
            }, {}));
         return newState;
   }
   return state;
};

let menus = (state = initialMenus, action) => {
   let newState, id;
   switch(action.type) {
      
      case actions.MENU_NEW:
         // open menu
         id = action.id || menuId();
         newState = Object.assign({}, state,
            {[id]: Object.assign({id: id}, action)});
         return newState;
         
      case actions.MENU_CHILD:
         id = action.id;
         if(action.cancel) {
            // cancel submenu
            newState = Object.assign({}, state,
               {[id]: Object.assign({}, state[id], {child: undefined})});
         } else {
            // open submenu
            newState = Object.assign({}, state,
               {[id]: Object.assign({}, state[id], {child: action})});
         }
         return newState;
         
      case actions.MENU_CANCEL:
         // remove all menus
         return {};
   }
   return state;
};

let reducer = combineReducers({
   cards, zones, menus
});


export default reducer;