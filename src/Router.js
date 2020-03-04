import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';
import Login from './Login';

class Router extends Component {
    constructor(props){
        super(props);
        
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path='/' component={Login} />
                    <Route path='/main' component={App} />
                    {/* Not Found */}
                    <Route component={() => <Redirect to="/" />} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;