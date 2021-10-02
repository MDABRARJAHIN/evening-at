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
  contentContainer:{
    alignItems: 'center',
    width,
  },
  loginBG: {
    width,
    height: height / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  BG: {
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    overflow: 'hidden',
  },
  logo: {
    width: width / 3,
    height: width / 3,
  },
  InputContainer: {
    width: width - 60,
    marginTop: 10,
  },
  forgotpassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
    fontSize: 12,
  },
  or: {
    margin: 10,
  },
  socialSignupOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: width - 60,
  },
  icon: {
    height: 50,
    width: 50,
  },
  signUpOption: {
    flexDirection: 'row',
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpTxt: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
