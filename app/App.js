import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './AppNavigator';
import store from './store';

//f04d03837faa98675d74bef2fc0bb83e
class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
