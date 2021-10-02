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

    alignItems: "center",
  },

  heading: {
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  timeSlot: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  activeTimeSlot: { backgroundColor: "#FEE5A5" },
  alreadySelected: {
    backgroundColor: "red",
  },
  timeSlotTxt: {
    fontWeight: "700",
    fontSize: 12,
    color: "#333140",
  },
  flatlist: { width: width - 60,  },
  seatAvaiable: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D0D6EA",
  },
  seatAvaibleTxt: {
    fontWeight: "700",
    fontSize: 12,
    color: "#333140",
  },
  activeSeat: {
    backgroundColor: "#FEE5A5",
    borderWidth: 1,
    borderColor: "#FEE5A5",
  },
  btn: {},
  contentContainer: {
    width: width - 60,
    height: height / 2.5,
  },
  calenderContainer: {
    width,
    
  },
});
