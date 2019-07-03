import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'Pages/Dashboard';
import Login from 'Pages/Login';

const Routes = (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

export default Routes;
