import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constant/theme";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    alignItems: "center",
  },
  description: {
    color: "#353535",
    marginTop: 10,
  },
  time: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#353535",
    marginVertical: 20,
  },

  timer: {
    height: width / 2,
    width: width / 2,
    alignSelf: "center",
    marginTop: height / 10,
  },
  escapedTime: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#353535",
    marginVertical: 20,
    textAlign: "center",
  },
  hours: {
    fontSize: 18,
    textAlign: "center",
  },

  btn: {
    marginTop: height / 30,
    marginBottom: 30,
  },
});
