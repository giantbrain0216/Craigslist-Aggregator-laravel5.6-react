require('./bootstrap');

import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { ConnectedRouter } from 'connected-react-router'
import App from './components/App';


const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            thunk
        ),
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);