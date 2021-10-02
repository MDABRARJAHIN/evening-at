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
  contentContainer: {
    width: width - 60,
  },
  header: {
    width: width - 60,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  image: {
    width: width / 3.5,
    height: width / 3.5,
    marginTop: height / 12,
  },
  btn: {
    marginTop: height / 45,
  },
  btnTxt: {
    fontWeight: '700',
  },
});
