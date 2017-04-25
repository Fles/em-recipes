import React, { Component } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { RecipesApp } from './containers';
import classnames from 'classnames';
import './App.css';
import * as reducers from './reducer';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <div className={classnames('App', 'container-fluid' )}>
        <Provider store={store}>
            <RecipesApp />
        </Provider>
      </div>
    );
  }
}

export default App;
