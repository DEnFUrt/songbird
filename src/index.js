import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import ErrorBoundry from './components/error-boundry'
import RestService from './services/rest-service';
import RestServiceContext from './components/rest-service-context';
import store from './store';

import './index.scss';

const restService = new RestService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <RestServiceContext.Provider value={restService}>
          <App />
        </RestServiceContext.Provider>
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
);

