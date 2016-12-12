/**
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  kwh: require('./kwh'),
  navigation: require('./navigation')
});
