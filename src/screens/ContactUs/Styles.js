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
    marginTop: height / 50,
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
    marginTop: height / 60,
  },
  btn: {},
  textArea: {
    width: '100%',
    padding: 5,
    height: height / 8,
    marginTop: 20,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 25,
    borderColor: COLORS.borderColor,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
});
