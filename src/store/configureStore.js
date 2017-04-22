import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configStore(initialState) {
    const rootReducer = require('../reducers').default;
    const logger = createLogger();

    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk, logger))
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
};