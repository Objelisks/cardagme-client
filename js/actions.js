let actionTypes = require('./actionTypes.js');

module.exports.moveAction = (props) => {
    return Object.assign({
        type: actionTypes.MOVE,
    }, props);
};

module.exports.menuAction = (props) => {
    return Object.assign({
        type: actionTypes.MENU,
    }, props);
};

module.exports.menuChildAction = (props) => {
    return Object.assign({
        type: actionTypes.MENU_CHILD,
    }, props);
};

module.exports.menuCancelAction = (props) => {
    return Object.assign({
        type: actionTypes.MENU_CANCEL,
    }, props);
};