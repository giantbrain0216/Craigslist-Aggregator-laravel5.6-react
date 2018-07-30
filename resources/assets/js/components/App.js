import React, { Component } from 'react';
import TopHeader from './topheader';
import Navigation from './navigation';
import Content from './content';
import Home from './home';
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