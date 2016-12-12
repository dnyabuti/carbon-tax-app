/**
 * @flow
 */

'use strict';

const parseActions = require('./parse');
const navigationActions = require('./navigation');

module.exports = {
  ...parseActions,
  ...navigationActions,
};
