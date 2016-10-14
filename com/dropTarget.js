let React = require('react');

module.exports = React.createClass({
    onDrop: function(src) {
        
    },
    render: function() {
        return (
            <div {...this.props} className={"card " + this.props.className}></div>
        );
    }
})