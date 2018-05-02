import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import GithubLogo from './components/githubLogo';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider >
        <h1>KitApp Price Finder</h1>
          <div className="container">
            <TextField className="text-input"
            hintText="Barcode Number"  style = {{width: 400}} 
            />
            <RaisedButton label="Scan" secondary={true} fullWidth={false} />
          </div>
        <GithubLogo/>
      </MuiThemeProvider>
    );
  }
}

export default App;
