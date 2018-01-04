/**
 * Created by JoshOY on 2017.10.23
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import mobxStores from './store';
import AppRoutes from './routes';

import './styles/index.global.styl';


const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = {
  routingStore,
  ...mobxStores,
};
const history = syncHistoryWithStore(browserHistory, routingStore);

async function main() {
  ReactDOM.render(
    <Provider {...stores}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Provider>,
    document.getElementById('app-root'),
  );
}

main();
