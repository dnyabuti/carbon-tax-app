/**
 * @flow
 */

'use strict';

var CarbonTaxApp = require('CarbonTaxApp');
var Parse = require('parse/react-native');
var React = require('React');

var { Provider } = require('react-redux');
var configureStore = require('./store/configureStore');

import Spinner from 'react-native-loading-spinner-overlay';

var {serverURL, appId} = require('./env');

var {View} = require('react-native');

function setup(): ReactClass<{}> {
  // console.disableYellowBox = true;
  Parse.initialize(appId);
  Parse.serverURL = `${serverURL}/parse`;

  class Root extends React.Component {
    state: {
      isLoading: boolean;
      store: any;
    };

    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1 }}>
            <Spinner
              overlayColor={'#15997F'}
              visible={this.state.isLoading}
              textContent={'CarbonTax'}
              textStyle={{ color: '#FFF' }} />
          </View>
        );
      }
      return (
        <Provider store={this.state.store}>
          <CarbonTaxApp />
        </Provider>
      );
    }
  }

  return Root;
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};

module.exports = setup;
