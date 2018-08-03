import React, { Component } from 'react';
import TopHeader from '../topheader/index';
import Navigation from '../navigation/index';
import Content from '../content/index';
import Home from '../home/index';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

    constructor()
    {
        super();
    }

    render(){
        return (
            <div className="container">
                <TopHeader />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/s/:section" component={Content} />
                    <Route component={Home} />
                </Switch>
                <Navigation />
            </div>
        );
    }
}

export default App;