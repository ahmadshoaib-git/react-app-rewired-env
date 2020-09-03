import React, { Component } from 'react';
import ActionPage from './ActionPage';
import './App.css';
// import logo from '../assets/images/logo.svg';

class App extends Component {
  render() {
    console.log(process.env.REACT_APP_ENV);
    console.log(process.env.NODE_ENV);
    return (
      <ActionPage />
    );
  }
}

export default App;
