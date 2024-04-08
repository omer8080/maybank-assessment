import { legacy_createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import placeReducer from '../reducers/placeReducer';

const store = legacy_createStore(placeReducer, applyMiddleware(thunk));

export default store;
