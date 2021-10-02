import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constant/theme";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    height,
    width,
    alignItems: "center",
  },

  mapview: {
    width: width - 60,
    height: height / 2,
    borderRadius: 20,
  },
  mapviewContainer: {
    width: width - 60,
    height: height / 2.4,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: height/40,
  },
  description: {
    color: "#353535",
    marginTop: 10,
  },
  time: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#353535",
    marginTop: height/70,
  },
  address: {
    color: "#353535",
    fontWeight: "700",
  },
  contentContainer: {
    // height: height / 0.5,
  },
});
