import React from 'react';
import {TextInput, Dimensions} from 'react-native';
import {COLORS} from '../../constant/theme';
import propTypes from 'prop-types';
const {height, width} = Dimensions.get('window');

const TextInputCustom = props => {
  return (
    <TextInput
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
      placeholderTextColor={props.placeholderTextColor}
      style={[props.style, props.customStyle]}
      onChangeText={props.onChangeText}></TextInput>
  );
};

export default TextInputCustom;
TextInputCustom.propTypes = {
  placeholder: propTypes.string,
  placeholderTextColor: propTypes.string,
  style: propTypes.object,
  customStyle: propTypes.object,
  onChangeText: propTypes.any,
  secureTextEntry: propTypes.bool,
};

TextInputCustom.defaultProps = {
  placeholder: 'Placeholder',
  placeholderTextColor: '#D3D3D3',
  style: {
    width: '100%',
    padding: 5,
    height: 50,
    marginTop: 15,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 25,
  },
  customStyle: {},
  secureTextEntry: false,
  // onChangeText: text => console.log(text),
};
