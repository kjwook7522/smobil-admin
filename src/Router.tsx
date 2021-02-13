import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import Login from 'pages/Login/Login';
import Home from 'pages/Home/Home';
import Category from 'pages/Category/Category';
import GoogleId from 'pages/GoogleId/GoogleId';

const AppRouter: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.loginReducer);
  const isDriver = useSelector((state: RootState) => state.driverReducer);

  return (
    <Router>
      <Switch>
        <Route path="/category/:category">
          <Category />
        </Route>
        <Route exact path="/">
          {isLogin ? isDriver ? <Home /> : <GoogleId /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
