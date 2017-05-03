import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';

import App from './App';
import { Home } from './containers';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>

            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Redirect from="*" to="/" />
            </Route>

        </Router>
    </Provider>,
  document.getElementById('root')
);