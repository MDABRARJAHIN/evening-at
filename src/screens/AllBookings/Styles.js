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
    paddingHorizontal: 30,
  },
  section: {
    marginTop: 20,
    fontWeight: "700",
  },
  contentContainer: {
    width: width - 60,
    alignSelf: "center",
  },

  modal: {
    height: 160,
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 20,
    position: "absolute",
    left: 20,
    top: 30,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  filterOptions: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 10,
    padding: 5,
  },
  feedbackModal: {
    width: width - 20,
    // height: height - 100,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  contentContainer: {
    width: width - 60,
    marginTop: height / 30,
    alignItems: "center",
    marginHorizontal: 30,
  },
  textArea: {
    width: "100%",
    padding: 5,
    height: 130,
    marginTop: 20,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 25,
    borderColor: COLORS.borderColor,
    textAlignVertical: "top",
    paddingVertical: 25,
  },
  feedbackContainer: {
    width: width - 60,
    marginTop: height / 30,
    alignItems: "center",
  },
  backgroundVideo: {
    width: width - 60,
    height: height / 5,
  },
  contentImage: {
    width: width - 60,
    height: height / 6,
    borderRadius: 20,
    marginTop: 20,
  },
  videoContainer: {
    width: width - 60,
    height: height / 5,
    marginTop: 15,
  },
  emptyMessage: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
});
