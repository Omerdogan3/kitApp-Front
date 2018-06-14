import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import axios from 'axios';
import Img from 'react-image';

//Pages
import Home from './Home';
import PriceComparison from './PriceComparison';


import Button from '@material-ui/core/Button';


const util = require('util');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 0,
      imageReturned: false,
      imageData: [],
    };

  }

  componentDidMount = () => {
    this.getImageData();
  }

  handleChange = (event, selectedPage) => {
    this.setState({ selectedPage });
  };

  handlePage = () => {
    if(this.state.selectedPage === 0){
      return <Home/>
    }else if(this.state.selectedPage === 1){
      return <PriceComparison/>
    }
  };

  getImageData = async () =>{
    axios.get('https://kitappapi.herokuapp.com/imageall/:').then(res => {
      this.setState({
        imageData: res.data.results,
        imageReturned: true
      })
    });
  }

  render() {
    const { selectedPage } = this.state;

    return (
      <MuiThemeProvider >

      {this.state.imageReturned === true ?
        <div className="image-container">
          {
            this.state.imageData.map( (item, i) => {
              return  <Img src={item.image_link} key={i}/>
            })
          }
        </div> : null}



        <BottomNavigation
          value={selectedPage}
          onChange={this.handleChange}
          showLabels
          className="App-header"
        >
          <BottomNavigationAction label="Anasayfa" />
          <BottomNavigationAction label="Fiyat Karsilastirma" />
          <BottomNavigationAction label="Linkler" />
        </BottomNavigation>

        <div className="all-container">
          {this.handlePage()}
        </div>        
      </MuiThemeProvider>
    );
  }
}

export default App;
