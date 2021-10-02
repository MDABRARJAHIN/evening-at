import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Images from '../../constant/images';
import Modal from 'react-native-modal';
const {width, height} = Dimensions.get('window');
const ActivityIndicator = () => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <Modal isVisible={true}>
      <View style={styles.container}>
        <Animated.Image
          style={[styles.image, {transform: [{rotate: spin}]}]}
          source={Images.activityIndicator}></Animated.Image>
      </View>
    </Modal>
  );
};
export default ActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 5,
    height: width / 5,
  },
});
