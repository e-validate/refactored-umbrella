import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import Register from './Components/register/Register';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register} />
    </Switch>
)
