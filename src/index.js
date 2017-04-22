import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import configureStore from './store/configureStore';

import App from './App';

import { Home } from './containers';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
            </Route>
        </Router>
    </Provider>,
  document.getElementById('root')
);