import actionTypes from './actionTypes.js';

let genericAction = (type) => {
    return (props) => {
        return Object.assign({
            type: type,
        }, props);
    };
};

export default {
    menuAction: genericAction(actionTypes.MENU_NEW),
    menuChildAction: genericAction(actionTypes.MENU_CHILD),
    menuCancelAction: genericAction(actionTypes.MENU_CANCEL),
    previewCardAction: genericAction(actionTypes.CARD_PREVIEW),
    newCardAction: genericAction(actionTypes.CARD_NEW),
    moveCardAction: genericAction(actionTypes.CARD_MOVE)
};