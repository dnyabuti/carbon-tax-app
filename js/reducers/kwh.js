/**
 * @flow
 */

'use strict';
import type { Action } from '../actions/types';

// const createParseReducer = require('./createParseReducer');

export type Kwh = {
  // id: string;
  updatedAt: number;
  // createddAt: number;
  totalKWh: string;
  // groupId: string;
};

const initialState: Kwh = {
  // id: null,
  updatedAt: 0,
  // createdAt: null,
  totalKWh: '0',
  // groupId: '',
};

function Kwh(state: Kwh = initialState, action: Action): State {
  if (action.type === 'LOADED_TEST_DATA') {
    if (action.kwhdata) {
      return {    
        totalKWh: action.kwhdata.get('totalKWh'),
        updatedAt: action.kwhdata.get('updatedAt')
      };
    }
    return {
      totalKWh: initialState.totalKWh,
      updatedAt: initialState.updatedAt
    }
  }
  return state;
}

module.exports = Kwh;
