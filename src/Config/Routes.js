import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from 'Pages/Dashboard';
import Login from 'Pages/Login';
import DashboardLayout from 'Layout/Dashboard';
import Revenue from 'Pages/Revenue';
import Expenses from 'Pages/Expenses';
import Investments from 'Pages/Investments';
import RevenueAdd from 'Pages/Revenue/Add';
import ExpensesAdd from 'Pages/Expenses/Add';
import InvestmentsAdd from 'Pages/Investments/Add';
import ForgotPassword from 'Pages/ForgotPassword';

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
    <Route exact path="/forgot-password" component={ForgotPassword} />

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
      component={Investments}
      layout={DashboardLayout}
    />
    <PrivateRoute
      exact
      path="/investments/add"
      component={InvestmentsAdd}
      layout={DashboardLayout}
    />
  </Switch>
);

export default Routes;
