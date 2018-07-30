import React, { Component } from 'react';
import TopHeader from './TopHeader';
import Navigation from './Navigation';
import Content from './Content';
import { Route, Switch } from 'react-router-dom';

const Home = ()=>{
    return <div id="content-container"/>;
};

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