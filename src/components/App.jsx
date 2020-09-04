import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore, history } from '../redux/store';
import ActionPage from './ActionPage';
import './App.css';
// import logo from '../assets/images/logo.svg';

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <ActionPage />
      </Provider>
    );
  }
}

export default App;
