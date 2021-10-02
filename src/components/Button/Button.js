import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import {COLORS} from '../../constant/theme';
import propTypes from 'prop-types';
const {height, width} = Dimensions.get('window');

const Button = props => {
  return (
    <TouchableOpacity
      style={[props.styles, props.customStyle]}
      onPress={() => props.onPress()}>
      <Text style={[props.titleStyle, props.customTitleStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
Button.propTypes = {
  backgroundColor: propTypes.string,
  styles: propTypes.object,
  title: propTypes.string,
  customStyle: propTypes.object,
  titleColor: propTypes.string,
  titleStyle: propTypes.object,
  customTitleStyle: propTypes.object,
  onPress: propTypes.any,
};

Button.defaultProps = {
  backgroundColor: COLORS.primary,
  styles: {
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    height: 50,
    marginTop: 15,
    backgroundColor: COLORS.primary,
  },
  title: 'button',
  titleColor: COLORS.secondary,
  titleStyle: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  customStyle: {},

  customTitleStyle: {},
  onPress: console.log('Button Pressed'),
};
