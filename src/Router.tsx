import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from 'pages/Login/Login';
import Home from 'pages/Home/Home';
import Category from 'pages/Category/Category';

interface Props {
  isLogin: boolean;
}

const AppRouter: React.FC<Props> = ({ isLogin }) => {
  return (
    <Router>
      <Switch>
        <Route path="/category/:category">
          <Category />
        </Route>
        <Route exact path="/">
          {isLogin ? <Home /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
