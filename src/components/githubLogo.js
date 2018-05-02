import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import '../App.css';

import FloatingActionButton from 'material-ui/FloatingActionButton';

const style = {
	margin: 12,
};


class GithubLogo extends Component {
	render() {
		return (
			<div className="github-logo">

			<FloatingActionButton mini={true} disabled={true} style={style}>
      <IconButton
			iconClassName="muidocs-icon-custom-github"
			 tooltip="top-center"
				tooltipPosition="top-center"
				href="https://github.com/omerdogan3"
				target="_blank"
    	/>
    </FloatingActionButton>
			
			</div>
		);
	}
	
}

export default GithubLogo;