import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './../reducers';

// Create store based on the reducer
const store = createStore(reducer, applyMiddleware(thunk))

export default store;
