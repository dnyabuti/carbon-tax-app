/**
 * @flow
 * @providesModule DetailsPage
 */

import React, { Component } from 'react';

import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';

export default class DetailsPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {lastUpdate, value, size} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text>{this.props.kwh.totalKWh}</Text>
        </ScrollView>
      </View>
    )
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: width - 8,
    paddingBottom: 10,
    paddingTop: 20,
    elevation: 1,
    margin: 4,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
});
