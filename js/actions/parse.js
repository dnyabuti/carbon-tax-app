/**
 * @flow
 */

'use strict';

const Parse = require('parse/react-native');
const logError = require('logError');
const InteractionManager = require('InteractionManager');

import type { ThunkAction } from './types';

const CTXKWh = Parse.Object.extend('CTXKWh');
const CTXData = Parse.Object.extend('CTXData');

function getFirstObject(type: string, query: Parse.Query): ThunkAction {
  return (dispatch) => {
    return query.first({
      success: (kwhdata) => {
        // We don't want data loading to interfere with smooth animations
        InteractionManager.runAfterInteractions(() => {
          // Flow can't guarantee {type, list} is a valid action
          dispatch(({type, kwhdata}: any));
        });
      },
      error: logError,
    });
  };
}

module.exports = {
  loadTestData: (): ThunkAction =>
    getFirstObject(
      'LOADED_TEST_DATA',
      new Parse.Query(CTXKWh)
        .equalTo('groupId', 'home_group')
        .descending('createdAt')    
    ),
};
