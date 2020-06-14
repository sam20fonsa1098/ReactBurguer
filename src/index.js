import React from 'react';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk';

import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
