import React, {Component, useState, useEffect} from 'react';
import './App.css';
import Layout from '../components/Layout/Layout'
import BurguerBuilder from './BurguerBuilder/BurguerBuilder'

class App extends Component{
  render(){
    return(
      <Layout>
        <BurguerBuilder>
          
        </BurguerBuilder>
      </Layout>
    );
  };
};

export default App;
