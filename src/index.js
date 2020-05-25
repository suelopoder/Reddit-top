import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import rootReducer from './reducers';
import redditDataMiddleware from './redditDataMiddleware';

const isDevelopment = () => process.env.NODE_ENV === 'development';
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(redditDataMiddleware),
    isDevelopment() && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
