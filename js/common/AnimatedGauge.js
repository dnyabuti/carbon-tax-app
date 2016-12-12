/**
 * @providesModule AnimatedGauge
 * @flow
 */
'use strict';

import React, { PropTypes } from 'react';
import { View, Animated } from 'react-native';
import Gauge from 'Gauge';
const AnimatedGaugeComponent = Animated.createAnimatedComponent(Gauge);

export default class AnimatedGauge extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(props.preValue || 0)
    }
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction } = this.props;

    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.value,
        tension,
        friction
      }
    ).start();
  }
  
  performLinearAnimation(toValue, duration) {
    Animated.timing(this.state.chartFillAnimation, {
      toValue: toValue,
      duration: duration
    }).start();
  }

  render() {
    const { value, preValue, ...other } = this.props;

    return (
      <AnimatedGaugeComponent
        {...other}
        value={this.state.chartFillAnimation}
        />
    )
  }
}

AnimatedGauge.propTypes = {
  style: View.propTypes.style,
  size: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number,
  guideWidth: PropTypes.number,
  preValue: PropTypes.number,
  cropAngle: PropTypes.number,
  meterColor: PropTypes.string,
  dotColor: PropTypes.string,
  tension: PropTypes.number,
  friction: PropTypes.number
}

AnimatedGauge.defaultProps = {
  tension: 7,
  friction: 7
};
