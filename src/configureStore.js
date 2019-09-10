import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import rootReducer from './reducers/rootReducer';
import { reducer as form } from 'redux-form';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const middleware = [thunk];

  const store = createStore(
    combineReducers({
      rootReducer,
      form,
      routing: routerReducer,
    }),
    composeEnhancers(applyMiddleware(...middleware)),
  );

  return store;
};

export default configureStore;
