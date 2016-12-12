/**
 * @flow
 */

'use strict';

import type {Action} from '../actions/types';

export type Tab =
    'schedule'
  | 'faves'
  | 'map'
  | 'notifications'
  | 'info'
  ;

export type Day = 1 | 2;

export type Page = { page: number; };

type State = {
  tab: Tab;
  day: Day;
  page: Page;
};

const initialState: State = { tab: 'schedule', day: 1, page: 0 };

function navigation(state: State = initialState, action: Action): State {
  if (action.type === 'SWITCH_TAB') {
    return {...state, tab: action.tab};
  }
  if (action.type === 'SWITCH_DAY') {
    return {...state, day: action.day};
  }
  if (action.type === 'SWITCH_PAGE') {
    return {...state, page: action.page};
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  return state;
}

module.exports = navigation;
