import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import configureStore, { history } from './redux/store';
import PageRoutes from './routes';
import './App.css';

export const store = configureStore();
const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <PageRoutes />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
