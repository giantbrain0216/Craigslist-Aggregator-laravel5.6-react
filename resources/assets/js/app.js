require('./bootstrap');

import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import storeObj from './store';
import { BrowserRouter} from 'react-router-dom';
import App from './components/App';

ReactDOM.render(
    <Provider store={storeObj.store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);