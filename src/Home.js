import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grow from '@material-ui/core/Grow';
import './App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return(
            <div className = "container">  
                <Grow in={true}>
                    <Paper className="paper-container-returned" zDepth={4} rounded={true} style={{marginBottom: 15}}>
                            <h1 className="title-color">KitApp</h1>
                            <p></p>
                    </Paper>
                </Grow>
            </div>
        )
    }
}

export default Home;