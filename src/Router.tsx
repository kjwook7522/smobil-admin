import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'common/store';
import Login from 'pages/Login/Login';
import Home from 'pages/Home/Home';
import Category from 'pages/Category/Category';
import DriverAuthDeny from 'pages/DriverAuthDeny/DriverAuthDeny';
import Admin from 'pages/Admin/Admin';
import AdminAuthDeny from 'pages/AdminAuthDeny/AdminAuthDeny';
import Drivers from 'pages/Admin/Drivers/Drivers';

const AppRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const { isLogin, isDriver, isAdmin } = user;

  return (
    <Router>
      {isLogin && isDriver ? (
        <Switch>
          <Route path="/admin/drivers">
            <Drivers />
          </Route>
          <Route exact path="/admin">
            {isAdmin ? <Admin /> : <AdminAuthDeny />}
          </Route>
          <Route path="/category/:category">
            <Category />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            {isLogin ? <DriverAuthDeny /> : <Login />}
          </Route>
          <Redirect to="/" />
        </Switch>
      )}
    </Router>
  );
};

export default AppRouter;
