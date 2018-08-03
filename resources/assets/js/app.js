require('./bootstrap');

import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import App from './components/app';
import store from './store';

ReactDOM.render(
    <Provider store={store.configuration.store}>
        <ConnectedRouter history={store.configuration.history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);