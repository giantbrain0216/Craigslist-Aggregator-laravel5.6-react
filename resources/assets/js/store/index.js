import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
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

export default {
    store,
    history
};