import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constant/theme";
const { height, width } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height,
    width,
  },
  HeaderContainer:{
    width,
    paddingHorizontal:30,
  },
  contentContainer: {
    width: width - 60,
  },

  itemContainer: {
    flexDirection: "row",

    backgroundColor: "#F2F6F9",
    borderRadius: 20,
  },
  itemImage: {
    height: width / 4,
    width: width / 4,
    borderRadius: 20,
  },
  itemContent: {
    width: width - width / 5 - 30,
    paddingLeft: 10,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: width - width / 5 - 120,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
  },
  itemDescription: {
    color: "#979797",
    fontSize: 10,
  },
  location: {
    flexDirection: "row",
  },
  locationTxt: {
    fontSize: 10,
    color: "#979797",
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    width: width - width / 5 - 120,
    justifyContent: "space-between",
    alignItems: "center",
  },
  feedback: {
    flexDirection: "row",
    alignItems: "center",
  },

  feedbackcount: {
    marginLeft: 5,
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },

  filterOptions: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 10,
    padding: 5,
  },
  feedbackContainer: {
    width: width - 100,

    alignSelf: "center",
    marginTop: 20,
  },
  feedbackTxt: {
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
  },
  feedbackDate: {
    fontSize: 12,
    color: "#FFC107",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  itemMainContainer: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    width:width-30
  },
  emptyMsg: {
    fontWeight: "bold",
    marginTop: 20,
  },
  emptyMessage: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
});
