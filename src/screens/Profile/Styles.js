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
  contentContainer: {
    width: width - 60,
  },
  header: {
    width: width - 60,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    height: width / 5,
    width: width / 5,
    borderRadius: width / 10,
    resizeMode: "cover",
  },
  uploadIcon: {
    marginLeft: 20,
  },
  userDetailContainer: {
    marginTop: 30,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height / 20,
  },
  label: {
    color: "#979797",
    width: width / 4,
  },
  data: {
    fontWeight: "700",
  },
  passwordRow: {
    justifyContent: "space-between",
  },
});
