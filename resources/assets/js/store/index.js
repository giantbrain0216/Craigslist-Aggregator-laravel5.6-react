import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from '../reducers';
const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
);

export default {
    store,
    history
};