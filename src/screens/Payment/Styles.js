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

  mapview: {
    width: width - 60,
    height: height / 2,
    borderRadius: 30,
  },
  mapviewContainer: {
    width: width - 60,
    height: height / 2.5,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 20,
  },
  price: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: height / 30,
  },
  cardImages: {
    height: 30,
    width: width - 60,
    marginTop: height / 30,
  },
  applePayButton: {
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    height: 50,

    backgroundColor: "#231F20",
    flexDirection: "row",
    alignItems: "center",
    marginTop: height / 15,
  },
  applyPaytxt: {
    color: "#fff",
    fontWeight: "bold",
  },
  appleIcon: {
    height: 30,
    width: 30,
    marginTop: 7,
  },
});
