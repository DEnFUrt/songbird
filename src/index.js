import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import ErrorBoundry from './components/error-boundry'
// import RestoService from './services/resto-service';
// import RestoServiceContext from './components/resto-service-context';
import store from './store';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <App />
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
);

