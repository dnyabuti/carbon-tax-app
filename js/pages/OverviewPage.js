/**
 * @flow
 * @providesModule OverviewPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ViewPagerAndroid,
  TouchableOpacity
} from 'react-native';
import AnimatedGauge from 'AnimatedGauge';
import Gauge from 'Gauge';
import Svg, { Circle, Text as SVGText, G, Polyline } from 'react-native-svg'
import CTXPageControl from 'CTXPageControl'
import CTXPayButton from 'CTXPayButton';

const {width, height} = Dimensions.get('window');

export default class OverviewPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0
    };
  }

  onPageSelected(e) {
    this.setState({
      page: e.nativeEvent.position
    });
  }

  _next() {
    this._viewPager.setPage(0);
    this.setState({page: 0});
  };
  
  _previous() {
    this._viewPager.setPage(1);
    this.setState({page: 1});
  };

  _setRef = (el) => (this._viewPager = el);

  render() {
    const {lastUpdate, value, size} = this.props;
    return (
      <View style={styles.container}>
        <Gauge
          size={diameter}
          width={15}
          guideWidth={15}
          meterColor='#FFC042'
          dotColor='#15997F'
          value={value}
          cropAngle={60}
          children={
            (value) => (
              <View style={styles.inner}>
                <ViewPagerAndroid
                  style={styles.viewPager}
                  bounces={true}
                  initialPage={0}
                  onPageSelected={this.onPageSelected.bind(this)}
                  ref={this._setRef.bind(this)}>
                  <View key={0}>
                    <View style={[{ marginBottom: -14, }, styles.rowCenter]}>
                      <Text style={styles.kwhVal}>{Math.round(value)}</Text>
                      <Text style={styles.percentSign}>%</Text>
                    </View>
                    <Text style={styles.usedRatio}>24.02/40.00 kWh used</Text>
                    <TouchableOpacity onPress={this._previous.bind(this)} style={styles.rightArrow}>
                      <Svg height='60' width='40'>
                        <Polyline
                          points='16,18 26,30 16,42'
                          fill='none'
                          stroke='#5AB7A5'
                          strokeLinecap='round'
                          strokeOpacity='0.5'
                          strokeWidth='4'
                          />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                  <View key={1}>
                    <View style={[{ marginBottom: -14 }, styles.rowCenter]}>
                      <Text style={styles.kwhVal}>88</Text>
                      <View style={styles.kwh}>
                        <Svg height="16" width="22" >
                          <Circle cx="8" cy="8" r="8" fill="#FFC042" />
                          <SVGText x={8} y={5} fontSize={6} fill='#108770' textAnchor='middle' fontWeight='bold'>kWh</SVGText>
                        </Svg>
                      </View>
                    </View>
                    <Text style={styles.usedRatio}>{Math.round(value)}% used</Text>
                    <TouchableOpacity onPress={this._next.bind(this)} style={styles.leftArrow}>
                      <Svg height='60' width='40'>
                        <Polyline
                          points='26,18 16,30 26,42'
                          fill='none'
                          stroke='#5AB7A5'
                          strokeLinecap='round'
                          strokeOpacity='0.5'
                          strokeWidth='4'
                          />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                </ViewPagerAndroid>
                <CTXPageControl
                  count={2}
                  selectedIndex={this.state.page}
                  />
                <View style={styles.columnCenter}>
                  <View style={{ paddingTop: 25, }}>
                    <Svg height="22" width="22" >
                      <Circle cx="11" cy="11" r="11" fill="#5AB7A5" />
                      <SVGText x={11} y={5} fontSize={13} fill='#fff' textAnchor='middle' fontWeight='bold'>5</SVGText>
                    </Svg>
                  </View>
                  <Text style={styles.cycleDays}>
                    days left in cycle
                  </Text>
                </View>
              </View>
            )
          } />
        <CTXPayButton
          style={styles.button}
          color='#15997F' />
        <Text style={styles.lastUpdated}>
          {lastUpdate}
        </Text>
      </View>
    );
  }
}

const diameter = Math.min(width, height) * 0.7;

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
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    marginTop: -diameter / 2 - 50,
    width: diameter - 80,
    marginLeft: 40,
  },
  viewPager: {
    flex: 1,
    zIndex: 100,
  },
  kwhVal: {
    color: '#15997F',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 60,
    paddingHorizontal: 17,
  },
  percentSign: {
    color: '#15997F',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: -20,
    marginLeft: -17,
  },
  usedRatio: {
    color: '#444',
    textAlign: 'center',
    fontSize: 12,
  },
  cycleDays: {
    color: '#888',
    fontSize: 10,
    paddingTop: 2,
    textAlign: 'center',
  },
  lastUpdated: {
    color: '#888',
    textAlign: 'center',
    fontSize: 10,
    paddingTop: 20,
  },
  kwh: {
    marginTop: -28,
    marginLeft: -24,
  },
  rightArrow: {
    alignSelf: 'flex-end',
    marginTop: -70,
  },  
  leftArrow: {
    alignSelf: 'flex-start',
    marginTop: -70,
  },
  button: {
    marginTop: 40
  }
});
