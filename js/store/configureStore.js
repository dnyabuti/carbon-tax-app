/**
 * @flow
 */

'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
var promise = require('./promise');
var array = require('./array');
var reducers = require('../reducers');
var createLogger = require('redux-logger');
import {persistStore, autoRehydrate} from 'redux-persist';
var {AsyncStorage} = require('react-native');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createCTXStore = applyMiddleware(thunk, promise, array, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createCTXStore)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
