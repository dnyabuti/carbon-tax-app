/**
 * @providesModule Gauge
 * @flow
 */
'use strict';

import React, { Component } from 'react'
import { View, Text } from 'react-native'
// import Svg,{Path,Circle,G,Text} from 'react-native-svg'
import Svg, { Path, Circle, G } from 'react-native-svg'

export default class Gauge extends Component {
  constructor(props) {
    super(props)
    this.polarToCartesian = this.polarToCartesian.bind(this)
    const {size, width} = props
    this.state = {
      cx: size / 2,
      cy: size / 2,
      r: (size / 2) * 0.85,
    }
  }
  componentWillMount = () => {
  }
  polarToCartesian(cx, cy, r, angle) {
    const a = (angle - 270) * Math.PI / 180.0
      , x = cx + (r * Math.cos(a))
      , y = cy + (r * Math.sin(a))
    return { x, y, r }
  }
  extractValue(value, cropAngle) {
    if (value < 0.01) {
      return 0;
    } else if (value > 100) {
      return 360 - cropAngle;
    }
    return (360 - cropAngle) * value / 100;
  }
  render() {
    const {size, width, guideWidth, value, cropAngle, meterColor, dotColor, children} = this.props
      , newVal = this.extractValue(value, cropAngle)
      , dcOffset = 20
      , dcSize = ((size-(dcOffset*2))/2)
      , startCoord = this.polarToCartesian(size/2, size/2, (size/2)*0.85, cropAngle / 2)
      , endCoord = this.polarToCartesian(size/2, size/2, (size/2)*0.85, newVal + (cropAngle) / 2)
      , guidePathStart = startCoord
      , guidePathEnd = this.polarToCartesian(size/2, size/2, (size/2)*0.85, 360 - (cropAngle / 2))
      , dcPathStart = this.polarToCartesian(dcSize, dcSize, (dcSize)*0.85, cropAngle / 2)
      , dcPathEnd = this.polarToCartesian(dcSize, dcSize, (dcSize)*0.85, 360 - (cropAngle / 2))
    return (
      <View style={{height: size, width: size,}}>
        <Svg onLayout={this.onLayout} width={size} height={size}>
          <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
            <Circle cx={7.5} cy={7.5} r={4} fill={dotColor} />
          </G>
          <Path
            strokeDasharray='1,6'
            stroke='#ccc'
            strokeWidth={8}
            fill='none'
            strokeLinecap='butt'
            d={`M${dcPathStart.x+dcOffset} ${dcPathStart.y+dcOffset} A ${dcPathStart.r} ${dcPathStart.r} 0 1 1 ${dcPathEnd.x+dcOffset} ${dcPathEnd.y+dcOffset}`} />
          <Path
            stroke='#eee'
            strokeWidth={guideWidth}
            fill='none'
            strokeLinecap='round'
            d={`M${guidePathStart.x} ${guidePathStart.y} A ${guidePathStart.r} ${guidePathStart.r} 0 1 1 ${guidePathEnd.x} ${guidePathEnd.y}`} />
          <Path
            stroke={meterColor}
            strokeWidth={width}
            fill='none'
            strokeLinecap='round'
            d={`M${startCoord.x} ${startCoord.y} A ${startCoord.r} ${startCoord.r} 0 ${newVal > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`} />
          <G x={endCoord.x - width/2} y={endCoord.y - width/2}>
            <Circle cx={width/2} cy={width/2} r={4} fill={dotColor} />
          </G>
        </Svg>
        {
          children && children(value)
        }
      </View>
    )
  }

}
