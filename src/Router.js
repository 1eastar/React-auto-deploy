import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Main from './screen/Main';
import Login from './screen/Login';
import Signup from './screen/Signup';
import Detail from './screen/Detail';

class Router extends Component {
    constructor(props){
        super(props);
        
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path='/' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/main' component={Main} />
                    <Route path='/detail/:id' component={Detail} />
                    {/* Not Found */}
                    <Route component={() => <Redirect to="/" />} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;