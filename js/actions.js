let actionTypes = require('./actionTypes.js');

let genericAction = (type) => {
    return (props) => {
        return Object.assign({
            type: type,
        }, props);
    };
};

module.exports.moveAction = genericAction(actionTypes.MOVE);
module.exports.menuAction = genericAction(actionTypes.MENU);
module.exports.menuChildAction = genericAction(actionTypes.MENU_CHILD);
module.exports.menuCancelAction = genericAction(actionTypes.MENU_CANCEL);
module.exports.cardPreviewAction = genericAction(actionTypes.CARD_PREVIEW);