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
    paddingBottom: 120,
  },
  greetingContainer: {
    width: width - 60,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width - 60,
  },
  itemImage: {
    height: width / 4,
    width: width / 4,
    borderRadius: 20,
  },
  itemContent: {
    width: width - width / 5 - 30,
    paddingLeft: 10,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width - width / 5 - 100,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemDescription: {
    color: '#979797',
    fontSize: 10,
  },
  location: {
    flexDirection: 'row',
  },
  locationTxt: {
    fontSize: 10,
    color: '#979797',
    marginLeft: 5,
  },
  feedbackContainer: {
    flexDirection: 'row',
    width: width - width / 5 - 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  feedbackcount: {
    marginLeft: 5,
    fontSize: 12,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modal: {
    height: 220,
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    left: 20,
    top: 30,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  filterOptions: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 10,
    padding: 5,
  },
});
