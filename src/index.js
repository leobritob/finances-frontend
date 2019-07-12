import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Routes from 'Config/Routes';
import { persistor, store, history } from 'Config/Store';
import { PersistGate } from 'redux-persist/integration/react';
import './styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faArrowLeft,
  faBars,
  faCircleNotch,
  faPlus,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight, faArrowLeft, faBars, faCircleNotch, faPlus, faSearch);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <ConnectedRouter history={history}>{Routes}</ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
