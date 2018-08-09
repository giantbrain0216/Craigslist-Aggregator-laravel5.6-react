import React, { Component } from 'react';
import TopHeader from '../topheader/index';
import Navigation from '../navigation/index';
import Content from '../content/index';
import Home from '../home/index';
import { Route, Switch } from 'react-router-dom';
import styles from 'styled-components';

const BodyContainer = styles.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

class App extends Component {

    constructor()
    {
        super();
    }

    render(){
        return (
            <BodyContainer>
                <TopHeader />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/s/:section" component={Content} />
                    <Route component={Home} />
                </Switch>
                <Navigation />
            </BodyContainer>
        );
    }
}

export default App;