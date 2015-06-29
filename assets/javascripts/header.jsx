const React = require('react');

var Header = React.createClass({
	render: function() {
		return <div className='header'>
					<ul>
						<li>List</li>
						<li>Last</li>
					</ul>
				</div>
	}
});

module.exports = Header;