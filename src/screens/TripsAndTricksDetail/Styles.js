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
    width: width - 30,
    
  },
  header: {
    width: width - 60,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: 30,
    paddingBottom: 20,
  },
  text: {
    lineHeight: 30,
    fontSize: 16,
  },
title:{
  fontSize:20,
  fontWeight:"bold"
},
content:{
fontWeight:'500'
,fontSize:18
},
contentImage:{
  width:'100%',
  height:height/2
},


  profileImage: { height: 40, width: 40, borderRadius: 20 },
  image: { width: width - 60, height: height / 3, resizeMode: "contain" },
});
