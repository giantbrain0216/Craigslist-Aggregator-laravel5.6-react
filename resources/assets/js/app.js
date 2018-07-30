require('./bootstrap');

import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import storeObj from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TopHeader from './components/TopHeader';
import Navigation from './components/Navigation';
import Content from './components/Content';

const Home = ()=>{
    return <div id="content-container"/>;
};

ReactDOM.render(
    <Provider store={storeObj.store}>
        <BrowserRouter>
            <div className="container">
                <TopHeader />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/s/:section" component={Content} />
                    <Route component={Home} />
                </Switch>
                <Navigation />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);