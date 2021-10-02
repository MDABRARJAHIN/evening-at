import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../constant/theme';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
  },
  contentImage: {
    width: width - 60,
    height: height / 2.5,
    borderRadius: 20,
    marginTop: 20,
  },
  row: {
    width: width - 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '65%',
  },
  contentContainer: {
    marginTop: 10,
    width: width - 60,
  },
  mapTxt: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  decriptionContainer: {
    width: width - 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  descriptionTxt: {
    width: '70%',
  },
  priceTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    width: width - 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  calenderIcon: {
    height: 60,
    width: 60,
  },
  options: {
    flexDirection: 'row',
    width: width - 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  activeOption: {
    backgroundColor: COLORS.primary,
  },
  optionBorder: {
    borderRadius: 30,
    borderColor: COLORS.primary,
    padding: 2,
    borderWidth: 1,
  },
  option: {
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  optionTxt: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  offerTxt: {
    fontSize: 16,
    marginTop: 10,
  },
  detailContainer: {},
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  detailtxt: {
    marginLeft: 10,
    color: '#333140',
  },
});
