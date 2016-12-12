/**
 * @providesModule CTXPageControl
 * @flow
 */
'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');

var PropTypes = React.PropTypes;

var CTXPageControl = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    count: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
  },

  render: function() {
    var images = [];
    for (var i = 0; i < this.props.count; i++) {
      var isSelected = this.props.selectedIndex === i;
      images.push(<Circle key={i} isSelected={isSelected} />);
    }
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.innerContainer}>
          {images}
        </View>
      </View>
    );
  }
});

var Circle = React.createClass({
  render: function() {
    var extraStyle = this.props.isSelected ? styles.full : styles.empty;
    return <View style={[styles.circle, extraStyle]} />;
  }
});

var CIRCLE_SIZE = 4;

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  circle: {
    margin: 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  full: {
    backgroundColor: '#15997F',
  },
  empty: {
    backgroundColor: '#15997F50',
  },
});

module.exports = CTXPageControl;
