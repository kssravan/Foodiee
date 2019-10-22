import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = [
  thunk
];
const compposeEnhancer = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = compposeEnhancer(applyMiddleware(thunk));

export default createStore(reducer, {}, enhancer);
