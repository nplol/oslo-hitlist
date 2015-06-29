const React = require('react');
const Header = require('./header.jsx');
const Places= require('./places.jsx');

var MainContent = React.createClass({
	render: function() {
		return <div className='container'>
					<Header/>
					<Places/>
			   </div>	
	}
});

document.addEventListener("DOMContentLoaded", function(event) { 
  React.render(<MainContent/>, document.body);
});

