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
  image: {
    width: width / 3.5,
    height: width / 3.5,
    marginTop: 1,
  },
  contentContainer: {
    width: width - 60,
  },
  headingContainer: {
    marginVertical: 5,
    backgroundColor: "#e0dada",
    padding: 10,
    borderRadius: 10,
  },
  headingTxt:{
      fontWeight:'700'
  },
  bodyContainer:{
      backgroundColor:'#f2ebeb',
      padding:5,
      borderRadius:10,
      
  },
  bodyTxt:{
      textAlign:'center',
      fontSize:12,
  }
});
