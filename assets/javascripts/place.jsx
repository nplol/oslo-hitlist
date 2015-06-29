const React = require('react');
var Place = React.createClass({
	render: function() {
		return <div className='place' key={this.props.place.id}>
					<h1 className='name'>{this.props.place.name}</h1>
					<div className='rating'>{this.props.place.rating}</div>
			   </div>
	}

});

module.exports = Place;
