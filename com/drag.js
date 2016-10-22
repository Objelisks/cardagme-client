let React = require('react');
let redux = require('react-redux');
let Card = require('./card.js');
let {DraggableCore} = require('react-draggable');
let {Motion, spring} = require('react-motion');

let {moveAction} = require('../js/actions.js');

let resetSpring = {stiffness: 100, damping: 20};
let dragSpring = {stiffness: 500, damping: 50};

let Draggable = ChildClass => React.createClass({
    getInitialState: function() {
        return {dragging: false, x: 0, y: 0};
    },
    onStart: function(e, data) {
        this.setState({
            dragging: true,
            x: data.x,
            y: data.y
        });
    },
    onDrag: function(e, data) {
        this.setState({
            x: data.x,
            y: data.y
        });
    },
    onStop: function(e, data) {
        this.setState({
            dragging: false,
            x: data.x,
            y: data.y
        });
        
        // get the zone we dragged into
        // hide the dragged card
        let target = e.target;
        let oldVis = target.style.visibility;
        target.style.visibility = "hidden";
        // get the thing we're hovering over
        let element = document.elementFromPoint(e.clientX, e.clientY);
        while(element && (!element.classList || !element.classList.contains('zone'))) {
            // go up the tree until we find a zone
            element = element.parentNode;
        }
        target.style.visibility = oldVis;
        
        // if we found a zone, move the dragged card to it
        if(element && element.classList && element.classList.contains('zone')) {
            this.props.dispatch(moveAction({id: target.getAttribute('data-gameid'), target: element.getAttribute('data-gameid')}));
        }
    },
    render: function() {
        let {x, y} = this.props.pos || {x: 0, y: 0};
        let offset = {x: 125, y: 175};
        let settings = resetSpring;
        let classes = (this.props.className || "").split(' ');
        
        if(this.state.dragging) {
            x = this.state.x - offset.x;
            y = this.state.y - offset.y;
            settings = dragSpring;
            classes.push('held');
        } else {
            classes.push('draggable');
        }
        
        let style = {
            translateX: spring(x, settings),
            translateY: spring(y, settings)
        };
        
        let dragHandlers = {onStart: this.onStart, onDrag: this.onDrag, onStop: this.onStop};
        
        return (
            <Motion style={style}>
                {({translateX, translateY}) => {
                    return (
                    <DraggableCore {...dragHandlers}>
                        <ChildClass {...this.props} className={classes.join(' ')} style={{
                                transform: `translate(${translateX}px, ${translateY}px)`,
                                WebkitTransform: `translate(${translateX}px, ${translateY}px)`
                            }}>
                        </ChildClass>
                    </DraggableCore>
                )}}
            </Motion>
        );
    }
});

let DraggableCard = redux.connect()(Draggable(Card));

module.exports.DraggableCard = DraggableCard;