import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import Register from './Components/register/Register';

import About from './Components/register/About';
import About2 from './Components/register/About2';


export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register} />

        <Route path='/about' component={About}/>
        <Route path='/about2' component={About2} />
    </Switch>
)
