import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { Provider } from 'react-redux';
// import reducer from './helpers/userReducer'
// import { createStore } from 'redux'
//import { ActionCableProvider } from 'react-actioncable-provider'
import {BrowserRouter as Router} from 'react-router-dom'

// <ActionCableProvider url="ws://localhost:3001/cable">
// </ActionCableProvider>
ReactDOM.render(
    <Router>
       <App/>
    </Router>

  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
