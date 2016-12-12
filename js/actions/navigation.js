/**
 * @flow
 */

'use strict';

import type { Action } from './types';

type Tab = 'schedule' | 'faves' | 'map' | 'notifications' | 'info';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),

  switchDay: (day: 1 | 2 | 3 | 4): Action => ({
    type: 'SWITCH_DAY',
    day,
  }),

  switchPage: (page: number): Action => ({
    type: 'SWITCH_PAGE',
    page,
  })
};
