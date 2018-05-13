import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import axios from 'axios';

import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';
import GithubLogo from './components/githubLogo';

import LinearProgress from 'material-ui/LinearProgress';

import Img from 'react-image';


import './App.css';
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
      imageData: [],
      completed: 0,
      inProgress: false,
      returned: false,
      imageReturned: false
    };
    this._handlebarcode = this._handlebarcode.bind(this);
    this.getPriceData = this.getPriceData.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.getImageData = this.getImageData.bind(this);
    this.resetState = this.resetState.bind(this);
    this.checkIfISBN = this.checkIfISBN.bind(this);
  }

  componentDidMount = () => {
    this.getImageData();
  }

  _handlebarcode(event) {
    this.setState({barcode: event.target.value});
  }

  getPriceData = (event) =>{
    this.setState({returned: false, inProgress: true});
    if(!this.checkIfISBN(this.state.barcode)){
      
    }else{
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
            returned: true,
            inProgress: false
          }
        );
      });

    }


    
  }

  checkIfISBN = (x) => {
    if (! /^[0-9]{13}$/.test(x)) {
      alert("Please enter a valid ISBN number!");
      return false;
    } return true;
  }
  


  getImageData = async () =>{
    axios.get('https://kitappapi.herokuapp.com/imageall/:').then(res => {
      this.setState({
        imageData: res.data.results,
        imageReturned: true
      })
    });
  }

  resetState = () => {
    this.setState({
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
    })
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
      <div className="all-container">



      {this.state.imageReturned === true ?
        <div className="image-container">
          {
            this.state.imageData.map( (item, i) => {
              return  <Img src={item.image_link} key={i}/>
            })
          }
        </div> : null}


        <div className = "container">
          
      <Paper className={this.state.returned === true ? "paper-container-returned" : "paper-container-begin" } zDepth={4} rounded={true} style={{marginBottom: 15}}>
        
            {this.state.returned === false ?
              <div>
              <h1>KitApp Price Finder</h1>
                <TextField className="text-input" floatingLabelText="ISBN"  onChange={this._handlebarcode} onKeyDown={this.onEnterPress}
                hintText="Barcode Number"  style = {{flex: 1}} 
                />
                <RaisedButton label="Ara" primary={true} disabled={this.state.inProgress === true ? true : false}  fullWidth={false} onClick={this.getPriceData}/>
              </div> : null }


              <div className="linear-progress">
                <h1>{this.state.inProgress === true ?  <LinearProgress mode="indeterminate" />: null}</h1>
              </div>
            


            {this.state.returned === true ? 
              <div>
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
                <br/>
                <RaisedButton label="Yeni Arama" style={{marginTop:10}} primary={true} fullWidth={false} onClick={this.resetState}/>
                
              </div> : null}
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
