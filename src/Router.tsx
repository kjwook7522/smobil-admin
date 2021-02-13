import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'common/store';
import Login from 'pages/Login/Login';
import Home from 'pages/Home/Home';
import Category from 'pages/Category/Category';
import GoogleId from 'pages/GoogleId/GoogleId';
import Admin from 'pages/Admin/Admin';

const AppRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const isLogin = useSelector((state: RootState) => state.loginReducer);
  const { isDriver } = user;

  return (
    <Router>
      {isLogin && isDriver ? (
        <Switch>
          <Route path="/category/:category">
            <Category />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            {isLogin ? <GoogleId /> : <Login />}
          </Route>
          <Redirect to="/" />
        </Switch>
      )}
    </Router>
  );
};

export default AppRouter;
