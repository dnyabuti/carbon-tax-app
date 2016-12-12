/**
 * @providesModule CarbonTaxApp
 * @flow
 */

'use strict';

import React from 'React';
import Parse from 'parse/react-native';

import {
  AppState,
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import { loadTestData } from './actions';
import { connect } from 'react-redux';
import Navigation from './Navigation';

const {width, height} = Dimensions.get('window');

const CTXKWh = Parse.Object.extend("CTXKWh");
const query = new Parse.Query(CTXKWh);

var CarbonTaxApp = React.createClass({

  componentDidMount: function () {
    AppState.addEventListener('change', this.handleAppStateChange);
    console.log('Main Component mounted: Loading Data...')
    this.props.dispatch(loadTestData());

    this.parseSubscription(query);
  },

  componentWillUnmount: function () {
    AppState.removeEventListener('change', this.handleAppStateChange);
  },

  parseSubscription: function (query) {
    let subscription = query.subscribe();
    subscription.on('open', () => {
      console.log('subscription opened');
    });
    subscription.on('create', (object) => {
      console.log('object created', object);
      this.props.dispatch(loadTestData());
    });
    subscription.on('update', (object) => {
      console.log('object updated', object);
      this.props.dispatch(loadTestData());
    });
    subscription.on('insert', (object) => {
      console.log('object inserted', object);
      this.props.dispatch(loadTestData());
    });
    subscription.on('close', () => {
      console.log('subscription closed');
    });
    Parse.LiveQuery.on('open', () => {
      console.log('socket connection established');
    });
    Parse.LiveQuery.on('close', () => {
      console.log('socket connection closed');
    });
    Parse.LiveQuery.on('error', (error) => {
      console.log(error);
    });
  },


  handleAppStateChange: function (appState) {
    if (appState === 'active') {
      console.log('App = Active: Loading Data...');
      this.props.dispatch(loadTestData());

      this.parseSubscription(query);

    } else {
      console.log('App != Active')
      Parse.LiveQuery.close();
    }
  },

  render: function () {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
          />
        <View style={styles.topBar}>
          <Text style={styles.appTitle}>CarbonTax</Text>
        </View>
        <Navigation {...this.props} />
      </View>
    );
  },

});

const diameter = Math.min(width, height) * 0.7;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  topBar: {
    flex: 0,
    backgroundColor: '#15997F',
    paddingTop: 34,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  appTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});

function select(store) {
  return {
    kwh: store.kwh,
  };
}

module.exports = connect(select)(CarbonTaxApp);
