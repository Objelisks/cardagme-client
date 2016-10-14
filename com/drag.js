let React = require('react');
let DraggableCore = require('react-draggable').DraggableCore;
let Motion = require('react-motion').Motion;
let spring = require('react-motion').spring;

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

module.exports = Draggable;