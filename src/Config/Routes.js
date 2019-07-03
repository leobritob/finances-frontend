import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from 'Pages/Dashboard';
import Login from 'Pages/Login';
import DashboardLayout from 'Layout/Dashboard';

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  verifyRole,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (true) {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }
      return <Redirect to="/login" />;
    }}
  />
);

const Routes = (
  <Switch>
    <Route exact path="/" component={Login} />
    <PrivateRoute
      exact
      path="/dashboard"
      component={Dashboard}
      layout={DashboardLayout}
    />
    <PrivateRoute exact path="/login" component={Login} />
  </Switch>
);

export default Routes;
