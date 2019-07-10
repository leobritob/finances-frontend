import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from 'Pages/Dashboard';
import Login from 'Pages/Login';
import DashboardLayout from 'Layout/Dashboard';
import Revenue from 'Pages/Revenue';
import Expenses from 'Pages/Expenses';
import Investment from 'Pages/Investment';
import RevenueAdd from 'Pages/Revenue/Add';
import ExpensesAdd from 'Pages/Expenses/Add';

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
    <Route exact path="/login" component={Login} />
    <PrivateRoute
      exact
      path="/dashboard"
      component={Dashboard}
      layout={DashboardLayout}
    />

    {/* REVENUE */}
    <PrivateRoute
      exact
      path="/revenue"
      component={Revenue}
      layout={DashboardLayout}
    />
    <PrivateRoute
      exact
      path="/revenue/add"
      component={RevenueAdd}
      layout={DashboardLayout}
    />

    {/* EXPENSES */}
    <PrivateRoute
      exact
      path="/expenses"
      component={Expenses}
      layout={DashboardLayout}
    />
    <PrivateRoute
      exact
      path="/expenses/add"
      component={ExpensesAdd}
      layout={DashboardLayout}
    />

    {/* INVESTMENTS */}
    <PrivateRoute
      exact
      path="/investments"
      component={Investment}
      layout={DashboardLayout}
    />
  </Switch>
);

export default Routes;
