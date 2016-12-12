/* @flow */

import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import OverviewPage from 'OverviewPage';
import DetailsPage from 'DetailsPage';
import formatTime from './formatTime';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class Navigation extends Component {

  static title = 'CarbonTax';
  static appbarElevation = 0;

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Overview' },
      { key: '2', title: 'Details' },
    ],
  };

  _handleChangeTab = (index) => {
    // console.log('Props:', this.props);
    this.setState({
      index,
    });
  };

  _renderHeader = (props) => {
    return (
      <TabBarTop
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
        />
    );
  };

  _renderScene = ({ route }) => {
  //   if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 0) {
  //   return null;
  // }
    switch (route.key) {
      case '1':
        var uDate = this.props.kwh.updatedAt;
        var lastUpdate = 'No usage reported, check back later!';
        if (uDate != 0) {
          lastUpdate = 'Usage estimated as of ' + formatTime(uDate);
        }
        return (
          <View style={[styles.page]}>
            <OverviewPage
              size={220}
              value={parseInt(this.props.kwh.totalKWh)}
              lastUpdate={lastUpdate} />
          </View>
        );
      case '2':
        return (
          <View style={[styles.page, { backgroundColor: '#eee' }]}>
            <DetailsPage {...this.props}/>
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
        initialLayout={initialLayout}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#15997F',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 12
  },
});
