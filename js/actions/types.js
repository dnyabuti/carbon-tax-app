/**
 * @flow
 */

'use strict';

type ParseObject = Object;

export type Action =
    { type: 'LOADED_TEST_DATA', kwhdata: ParseObject }
  | { type: 'SWITCH_DAY', day: 1 | 2 | 3 | 4 }
  | { type: 'SWITCH_TAB', tab: 'schedule' | 'faves' | 'map' | 'notifications' | 'info' }
  | { type: 'SWITCH_PAGE', page: number }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
