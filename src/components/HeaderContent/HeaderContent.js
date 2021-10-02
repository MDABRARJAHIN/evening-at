import React from 'react';
import {Text, Dimensions, View} from 'react-native';
import propTypes from 'prop-types';
const {height, width} = Dimensions.get('window');
const HeaderContent = props => {
  return (
    <View style={{width: width - 60}}>
      <Text style={[props.style, props.customStyle]}>{props.content}</Text>
    </View>
  );
};
export default HeaderContent;
HeaderContent.propTypes = {
  content: propTypes.string,
  style: propTypes.object,
  customStyle: propTypes.object,
};
HeaderContent.defaultProps = {
  content: 'Header Content',
  style: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    
  },
  customStyle: {},
};
