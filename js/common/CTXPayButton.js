/**
 * @providesModule CTXPayButton
 * @flow
 */
import React, { Component } from 'react';
import {
  Animated,
  ActivityIndicator,
  Dimensions,
  Easing,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';



const {width, height} = Dimensions.get('window');

export default class CTXPayButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activate: 'Pay Tax',
      activated: false,
    };

    this.activate = this.activate.bind(this);

  }

  activate() {
    this.setState({ activate: 'loading' });
    setTimeout(() => {
      this.setState({ activate: <Text>Paid!  <Icon name='check' /></Text>, activated: true })
    }, 1500)

  }

  render() {
    var loading = this.state.activate == 'loading' ?
      <ActivityIndicator animating={true} color='white' />
      : <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>{this.state.activate}</Text>;

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity onPress={this.activate}>
          <Animated.View style={{
            backgroundColor: this.props.color,
            borderRadius: 40, width: width / 2, height: 40,
            alignItems: 'center', justifyContent: 'center'
          }}>
            {loading}
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    zIndex: 10,
    elevation: 1,
  },
})
