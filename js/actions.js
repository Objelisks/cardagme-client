let actionTypes = require('./actionTypes.js');

module.exports.moveAction = ({id, target}) => {
    return {
        type: actionTypes.MOVE,
        id,
        target
    }
}