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
    marginTop: 5,
  },
  time: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#353535",
    marginVertical: 10,
  },

  timer: {
    height: width / 3,
    width: width / 3,
    alignSelf: "center",
    marginTop: height / 40,
  },
  escapedTime: {
    fontSize: 18,
    color: "#353535",
    marginVertical: 20,
    textAlign: "center",
  },
  hours: {
    fontSize: 18,
    textAlign: "center",
  },

  btn: {
    marginTop: height / 8,
  },
  questionIcon: {
    width: width - 60,
    height: height / 5,
  },
  nextQuestion: {
    width: width - 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextQuestionTxt: {
    fontWeight: "bold",
    fontSize: 18,
  },
  nextQuestionBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  QuestionContainer: {
    padding: 20,
    width: width - 100,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    marginBottom: 40,
    borderBottomRightRadius: 0,
  },
  question: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "right",
    lineHeight: 40,
  },
  triangleShape: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 0,
    borderTopWidth: 20,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: COLORS.primary,

    position: "absolute",
    right: 0,
    bottom: -20,
  },
});
