import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import './App.css';

import axios from 'axios';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import GithubLogo from './components/githubLogo';

import PricePanel from './PricePanel';

import Img from 'react-image';

const util = require('util');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: "",
      title: "",
      nobelkitap: "",
      atlaskitap: "",
      kitapkoala: "",
      hepsiBuradaPrice: "",
      babilPrice: "",
      pandoraPrice: "",
      idefixPrice: "",
      drPrice: "",
      bookCoverLink: "",
      returned: false
    };
    this._handlebarcode = this._handlebarcode.bind(this);
    this.getPriceData = this.getPriceData.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  _handlebarcode(event) {
    this.setState({barcode: event.target.value});
  }

  getPriceData = (event) =>{
    this.setState({returned: false});
    axios.get(util.format('https://kitappapi.herokuapp.com/price/%s', this.state.barcode)).then(res => {
      this.setState(
        {
          "title": res.data.title,
          "nobelkitap": res.data.nobelkitap,
          "atlaskitap": res.data.atlaskitap,
          "kitapkoala": res.data.kitapkoala,
          "hepsiBuradaPrice": res.data.hepsiBuradaPrice,
          "babilPrice": res.data.babilPrice,
          "pandoraPrice": res.data.pandoraPrice,
          "idefixPrice": res.data.idefixPrice,
          "drPrice": res.data.drPrice,
          "bookCoverLink": res.data.bookCoverLink,
          returned: true
        }
      );
    });
  }


  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      console.log("Enter!");
      e.preventDefault();
      this.getPriceData(e);
    }
  }


  render() {
    return (
      <MuiThemeProvider >
        <h1>KitApp Price Finder</h1>
          <div className="container">
            <TextField className="text-input" floatingLabelText="ISBN"  onChange={this._handlebarcode} onKeyDown={this.onEnterPress}
            hintText="Barcode Number"  style = {{width: 400}} 
            />
            <RaisedButton label="Scan" primary={true} fullWidth={false} onClick={this.getPriceData}/>
            
            
            {this.state.returned === true ? 
              <Paper zDepth={2} className="price-table">
                <h1>{this.state.title}</h1>
                {this.state.nobelkitap == ('' || 0) ?
                  <h3></h3>:<h3>Nobel Kitap: {this.state.nobelkitap}</h3>
                }

                {this.state.kitapkoala == ('' || 0) ?
                  <h3></h3>:<h3>Kitap Koala: {this.state.kitapkoala}</h3>
                }

                {this.state.hepsiBuradaPrice == ("" || 0) ?
                  <h3></h3>:<h3>Hepsi Burada: {this.state.hepsiBuradaPrice}</h3>
                }

                {this.state.babilPrice == ('' || 0) ?
                  <h3></h3>:<h3>Babil: {this.state.babilPrice}</h3>
                }

                {this.state.pandoraPrice == ('' || 0) ?
                  <h3></h3>:<h3>Pandora: {this.state.pandoraPrice}</h3>
                } 

                {this.state.idefixPrice == ('' || 0) ?
                  <h3></h3>:<h3>Idefix: {this.state.idefixPrice}</h3>
                }

                {this.state.drPrice == ('' || 0) ?
                  <h3></h3>:<h3>D&R: {this.state.drPrice}</h3>
                }
                <Img src={this.state.bookCoverLink} width="150" height="230"/>
              </Paper>  

              
              
              :
              <h1>{this.state.barcode}</h1>
              
            }
            
            
          </div>
        <GithubLogo title={this.state.title}/>
      </MuiThemeProvider>
    );
  }
}

export default App;
