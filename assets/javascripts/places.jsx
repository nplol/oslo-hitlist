const React = require('react');
const request = require('superagent');
const Place= require('./place.jsx');

var Places = React.createClass({
	getInitialState: () => {
		return { places: [] }
	},

	render: function() {
		return (
			<div className='places'>
				{this.state.places.length > 0 ? 
					this.state.places.map(place => {
						return <Place key={place.id} place={place}/>
					}) 
					:   
					<div>No places</div>
				}
			</div>
		)
		
	},
	componentDidMount: function() {
		var that = this;
		request
		  .get('/api/places')
		  .set('Content-Type', 'application/json')
		  .end(function(err, res) {
		  	console.log(res);
		  	that.setState({
		  		places: res.body.places
		  	});
		  })
	}

});

module.exports = Places;
