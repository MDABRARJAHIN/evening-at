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
    paddingBottom: 20,
  },
  card: {
    height: height / 4,
    width: width - 60,
    //resizeMode: 'contain',
  },
  cardContainer: {
    height: height / 3.5,
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    width: width - 60,
  },
  content: {
    width: width / 2,
  },
  image: {
    height: height / 3 - 10,
    width: width / 2.5,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  contentTxt: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  btnTxt: {
    fontWeight: 'bold',
    color: '#486D87',
    fontSize: 14,
  },
  btn: {
    padding: 10,
    width: '70%',
    // paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  profileImage: {height: 40, width: 40, borderRadius: 20},
});
