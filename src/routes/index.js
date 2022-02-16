import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import DynamicForm from '../Pages/home';
import Response from '../Pages/Response';

const PageRoutes = () => {
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/home'} />;
  }
    return (
      <React.Fragment>
        <Switch>
          <Route path="/home" component={DynamicForm} />
          <Route path="/response" component={Response} />
        </Switch>
      </React.Fragment>
    );
  };
  
  export default PageRoutes;