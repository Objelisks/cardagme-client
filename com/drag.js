import React from 'react';
import {connect} from 'react-redux';
import {DraggableCore} from 'react-draggable';
import {Motion, spring} from 'react-motion';
import Card from './card.js';
import actions from '../js/actions.js';

let resetSpring = {stiffness: 100, damping: 20};
let dragSpring = {stiffness: 500, damping: 50};

let Draggable = ChildClass => React.createClass({
    getInitialState: function() {
        return {dragging: false, dragStart: true, x: 0, y: 0};
    },
    onDrag: function(e, data) {
        this.setState({
            dragging: !this.state.dragStart,
            dragStart: false,
            x: data.x,
            y: data.y
        });
    },
    onStop: function(e, data) {
        this.setState({
            dragging: false,
            dragStart: true,
            x: data.x,
            y: data.y
        });

        // get the zone we dragged into (todo: make this nicer?)
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
            let action = actions.moveCardAction({id: target.getAttribute('data-gameid'), target: element.getAttribute('data-gameid')});
            this.props.dispatch(action);
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

        let dragHandlers = {onDrag: this.onDrag, onStop: this.onStop};

        return (
            <Motion style={style}>
                {({translateX, translateY}) => {
                    return (
                    <DraggableCore {...dragHandlers}>
                        <ChildClass {...this.props} held={this.state.dragging} className={classes.join(' ')} style={Object.assign({
                                transform: `translate(${translateX}px, ${translateY}px)`,
                                WebkitTransform: `translate(${translateX}px, ${translateY}px)`
                            }, this.props.style)}>
                        </ChildClass>
                    </DraggableCore>
                )}}
            </Motion>
        );
    }
});

let DraggableCard = connect()(Draggable(Card));

export default DraggableCard;
