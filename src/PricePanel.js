import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };

class PricePanel extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          title: props.title
      };

    }

    render() {
        return (
            <Paper zDepth={2}>
            <h1>{this.state.title}</h1>
          </Paper>
        );
      }
}

export default PricePanel;