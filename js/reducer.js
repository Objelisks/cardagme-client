let redux = require('redux');
let actions = require('./actionTypes.js');

let initialCards = {
   1: {id: '1', name:'hello'},
   2: {id: '2', name:'hello'},
   3: {id: '3', name:'hello'},
   4: {id: '4', name:'hello'},
   5: {id: '5', name:'hello'},
   6: {id: '6', name:'hello'},
   7: {id: '7', name:'hello'},
   8: {id: '8', name:'hello'},
   9: {id: '9', name:'hello'}
};
let initialZones = {
   10: {id: '10', name:'deck', type:'deck', pos:{x: 100, y: 400}, cards: ['1', '2', '3', '4'], moveToAble: true},
   11: {id: '11', name:'hand', type:'hand', pos:{x: 400, y: 450}, cards: ['5', '6', '7', '8', '9'], moveToAble: true}
};
let initialMenus = {
   // 12: {id: '12', menuType: 'card', pos:{x:100, y:200}}
};

let cards = (state = initialCards, action) => {
   switch(action.type) {
      case actions.CARD_PREVIEW:
         let newState = Object.assign({}, state,
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
   switch(action.type) {
      case actions.MOVE:
         let newState = Object.assign({}, state, 
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

let genMenuId = (() => {
  let id = 0;
  return () => {
     id += 1;
     return `menu${id}`;
  }
})();

let menus = (state = initialMenus, action) => {
   let newState, id;
   switch(action.type) {
      
      case actions.MENU:
         // open menu
         id = action.id || genMenuId();
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

let reducer = redux.combineReducers({
   cards, zones, menus
});


module.exports = reducer;