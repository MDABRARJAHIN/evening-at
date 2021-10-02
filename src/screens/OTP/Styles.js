import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constant/theme';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height,
    width,
  },

  InputContainer: {
    width: width - 60,
    marginTop: 10,
  },
  OTPContainer: {
    marginTop: height / 8,
  },
  resendOption: {
    flexDirection: 'row',
    width: width - 60,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: height / 20,
  },
  resendTxt: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
