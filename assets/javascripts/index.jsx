const React = require('react');

var MainContent = React.createClass({
	render: function() {
		return <div className='test'>Hello World </div>
	}
});

document.addEventListener("DOMContentLoaded", function(event) { 
  React.render(<MainContent/>, document.getElementById('container'));
});

