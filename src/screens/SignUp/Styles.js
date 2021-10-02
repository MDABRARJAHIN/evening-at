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
    width,
    flex:1,
    alignItems:'center'
  },

  InputContainer: {
    width: width - 60,
    marginTop: 5,
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
    marginTop: 5,
    
  },
  signUpTxt: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
