import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../constant/theme";
const { height, width } = Dimensions.get("window");
export default CustomAlert = ({
  isModalVisible,
  image,
  text,
  onHide,

  customStyle,
}) => {
  return (
    <SafeAreaView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image source={image} style={styles.image}></Image>
            <Text style={styles.txt}>{text}</Text>
            <View style={styles.line} />
            <TouchableOpacity
              style={[styles.btn, customStyle]}
              onPress={() => onHide(!isModalVisible)}
            >
              <Text style={styles.btnTxt}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "80%",
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: "contain",
  },
  txt: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 16,
  },
  btn: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    fontWeight: "bold",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#D5D5D5",
    marginVertical: 20,
  },
});
