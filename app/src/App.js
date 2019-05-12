import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FlavorList from './FlavorList';
import FlavorEdit from './FlavorEdit';
import FlavorRate from './FlavorRate';
import { CookiesProvider } from 'react-cookie';

class App extends Component {

    render() {
        return (
            <CookiesProvider>
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/flavors' exact={true} component={FlavorList}/>
                    <Route path='/flavors/:id' component={FlavorEdit}/>
                    <Route path='/rate/:id' component={FlavorRate}/>
                </Switch>
            </Router>
            </CookiesProvider>
        )
    }
}

export default App;
