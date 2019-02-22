import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import reducer from './reducers/userReducer'
import { createStore } from 'redux'
import {BrowserRouter as Router} from 'react-router-dom'

let store = createStore(reducer)



ReactDOM.render(
  <Router>
  <Provider store={store}>
   <App/>
  </Provider>
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
